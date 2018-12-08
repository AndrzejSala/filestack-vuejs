import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        files: [],
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
                state.files.push(file)
            })
        },
        resetStore: state => {
            state.files = [],
                state.currentStatus = 0,
                state.uploadError = null
        },
        selectFile: (state, payload) => {
            for (let file of state.files) {
                file.isSelected = payload.includes(file.id) ? true : false
            }
        },
        setStatus: (state, payload) => {
            state.currentStatus = payload
        },
        setError: (state, payload) => {
            state.uploadError = payload
        },
        updateUploadProgress: (state, payload) => {
            let fileIndex = null;
            for(let i = 0; i < state.files.length; i++) {
                if(state.files[i].id === payload.id) {
                    fileIndex = i;
                    break;
                }
            }
            if (fileIndex !== null) {
                let fileUploadInfo = state.files[fileIndex].uploadInfo
                fileUploadInfo.progress = parseInt(payload.progress, 10)
                fileUploadInfo.status = payload.progress !== 100 ? 'Uploading' : 'Uploaded'
                if (payload.bytesSent) {
                    fileUploadInfo.lastChunkSize = fileUploadInfo.lastChunkSize ? payload.bytesSent - fileUploadInfo.bytesSent : fileUploadInfo.bytesSent
                    fileUploadInfo.bytesSent = payload.bytesSent
                }
                if (payload.startTime) {
                    fileUploadInfo.startTime = payload.startTime
                } else if (payload.endTime) {
                    fileUploadInfo.endTime = payload.endTime
                }
            }
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
