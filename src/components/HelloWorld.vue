<template>
  <div class="app">
    <div class="video">
      <video
        id="trainVideo"
        @loadeddata="onLoadedVideo"
        :src="src"
        playsinline
        autoplay
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
  import { fileLoader } from '../util/fileLoader';
  let vd = null;
  const url =
    'https://storage.googleapis.com/bkm_tmp/train_simulator/video/train.mp4';
  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
    data: () => {
      return {
        elem: null,
        src: null,
      };
    },
    mounted() {
      this.loadData();
      this.elem = document.getElementById('trainVideo');
    },
    methods: {
      async loadData() {
        const result = await fileLoader().getFiles([{ url }], (progress) => {
          const total = Object.keys(progress).length * 100;
          const current = Object.keys(progress)
            .map((key) => progress[key].progress)
            .reduce((prev, current) => prev + current);
          const loadingProgress = (Math.ceil(current) / total) * 100;
          console.log('■ ', loadingProgress);
        });
        console.log('result', result);
        this.$nextTick(() => {
          this.elem.addEventListener('canplaythrough', () => {
            console.log(
              'バッファリングを止めることなく、' +
                '動画全体を再生できると思います。'
            );
          });
          this.elem.addEventListener('canplay', () => {
            console.log(
              '動画は開始できますが、最後まで再生されるかどうかはわかりません。'
            );
          });
          this.elem.addEventListener('seeking', () => {
            console.log('動画は新しい位置をシーク中です。');
          });
          this.elem.addEventListener('seeked', () => {
            console.log('動画が探していた再生位置を見つけました。');
          });
          this.elem.addEventListener('ratechange', () => {
            console.log('再生レートが変わりました。');
          });
          this.src = url;
        });
      },
      play() {
        vd.play();
      },
      stop() {
        vd.pause();
      },
      onLoadedVideo(evt) {
        vd = evt.target;
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
