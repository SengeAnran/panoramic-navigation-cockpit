<template>
  <Map ref="mapRef">
    <RaterLayer
      tiles="http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
      :tileSize="256"
      :maxzoom="16"
    />
    <OutPolygon :key="currentArea" :code="currentArea" @dblclick="handleClick" />
    <OdLine :data="testLines" />
    <DemoAreas :codes="demoAreaCodes" />
    <template v-if="showArea">
      <Marker
        v-for="(item, index) in areaPoints"
        :key="index"
        :position="[item.lng, item.lat]"
        :markerOptions="{ offset: [0, -27] }"
      >
        <template #icon>
          <MarkerIcon type="company" />
        </template>
      </Marker>
    </template>
    <template v-if="showSystem">
      <Marker
        v-for="item in systemPoints"
        :key="item.id"
        :position="[item.lng, item.lat]"
        @openPopup="handleOpen(item)"
        @closePopup="handleClose(item)"
        :markerOptions="{ offset: [0, -27] }"
        :popupOptions="{
          className: 'opacity-popup',
          maxWidth: 'none',
          anchor: 'left',
          closeButton: false,
        }"
      >
        <template #icon>
          <MarkerIcon type="system" />
        </template>
        <template #popup>
          <SystemPopup :point="item._" @open="openSingleDetail" />
        </template>
      </Marker>
    </template>
  </Map>
  <Legend :options="options" v-model="selected"></Legend>
</template>
<script setup>
import { shallowRef, onMounted, ref, computed, onBeforeUnmount, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { changeToggle } from '@/api/atlas';
import Map from '@/MMap/Map';
import RaterLayer from '@/MMap/RaterLayer';
import Marker from '@/MMap/Marker';
import OdLine from '@/MMap/ThreeLayer/OdLine';
import Legend from './Legend';
import OutPolygon from './OutPolygon';
import MarkerIcon from './MarkerIcon';
import SystemPopup from './SystemPopup';
import { getSystemList } from '@/api/atlas';
import DemoAreas from './DemoAreas';
import areaProps from './flat.json';

const store = useStore();
const mapRef = ref();
const demoAreaCodes = shallowRef();
const currentArea = ref(100000);
// const currentAreaDetail = computed(() => {
//   return areaProps[currentArea.value];
// });

function handleClick(item) {
  console.log('handleClick click');
  const props = areaProps[item.adcode];
  if (props.level > 2) {
    return;
  }
  currentArea.value = item.adcode;
}
function back() {
  const props = areaProps[currentArea.value];
  currentArea.value = props.parent.adcode || 100000;
}
onMounted(async () => {
  const map = await mapRef.value.mapPromise;
  map.on('contextmenu', back);
});
onBeforeUnmount(async () => {
  const map = await mapRef.value.mapPromise;
  map.off('contextmenu', back);
});
const options = [
  { label: '系统点位', value: 'system' },
  { label: '示范地区', value: 'area' },
];
const selected = ref(['system', 'area']);
const showSystem = computed(() => selected.value?.includes('system'));
const showArea = computed(() => selected.value?.includes('area'));
const systemPoints = shallowRef();
const areaPoints = shallowRef();
function handleOpen(item) {
  // console.log(item);
  const areaSet = new Set(item.areas);
  areaSet.delete(100000);
  areaSet.delete('100000');
  demoAreaCodes.value = Array.from(areaSet);
}
function handleClose() {
  demoAreaCodes.value = undefined;
}
const testLines = shallowRef();
async function openSingleDetail(detail) {
  // const mock = {
  //   node_id: '3a0a0169-6b2b-a154-209a-b1821ef25eed',
  //   node_type: 'page',
  //   node_name: '政务公开',
  //   meta: {
  //     url: 'https://www.zj.gov.cn/col/col1543574/index.html',
  //     video_url: '',
  //   },
  //   system: '浙江政务服务网',
  //   sys_id: '3a0a015b-fc76-4b11-1b6f-20cea2e2db40',
  //   children: [],
  //   name: '政务公开',
  // };
  const query = {
    sys_id: detail.id,
    system: detail.systemName,
    node_name: detail.systemName,
    meta: {
      url: detail.rootUrl,
      video_url: detail.rootVideoUrl,
    },
  };
  const { url, video_url, scriptCollectName, scriptName } = query.meta || {};
  const data = { url, video_url, scriptCollectName, scriptName, topicPattern: 'SINGLE' };
  const res = await changeToggle(data);
  console.log(res);
  // store.commit('SET_CONTENT_OPACITY', true);
  // const rootId = getTreeRootId(node);
  // console.log(rootId, node.data);
  // store.commit('atlasMap/SET_DIALOG_INFO', { rootId: query.sys_id, ...query });
  // store.commit('atlasMap/SET_DIALOG_SHOW_FIRST_TIME', true);
  // store.commit('SET_SHOW_ONE_DIALOG', true);
  // store.commit('SET_MAIN_TITLE', query.system);
  // console.log(detail);
  const pathQuery = { ...query, meta: '' };
  const openUrl = '/one-map?data=' + JSON.stringify(pathQuery);
  window.open(openUrl, '_blank');
}

watchEffect(async () => {
  systemPoints.value = undefined;
  areaPoints.value = undefined;
  const query = store.getters.query?.length ? store.getters.query : [];
  const hotWords = query.filter((d) => d.type === 'heightWord').map((d) => d.name);
  const keyWords = query.filter((d) => d.type === 'search').map((d) => d.name);
  const queryDims = [];
  query
    .filter((d) => d.type !== 'search' && d.type !== 'heightWord' && d.type !== 'field')
    .forEach((d) => {
      const index = queryDims.findIndex((j) => j.top === d.type);
      if (index === -1) {
        queryDims.push({
          top: d.type,
          seconds: [d.name],
        });
      } else {
        queryDims[index].seconds.push(d.name);
      }
    });
  const params = {
    areaCode: [currentArea.value],
    hotWords: hotWords.length ? hotWords : [],
    keys: keyWords.length ? keyWords : [],
    queryDims: queryDims,
  };
  // console.log(params);
  const data = await getSystemList(params);
  systemPoints.value = data
    .filter((d) => d.areas?.length)
    .map((d) => {
      const system = d.areas[0];
      return {
        lng: +system.longitude,
        lat: +system.latitude,
        areas: d.areas.map((d) => d.areaId),
        _: d,
      };
    });
  areaPoints.value = data
    .filter((d) => d.areas?.length > 1)
    .map((d) => {
      const areas = d.areas.slice(1);
      return areas.map((d) => ({
        lng: +d.longitude,
        lat: +d.latitude,
      }));
    })
    .flat();

  testLines.value = data
    .filter((d) => d.areas?.length > 1)
    .map((d) => {
      const [from, ...target] = d.areas;
      const fromPoint = [+from.longitude, +from.latitude];
      return target.map((d) => {
        return [fromPoint, [+d.longitude, +d.latitude]];
      });
    })
    .flat();
});
</script>
