import VueSocketIO from 'vue-socket.io'
import store from 'src/store'

export default ({ Vue }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  }))
}
