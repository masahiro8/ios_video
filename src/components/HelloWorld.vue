<template>
  <div class="app">
    <div class="video">
      <video
        id="trainVideo"
        @loadeddata="onLoadedVideo"
        :src="url"
        playsinline
        muted
        type="video/mp4"
      ></video>
    </div>
    <div class="btns">
      <button class="btn" @click="play">play</button>
      <button class="btn" @click="onClickAdd(0.3)">+3</button>
      <button class="btn" @click="onClickAdd(-0.3)">-3</button>
      <button class="btn" @click="stop">stop</button>
    </div>
  </div>
</template>

<script>
  let vd = null;
  const url =
    'https://storage.cloud.google.com/bkm_tmp/train_simulator/video/train.mp4?authuser=2&_ga=2.231403293.-326100595.1657302146&_gac=1.213460582.1657302146.CjwKCAjwq5-WBhB7EiwAl-HEkj3CeXr2A_isEI2c0_xz7JGg7LRI7wwxo2ot8eiYz84cxgavogXobBoCOxMQAvD_BwE';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
    data: () => {
      return {
        url,
      };
    },
    mounted() {},
    methods: {
      play() {
        vd.play();
      },
      stop() {
        vd.pause();
      },
      onLoadedVideo(evt) {
        vd = evt.target;
        vd.addEventListener('canplaythrough', () => {
          console.log(
            'バッファリングを止めることなく、' +
              '動画全体を再生できると思います。'
          );
        });
        vd.addEventListener('canplay', () => {
          console.log(
            '動画は開始できますが、最後まで再生されるかどうかはわかりません。'
          );
        });
        vd.addEventListener('seeking', () => {
          console.log('動画は新しい位置をシーク中です。');
        });
        vd.addEventListener('seeked', () => {
          console.log('動画が探していた再生位置を見つけました。');
        });
        vd.addEventListener('ratechange', () => {
          console.log('再生レートが変わりました。');
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
  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .video {
    width: 540px;
    height: 320px;
    display: flex;
    justify-content: center;
    background-color: #eee;
    video {
      width: 100%;
    }
  }
  .btns {
    padding: 16px;
  }
  .btn {
    width: 32px;
    height: 32px;
  }
</style>
