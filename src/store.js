import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        files: {},
        currentStatus: 0,
        uploadError: null
    },
    getters: {
        counter: state => state.counter * 2,
        files: state => state.files,
        currentStatus: state => state.currentStatus,
        uploadError: state => state.uploadError
    },
    mutations: {
        addFiles: (state, payload) => {
            payload.forEach(file => {
                state.files[file.id] = file
            })
        },
        resetStore: state => {
            state.files = [],
                state.currentStatus = 0,
                state.uploadError = null
        },
        selectFile: (state, payload) => {
            // console.log('###6', payload)
            for (let key in state.files) {
                // console.log('###7', state.files[key].id, payload, payload.includes(state.files[key].id) )
                state.files[key].isSelected = payload.includes(state.files[key].id) ? true : false
            }
            // console.log('###8', state.files)
            // for (id of payload) {
            //     state.files[id].isSelected
            // }
        },
        setStatus: (state, payload) => {
            state.currentStatus = payload
        },
        setError: (state, payload) => {
            state.uploadError = payload
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
