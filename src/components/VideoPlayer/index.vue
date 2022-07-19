<template>
  <div class="video-player-root">
    <video ref="playerContainer" class="video-js vjs-default-skin"></video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import videoJs from 'video.js';
import video_zhCN from 'video.js/dist/lang/zh-CN.json';
import 'video.js/dist/video-js.css';
videoJs.addLanguage('zh-CN', video_zhCN);

const props = defineProps({
  url: {
    type: String,
  },
  preview: {
    type: String,
    default: undefined,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
});
const playerContainer = ref(null);
let videoPlayer = null;

watch(() => props.url, update);

function init() {
  if (!videoPlayer) {
    const player = videoJs(playerContainer.value, {
      //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      controls: true,
      controlBar: {
        pictureInPictureToggle: false,
      },
      bigPlayButton: true,
      muted: true,
      //自动播放属性,muted:静音播放
      autoplay: props.autoPlay,
      //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      preload: 'auto',
      poster: props.preview,
      // aspectRatio: '16:9',
      liveui: false,
      language: 'zh-CN',
      fluid: false,
      suppressNotSupportedError: true,
      errorDisplay: true,
    });
    videoPlayer = player;
  }
}

function update() {
  init();
  if (props.url) {
    const isMu38 = RegExp('\\.(m3u8)', 'i').test(props.url.toLowerCase());
    if (isMu38) {
      videoPlayer.src({ src: props.url, type: 'application/x-mpegURL' });
    } else {
      videoPlayer.src({ src: props.url });
    }
  }
}

onMounted(update);

onUnmounted(() => {
  if (videoPlayer) {
    videoPlayer.dispose();
    videoPlayer = null;
  }
});
</script>

<style lang="scss" scoped>
.video-player-root {
  position: relative;
  width: 100%;
  height: 100%;
  .video-js {
    position: relative;
    width: 100%;
    height: 100%;

    &:focus {
      outline: none;
    }
    :deep(.vjs-big-play-button) {
      top: calc(50% - 20px);
      left: calc(50% - 20px);
      width: 40px;
      height: 40px;
      border: 0px solid #ffffff;
      border-radius: 20px;
      background-color: rgba(white, 0.8);
      font-size: 2.7em;

      .vjs-icon-placeholder {
        color: rgba(black, 0.8);
      }
    }
  }
}
</style>
