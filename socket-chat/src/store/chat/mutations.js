export const storeMessage = (state, message) => {
  state.messages.push(message)
}

export const users = (state, data) => {
  state.usersCount = data
}
