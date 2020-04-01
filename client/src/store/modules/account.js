const state = {
    user:null,
    isAuthenticated: false,
    accessToken:''

}

const getters = {
    getCurrentUser(state) {
        return state.user
    },
    getToken (state) {
        return state.accessToken
    }
}

const mutations = {
    setUser(state, data) {
        state.user = data
    },
    setToken(state, token) {
        state.accessToken = token
    },
    setAuthenticate(state) {
        state.isAuthenticated = !state.isAuthenticated
    }
}

const actions = {
    setUser(context, user) {
        context.commit('setUser', user)
    }
    ,
    login (context, data) {
        context.commit('setUser', data.user)
        if (data.token) {
            context.commit('setToken', data.token)
        }
        context.commit('setAuthenticate')
    }
    ,
    logout (context) {
        context.state.user = null;
        context.state.isAuthenticated = false,
        context.accessToken = ''
    },
    setToken(context, token) {
        context.commit('setToken', token)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}