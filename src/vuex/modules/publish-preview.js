export default {
  state: {
    head: '',
    username: '',
    date: '',
    title: '',
    container: '',
    images: [],
  },

  mutations: {
    setPreview(state, val) {
      state.head = val.head
      state.username = val.username
      state.date = val.date
      state.title = val.title
      state.container = val.container
      state.images = val.images
    },

    clearPreview(state) {
      state.head = ''
      state.username = ''
      state.date = ''
      state.title = ''
      state.container = ''
      state.images = []
    }
  },

}
