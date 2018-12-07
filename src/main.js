import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(Vuex)
Vue.use(VueMaterial)

const store = new Vuex.Store({
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
    }
  }
})

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})
