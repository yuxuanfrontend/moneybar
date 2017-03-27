export default {
  state: {
    openId: '',
    username: '',
    head: '',
  },

  mutations: {
    initUserInfo(state, value) {
      state.openId = value.openId
      state.username = value.username
      state.head = value.head
    }
  }
}
