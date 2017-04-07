<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.new-topic {
  &__head {
    text-align: center;
    background-color: $background-white;
    margin-bottom: px2rem(8);
    padding: px2rem(10) 0;
  }

  &__title {
    text-align: center;
    background-color: $background-white;
    padding-top: px2rem(30);
  }

  &__vote-area {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    background-color: $background-white;
    padding-bottom: px2rem(30);
    margin-bottom: px2rem(8);
  }

  &__vote-area-item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  &__vote-btn {
    width: px2rem(80);
    height: px2rem(20);
    padding: px2rem(4);
    text-align: center;
    border-radius: px2rem(15);
    color: #fff;
    background-color: #26a2ff;
  }
}
</style>

<template lang="html">
  <div class="page">
    <div class="page page--navbar">
      <div class="new-topic">
        <div class="new-topic__head">本周话题</div>
        <div>
          <div class="new-topic__title">{{topicData.title}}</div>
          <div class="new-topic__vote-area">
            <div class="new-topic__vote-area-item">
              <span>正方观点</span>
              <span class="new-topic__vote-btn" @click="goVote(0)">正方投票</span>
              <span>票数：{{topicData.approvalNum}}</span>
            </div>
            <div class="new-topic__vote-area-item" style="font-size:200%;font-weight:bold;color:#ff4a4a;">VS</div>
            <div class="new-topic__vote-area-item">
              <span>反方观点</span>
              <span class="new-topic__vote-btn" @click="goVote(1)">反方投票</span>
              <span>票数：{{topicData.opposedNum}}</span>
            </div>
          </div>
        </div>
        <div class="new-topic__views">
          <topic-item v-for="view in views" :data="view"></topic-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import approvalImg from '../../assets/approval.png'
import opposedImg from '../../assets/opposed.png'

import topicItem from '../../components/topic-item'

export default {
  data() {
    return {
      topicData: {
        title: '',
        approvalNum: 0,
        opposedNum: 0,
      },
      approvalStyle: {
        background: `url(${approvalImg})`,
      },
      opposedStyle: {
        background: `url(${opposedImg})`,
      },
      views: [],
    }
  },

  mounted() {
    this.getInitData()
  },

  methods: {
    getInitData() {
      this.$request.get(this.$getUrl('topic'))
        // .send({
        //   basePageResults: {
        //     pageNo: 1,
        //     pageSize: 1
        //   },
        //   statusVal: '0'
        // })
        .then((res) => {
          if (res.body.responseCode === '000') {
            let data = res.body.dto
            this.topicData = data
          } else {
            this.$toast(res.body.responseMsg)
          }

          return this.$request.post(this.$getUrl('dynamics'))
            .send({
              topic: {
                id: this.topicData.id
              },
              orderByCreateTimeDesc: true,
              statusVal: '1',
              type: 4,
            })
        }).then((res) => {
          if (res.body.responseCode === '000') {
            this.views = res.body.dto.results
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    },

    goVote(type) {
      this.$router.push({
        path: '/viewpoint',
        query: {
          type: 4,
          id: this.topicData.id,
          vote: type === 0,
        }
      })
    }
  },

  components: {
    topicItem,
  }
}
</script>
