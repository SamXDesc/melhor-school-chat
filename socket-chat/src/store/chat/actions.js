export const storeMessage = ({ commit }, message) => {
  commit('storeMessage', message)
}

export const users = ({ commit }, data) => {
  commit('users', data)
}
