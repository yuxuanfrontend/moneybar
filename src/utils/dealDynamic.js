import _ from 'lodash'
import moment from 'moment'

function appendDynamics(arr, data) {
  _.each(data, (item) => {
    arr.push({
      id: item.id,
      type: item.type,
      topic: item.topicName,
      teamName: item.groupName,
      topicId: item.topicId,
      teamId: item.groupId,
      title: item.title,
      content: item.content,
      avator: item.head,
      nickname: item.nickname,
      time: moment(item.createTime).format('HH:mm'),
      readAmount: item.readCount,
      commentAmount: item.commentCount
    })
  })
}


export {
  appendDynamics
}
