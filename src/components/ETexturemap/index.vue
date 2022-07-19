<template>
  <div class="map-group">
    <div class="e-chart" ref="chart"></div>
    <img class="texture-img" src="./imgs/texture2.png" alt="" ref="texture" />
    <img class="texture-img" src="./imgs/texture-light.png" alt="" ref="textureLight" />
    <img class="texture-img" src="./imgs/texture-active.png" alt="" ref="textureActive" />
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ZJJSON from './330000_full';
import ZJPart from './330000_part';
import * as echarts from 'echarts/core';
import { getData, getMapSetting, MAP_DEFAULT_LABEL, SCATTER_STYLE, TOOLTIP_STYLE } from './data';

echarts.registerMap('zjGeo', ZJJSON);
echarts.registerMap('zjPart', ZJPart);

const chart = ref(null);
const mapChart = ref(null);
const texture = ref(null);
const textureLight = ref(null);
const textureActive = ref(null);

const data = getData();

// 地图渲染
const initMap = () => {
  const option = {
    tooltip: {
      ...TOOLTIP_STYLE,
    },
    geo: [
      // 地图hover变透明时的底图层 -- 层级在map层下方
      {
        ...getMapSetting({
          image: texture.value,
          repeat: 'repeat',
        }),
        zlevel: 1,
      },
      // 阴影层 --  level 层级最低
      {
        ...getMapSetting('#00153655', '#00153655', { borderColor: '#1cccff88' }),
        layoutCenter: ['51%', '52%'],
      },
    ],
    series: [
      // 顶层部分浅色地图
      {
        // selectedMode: 'single',
        selectedMode: false,
        type: 'map',
        ...getMapSetting(
          {
            image: textureLight.value,
          },
          {
            image: textureActive.value,
          },
        ),
        label: {
          show: false,
          emphasis: {
            show: false,
          },
        },
        map: 'zjPart',
        data: data,
        zlevel: 3,
      },
      {
        // selectedMode: 'single',
        selectedMode: false,
        type: 'map',
        ...getMapSetting(
          {
            image: texture.value,
            repeat: 'repeat',
          },
          {
            image: textureActive.value,
          },
        ),
        label: {
          show: false,
          emphasis: {
            show: false,
          },
        },
        data: data,
        zlevel: 2,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        ...SCATTER_STYLE,
        zlevel: 4,
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        ...SCATTER_STYLE,
        label: {
          ...MAP_DEFAULT_LABEL,
        },
        zlevel: 4,
        data: data,
      },
    ],
  };

  mapChart.value = echarts.init(chart.value, 'macarons');
  mapChart.value && mapChart.value.setOption(option, true);
};
// 图片加载完成后在渲染地图
const loadImg = () => {
  const promiseTexture = new Promise((resolve) => {
    texture.value.onload = function () {
      resolve(true);
    };
  });
  const promiseActive = new Promise((resolve) => {
    textureActive.value.onload = function () {
      resolve(true);
    };
  });
  const promiseLight = new Promise((resolve) => {
    textureLight.value.onload = function () {
      resolve(true);
    };
  });
  return new Promise((resolve) => {
    Promise.all([promiseTexture, promiseActive, promiseLight]).then(() => {
      resolve(true);
    });
  });
};

onMounted(async () => {
  await loadImg();
  initMap();
});

onUnmounted(() => {
  if (!mapChart.value) {
    return;
  }
  mapChart.value.dispose();
  mapChart.value = null;
});
</script>
<style lang="scss" scoped>
.map-group {
  width: 100%;
  height: 100%;
  background: url('./imgs/bg.png') -562px -281px;
  .e-chart {
    position: absolute;
    width: 630px;
    height: 560px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .texture-img {
    position: absolute;
    visibility: hidden;
  }
  .canvas-texture {
    position: absolute;
  }
}
</style>
