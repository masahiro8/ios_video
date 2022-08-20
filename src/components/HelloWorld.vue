<template>
  <div class="app">
    <div class="infos">
      <div>{{ loadingProgress }}</div>
      <div>{{ playbackRate }}</div>
      <div>{{ ctr.decrease }}/{{ ctr.increase }}</div>
    </div>
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
      <button class="btn" @click="decrease">D</button>
      <button class="btn" @click="increase">I</button>
    </div>
  </div>
</template>

<script>
  import { fileLoader } from '../util/fileLoader';
  import { Timer } from '../util/Timer';

  let vd = null;
  // const url =
  //   'https://storage.googleapis.com/bkm_tmp/train_simulator/video/train.mp4';
  const url = './video/train.mp4';

  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
    data: () => {
      return {
        src: null,
        timer: null,
        loadingProgress: 0,
        playbackRate: 0,
        ctr: {
          decrease: false,
          increase: false,
        },
      };
    },
    mounted() {
      vd = document.getElementById('trainVideo');
      this.timer = Timer();
      this.loadData();
      this.init();
    },
    methods: {
      init() {
        this.timer.setInterval(100);
        this.timer.setCallback((s) => {
          // 減速
          if (this.ctr.decrease) {
            let playbackRate = vd.playbackRate;
            if (playbackRate <= 0.2) this.stc.decrease = true;
            playbackRate = playbackRate - 0.01;
            vd.playbackRate = playbackRate;
          }
          // 加速
          if (this.ctr.increase) {
            let playbackRate = vd.playbackRate;
            if (playbackRate >= 2.5) this.stc.increase = true;
            playbackRate = playbackRate + 0.01;
            vd.playbackRate = playbackRate;
          }
          this.playbackRate = Math.floor(vd.playbackRate * 100) / 100;
          console.log('timer', s, vd.playbackRate);
        });
        this.timer.start();
      },
      increase() {
        this.ctr = {
          increase: true,
          decrease: false,
        };
      },
      decrease() {
        this.ctr = {
          increase: false,
          decrease: true,
        };
      },
      async loadData() {
        const result = await fileLoader().getFiles([{ url }], (progress) => {
          const total = Object.keys(progress).length * 100;
          const current = Object.keys(progress)
            .map((key) => progress[key].progress)
            .reduce((prev, current) => prev + current);
          const loadingProgress = (Math.ceil(current) / total) * 100;
          this.loadingProgress = loadingProgress;
          console.log('■ ', loadingProgress);
        });
        console.log('result', result);
        this.$nextTick(() => {
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
        playbackRate = playbackRate + n;
        vd.playbackRate = playbackRate;
        console.log('playbackRate', playbackRate);
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
    position: relative;
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
  .infos {
    padding: 8px;
    text-align: right;
    padding: 8px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .btns {
    padding: 16px;
  }
  .btn {
    width: 48px;
    height: 48px;
    border-radius: 2px;
  }
</style>
