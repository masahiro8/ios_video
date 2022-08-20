<template>
  <div class="app">
    <div class="video">
      <video
        id="trainVideo"
        @loadeddata="onLoadedVideo"
        :src="`./video/train.mp4`"
        playsinline
        muted
        type="video/mp4"
      ></video>
    </div>
    <div class="btns">
      <button @click="playStop">play/stop</button>
      <button @click="onClickAdd(0.3)">+3</button>
      <button @click="onClickAdd(-0.3)">-3</button>
    </div>
  </div>
</template>

<script>
  let vd = null;
  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
    data: () => {
      return {};
    },
    methods: {
      playStop() {
        vd.play();
      },
      onLoadedVideo(evt) {
        vd = evt.target;
        vd.play();
        vd.pause();
        vd.addEventListener('canplaythrough', () => {
          console.log('canplaythrough');
        });
      },
      onClickAdd(n) {
        vd.play();
        let playbackRate = vd.playbackRate;
        console.log('playbackRate', playbackRate);
        playbackRate = playbackRate + n;
        vd.playbackRate = playbackRate;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .video {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    video {
      width: 100%;
    }
  }
  .btns {
    height: 50%;
  }
  button {
    padding: 16px;
    margin: 4px;
  }
</style>
