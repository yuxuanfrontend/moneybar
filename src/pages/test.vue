<style lang="css" scoped>
.wrap > div {
  height: 30px;
  border: 1px solid #000;
}
</style>

<template lang="html">
  <div class="page">
    <div class="wrap">
      <div v-for="item in items" @click="itemClick" :key="item.id">{{item.value}}</div>
    </div>
    <button @click="changeArr">改变数组顺序</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: (function() {
        let arr = []
        for (let i = 0; i < 5; i++) {
          arr.push({
            id: i,
            value: 'my' + i
          })
        }
        return arr
      })()
    }
  },

  mounted() {
    class Toggle {
      constructor() {
        this.color = "red"
      }

      myClick() {
        console.log(this.color);
      }

      render() {
        this.myClick()
      }
    }

    let tt = new Toggle()

    tt.render()
  },

  methods: {
    itemClick(event) {
      event.target.style.color = '#f00'
    },

    changeArr() {
      // this.items.shift()
      // this.items.push({
      //   id: this.items[this.items.length - 1].id + 1,
      //   value: 'my' + (this.items[this.items.length - 1].id + 1)
      // })
      // for (let i = 0; i < this.items.length; i++) {
      // }
      this.$set(this.items, 2, {
        id: 3,
        value: 'hello3'
      })
      this.$set(this.items, 3, {
        id: 2,
        value: 'hello2'
      })
      // this.items[2].value = 'hehe'
    }
  }
}
</script>
