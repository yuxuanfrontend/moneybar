<style lang="css" scoped>
#wrap {
  position: relative;
  overflow: hidden;
  height: 200px;
}

ul {
  /*height: 400px;*/
  margin: 0;
  list-style: none;
  padding: 0;
}

li {
  width: 100%;
  height: 50px;
  /*float: left;*/
}
</style>

<template lang="html">
  <div id="wrap">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
    </ul>
  </div>
</template>

<script>
import iscroll from 'iscroll'

export default {
  mounted() {
    this.$nextTick(() => {
      new iscroll('#wrap', {
        disablePointer: true,
    disableTouch: false,
    disableMouse: false
        // tap: true,
        // shrinkScrollbars: 'clip',
        // scrollX: true,
        // scrollY: false
        // probeType: 2,
        // bounceTime: 200
      })

      // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    })
  }
}
</script>
