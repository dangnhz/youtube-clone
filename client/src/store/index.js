import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'

Vue.use(Vuex)

const modules = {
account
}

export default new Vuex.Store({
  modules
})
