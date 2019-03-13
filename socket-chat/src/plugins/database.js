import PouchDB from 'pouchdb-browser'

export default ({ Vue }) => {
  let database = new PouchDB('chat')
  Vue.prototype.$db = database
}
