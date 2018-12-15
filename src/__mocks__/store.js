/* global jest */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const getters = {
    files: jest.fn().mockReturnValue([]),
    currentStatus: jest.fn().mockReturnValue(0),
    error: jest.fn().mockReturnValue(null)
};

export const mutations = {
    addFiles: jest.fn(),
    resetStore: jest.fn(),
    selectFile: jest.fn(),
    setStatus: jest.fn(),
    addExif: jest.fn(),
    updateUploadProgress: jest.fn()
};

export const state = {
    files: [],
    currentStatus: 0,
    error: null
};

// eslint-disable-next-line no-underscore-dangle
export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
    const mockGetters = Object.assign({}, getters, custom.getters);
    const mockMutations = Object.assign({}, mutations, custom.mutations);
    const mockState = Object.assign({}, state, custom.state);

    return {
        getters: mockGetters,
        mutations: mockMutations,
        state: mockState,
        store: new Vuex.Store({
            getters: mockGetters,
            mutations: mockMutations,
            state: mockState,
        }),
    };
}

export const store = __createMocks().store;
