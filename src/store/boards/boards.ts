import axios from 'axios';
import * as _ from 'lodash';
import * as uuid from 'node-uuid';
import { Module, ActionTree, Action, GetterTree, MutationTree, ActionContext } from 'vuex';
import { State as RootState } from '../state';
import { BoardsState, Project } from './boardsState';
import { getStoreAccessors } from 'vuex-typescript';

type BoardsContext = ActionContext<BoardsState, RootState>;

let lastState: BoardsState = {
  selectedProject: '',
  projects: {},
};

function getSelectedProjectHelper(state: BoardsState) {
  const selectedProject = state.selectedProject;
  return state.projects[selectedProject];
}

export const boards = {
  namespaced: true,
  state: {
    selectedProject: '',
    projects: {},
  },
  actions: {
    async createBoard(context: BoardsContext) {
      const projectUrl = (
        await axios.post(`https://api.keyvalue.xyz/new/board`)
      ).data;
      const [, boardToken] = projectUrl.split('/').reverse();
      return boardToken;
    },
    async loadBoard(context: BoardsContext, boardToken) {
      let boardData = (
        await axios.get(`https://api.keyvalue.xyz/${boardToken}/board`)
      ).data;
      if (typeof boardData === 'string') {
        boardData = {
          selectedProject: null,
          projects: {},
        };
      }
      context.commit('setBoard', boardData);
    },
    async saveCurrentBoard(context: BoardsContext, boardToken) {
      const stateJson = JSON.parse(JSON.stringify(context.state));
      if (!_.isEqual(stateJson, lastState)) {
        lastState = stateJson;
        await axios.post(`https://api.keyvalue.xyz/${boardToken}/board`, stateJson);
      }
    },
  },
  getters: {
    getSelectedProject(state: BoardsState) {
      const selectedProject = state.selectedProject;
      return state.projects[selectedProject];
    },
    isSelectedProject: (state) => (project: Project) => {
      return project.id === state.selectedProject;
    },
    getProjects(state) {
      return Object.keys(state.projects).map((key) => state.projects[key]);
    },
  },
  mutations: {
    setBoard(state, board) {
      Object.assign(state, board);
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setSelectedProject(state, project) {
      state.selectedProject = project.id;
    },
    toggleTaskCompleted(state, task) {
      task.completed = !task.completed;
    },
    updateTaskDescription(state, message) {
      message.task.description = message.description;
    },
    deleteTask(state, task) {
      getSelectedProjectHelper(state).tasks.splice(
        getSelectedProjectHelper(state).tasks.indexOf(task),
        1,
      );
    },
    createTask(state) {
      getSelectedProjectHelper(state).tasks.push({
        id: uuid.v4(),
        description: '',
        completed: false,
      });
    },
    createProject(state, title) {
      const id = uuid.v4();
      state.projects = {
        ...state.projects,
        [id]: {
          id,
          title,
          tasks: [],
        },
      };
      state.selectedProject = id;
    },
    deleteProject(state) {
      state.projects = _.omit(state.projects, state.selectedProject);
      state.selectedProject = '';
      const projects = boards.getters.getProjects(state);
      if (projects.length) {
        state.selectedProject = projects[0].id;
      }
    },
    updateProjectTitle(state, title) {
      getSelectedProjectHelper(state).title = title;
    },
    setProjectTasks(state, tasks) {
      getSelectedProjectHelper(state).tasks = tasks;
    },
  },
};

const { commit, read, dispatch } =
     getStoreAccessors<BoardsState, RootState>('boards');

export const getSelectedProject = read(boards.getters.getSelectedProject);
export const isSelectedProject = read(boards.getters.isSelectedProject);
export const getProjects = read(boards.getters.getProjects);

export const dispatchCreateBoard = dispatch(boards.actions.createBoard);
export const dispatchLoadBoard = dispatch(boards.actions.loadBoard);
export const dispatchSaveCurrentBoard = dispatch(boards.actions.saveCurrentBoard);

export const setBoard = commit(boards.mutations.setBoard);
export const setProjects = commit(boards.mutations.setProjects);
export const setSelectedProject = commit(boards.mutations.setSelectedProject);
export const toggleTaskCompleted = commit(boards.mutations.toggleTaskCompleted);
export const updateTaskDescription = commit(boards.mutations.updateTaskDescription);
export const deleteTask = commit(boards.mutations.deleteTask);
export const createTask = commit(boards.mutations.createTask);
export const createProject = commit(boards.mutations.createProject);
export const deleteProject = commit(boards.mutations.deleteProject);
export const updateProjectTitle = commit(boards.mutations.updateProjectTitle);
export const setProjectTasks = commit(boards.mutations.setProjectTasks);
