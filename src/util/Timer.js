export const Timer = () => {
  // let secTimer;
  let sec = 0;
  let isProcessing = false;
  let isPause = false;
  let interval = 1000;
  const callbacks = [];

  //RAF;
  let startTime;
  let endTime;

  let requestID;

  const setCallback = (cb) => {
    callbacks.push(cb);
  };

  const setInterval = (n) => {
    interval = n;
  };

  // setTimeoutだと動画再生すると少しづつ遅れていくので、
  // requestAnimationFrameで時間計算する
  // -> これはこれで1000msecの一定間隔で実行するわけではないので、
  // 多少のずれは生じる可能性がある
  // Date().getTime() = ミリ秒
  const loop = () => {
    endTime = new Date().getTime();
    if (endTime - startTime >= interval) {
      if (isProcessing) {
        if (!isPause) {
          sec += endTime - startTime;
          // console.log('■ loop', interval, sec);
          callbacks.forEach((callback) => {
            callback(sec / 1000);
          });
        }
      }
      startTime = new Date().getTime();
    }
    requestID = requestAnimationFrame(loop);
  };

  const start = () => {
    // console.log('■ timer start');
    isProcessing = true;
    isPause = false;
    startTime = new Date().getTime();
    loop();
  };

  const stop = () => {
    // console.log('■ timer stop');
    isProcessing = false;
  };

  const pause = () => {
    // console.log('■ timer pause');
    isPause = true;
  };

  const counterReset = () => {
    sec = 0;
  };

  const processing = () => {
    return isProcessing;
  };

  const release = () => {
    if (requestID) cancelAnimationFrame(requestID);
  };

  return {
    setCallback,
    setInterval,
    start,
    stop,
    pause,
    counterReset,
    processing,
    release,
  };
};
