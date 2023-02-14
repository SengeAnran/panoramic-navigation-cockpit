<template>
  <Map ref="mapRef">
    <RaterLayer :tiles="tiles" :tileSize="256" :maxzoom="16" />
    <OutPolygon :key="currentArea" :code="currentArea" @dblclick="handleClick" />
    <DemoAreas v-if="showArea" :codes="demoArea" />
    <OdLine :data="odLines" />
    <template v-if="showCompany">
      <Marker
        v-for="item in companyList"
        :key="item.projectId"
        :position="[+item.lng, +item.lat]"
        :markerOptions="{ offset: companyOffset }"
      >
        <template #icon>
          <CompanyIcon />
        </template>
      </Marker>
    </template>
    <template v-if="showProject">
      <Marker
        v-for="item in projectList"
        :key="item.projectId"
        :position="[+item.lng, +item.lat]"
        :markerOptions="{ offset: projectOffset }"
      >
        <template #icon>
          <ProjectIcon />
        </template>
        <template #popup>
          <ProjectPopup :point="item" />
        </template>
      </Marker>
    </template>
  </Map>
  <Legend :options="options" v-model="selected" />
</template>
<script setup>
import { shallowRef, ref, watchEffect, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import Map from '@/MMap/Map';
import RaterLayer from '@/MMap/RaterLayer';
import Marker from '@/MMap/Marker';
import OdLine from '@/MMap/ThreeLayer/OdLine';
import CompanyIcon, { offset as companyOffset } from './Icon/Company';
import ProjectIcon, { offset as projectOffset } from './Icon/Project';
import Legend from './Legend';
import ProjectPopup from './ProjectPopup';
import { getProjectList } from '@/api/project';
import DemoAreas from './DemoAreas';
import OutPolygon from './OutPolygon';
import areaProps from './flat.json';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

const store = useStore();
const mapRef = ref();
const currentArea = ref(100000);
const currentAreaDetail = computed(() => {
  return areaProps[currentArea.value];
});

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
const projectList = shallowRef();
const companyList = shallowRef();
const odLines = shallowRef();
const demoArea = shallowRef();
watchEffect(async () => {
  projectList.value = undefined;
  companyList.value = undefined;
  odLines.value = undefined;
  demoArea.value = undefined;
  const query = store.getters.query;
  const projectTypes = query.filter((d) => d.type === '项目类型').map((d) => d.value);
  const keys = query.filter((d) => d.type === '项目领域').map((d) => d.value);
  console.log(projectTypes, keys);
  const key = '物联网智能感知终端平台系统与应用验证';
  // const key = undefined;
  const res = await getProjectList({
    projectTypes,
    key,
    area: {
      areaId: currentAreaDetail.value.adcode,
      level: currentAreaDetail.value?.level,
    },
  }).catch((err) => {
    // console.log(err.message);
    ElMessage.error({
      message: err.message,
      type: 'error',
      // duration: 0,
    });
  });
  console.log('map data', res);

  if (!res?.length) {
    ElMessage.error({
      message: '暂无数据',
      type: 'error',
      // duration: 0,
    });
    return;
  }
  projectList.value = res
    .filter((d) => d.areas?.length > 1)
    // .map((d) => d.areas[1])
    .map((d) => {
      const area = d.areas[0];
      return {
        lng: +area.longitude,
        lat: +area.latitude,
        projectId: d.projectId,
        _: d,
      };
    });
  const areas = res
    .filter((d) => d.areas.length > 0)
    .map((d) => d.areas)
    .flat()
    .map((d) => d.areaId);
  demoArea.value = Array.from(new Set(areas));
  companyList.value = res
    .filter((d) => d.companies?.length > 1)
    .map((d) => d.companies)
    .flat()
    .map((d, i) => ({
      lng: +d.longitude,
      lat: +d.latitude,
      projectId: i,
    }));
  odLines.value = res
    .filter((d) => d.areas?.length > 1)
    .map((d) => {
      const area = d.areas[0];
      const start = [+area.longitude, +area.latitude];
      return d.companies.map((company) => {
        return [start, [+company.longitude, +company.latitude]];
      });
    })
    .flat();
});

const options = [
  { label: '项目分布', value: 'project' },
  { label: '参与单位', value: 'company' },
  { label: '示范地区', value: 'area' },
];
const selected = ref(['project', 'company']);
const showProject = computed(() => selected.value?.includes('project'));
const showCompany = computed(() => selected.value?.includes('company'));
const showArea = computed(() => selected.value?.includes('area'));
const tiles = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}';
</script>
