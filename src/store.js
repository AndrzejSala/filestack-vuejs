import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        files: [],
        currentStatus: 0,
        error: null
    },
    getters: {
        files: state => state.files,
        currentStatus: state => state.currentStatus,
        error: state => state.error
    },
    mutations: {
        addFiles: (state, payload) => {
            payload.forEach(file => {
                state.files.push(file)
            })
        },
        resetStore: state => {
            state.files = []
            state.currentStatus = 0
            state.error = null
        },
        selectFile: (state, payload) => {
            for (let file of state.files) {
                file.isSelected = payload.includes(file.id) ? true : false
            }
        },
        setStatus: (state, payload) => {
            state.currentStatus = payload.currentStatus
            if (payload.error) {
                state.error = payload.error
            }
        },
        addExif: (state, payload) => {
            state.files.filter(item => {
                return item.id === payload.id
            }).map(item => {
                item.exif = payload.exif
                return item
            })
        },
        updateUploadProgress: (state, payload) => {
            state.files.filter(item => {
                return item.id === payload.id
            }).map(item => {
                item.uploadInfo.progress = parseInt(payload.progress, 10)
                item.uploadInfo.status = payload.progress !== 100 ? 'Uploading' : 'Uploaded'
                if (payload.bytesSent) {
                    item.uploadInfo.lastChunkSize = item.uploadInfo.lastChunkSize ? payload.bytesSent - item.uploadInfo.bytesSent : item.uploadInfo.bytesSent
                    item.uploadInfo.bytesSent = payload.bytesSent
                }
                if (payload.startTime) {
                    item.uploadInfo.startTime = payload.startTime
                } else if (payload.endTime) {
                    item.uploadInfo.endTime = payload.endTime
                    item.uploadInfo.url = payload.url
                }
                return item
            })
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
