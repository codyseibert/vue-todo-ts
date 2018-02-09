import * as Vuex from 'vuex';
import Vue from 'vue';
import { State } from './state';
import { boards } from '@/store/boards/boards';
import { ModuleTree } from 'vuex';

Vue.use(Vuex);

export const createStore = () => new Vuex.Store<State>({
  strict: true,
  modules: {
    boards,
  },
});
