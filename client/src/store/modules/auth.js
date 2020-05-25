const state = {
    user:null,
    isAuthenticated: false,
    accessToken: window.localStorage.getItem('youtube_clone_token') || ''
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
    setAuthenticated(state) {
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
        context.commit('setAuthenticated')
    }
    ,
    logout (context) {
        // context.state.user = null;
        // context.state.isAuthenticated = false,
        // context.state.accessToken = ''
        context.commit('setUser', null)
        context.commit('setToken', ''),
        context.commit('setAuthenticated', false)
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