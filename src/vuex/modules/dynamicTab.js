import { Toast } from 'mint-ui'
import {$requestWithLoading} from '../../utils/custom-superagent'

export default {
  state: {
    dynamics: [],
    queryPage: 1,
    querySize: 5,
    scrollTop: 200,
  },

  mutations: {
    appendDynamics(state, values) {
      state.dynamics.push(values)
    },

    setScrollTop(state, value) {
      state.scrollTop = value
    }
  },

  actions: {
    ajaxAppendDynamics({commit, state}) {
      $requestWithLoading('post', 'dynamics')
      .send({
        basePageResults: {
          pageNo: state.queryPage,
          pageSize: state.querySize
        },
        type: 1,
        // orderByCreateTimeDesc: true,
        statusVal: '1',
        orderByStickEssence: true,
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          state.queryPage += 1
          state.dynamics = state.dynamics.concat(res.body.dto.results)
        } else {
          Toast(res.body.responseMsg)
        }
      })
    }
  },
}
