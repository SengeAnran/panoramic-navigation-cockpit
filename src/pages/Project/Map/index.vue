<template>
  <Map ref="mapRef">
    <RaterLayer :tiles="tiles" :tileSize="256" :maxzoom="16" />
    <OutPolygon :key="currentArea" :code="currentArea" @dblclick="handleClick" />
    <DemoAreas v-if="showArea" :codes="demoArea" />
    <OdLine :data="testLines" v-if="false" />
    <OdLine :data="odLines" v-if="showCompany && showProject" />
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
        <template #popup>
          <ProjectPopup :point="item" showCompany />
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
import ProjectPopup from '@/views/ProjectPopup';
import { getProjectList } from '@/api/project';
import DemoAreas from './DemoAreas';
import OutPolygon from './OutPolygon';
import areaProps from './flat.json';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

const store = useStore();
const mapRef = ref();
const currentArea = ref(100000);
// const currentAreaDetail = computed(() => {
//   return areaProps[currentArea.value];
// });

function handleClick(item) {
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
const testLines = [
  [
    [123.89, 44.11],
    [88.74, 34.33],
  ],
];
const demoArea = shallowRef();
watchEffect(async () => {
  projectList.value = undefined;
  companyList.value = undefined;
  odLines.value = undefined;
  demoArea.value = undefined;
  const query = store.getters.query;
  const projectTypes = query.filter((d) => d.type === '项目类型').map((d) => d.value);
  const TechnicalDirects = query.filter((d) => d.type === '技术方向').map((d) => d.value);
  const ServiceContents = query.filter((d) => d.type === '服务内容').map((d) => d.value);
  const ApplicationScenarios = query.filter((d) => d.type === '应用场景').map((d) => d.value);
  const keys = query.filter((d) => d.type === 'search').map((d) => d.value);
  const queryDims = [];
  query
    .filter(
      (d) =>
        d.type !== 'search' &&
        d.type !== '项目类型' &&
        d.type !== '技术方向' &&
        d.type !== '服务内容' &&
        d.type !== '应用场景',
    )
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
  console.log(projectTypes, keys);
  // const key = '物联网智能感知终端平台系统与应用验证';
  // const key = undefined;
  const res = await getProjectList({
    areaCodes: currentArea.value == 100000 ? ['' + currentArea.value] : [],
    projectTypes,
    keys,
    queryDims,
    TechnicalDirects,
    ServiceContents,
    ApplicationScenarios,
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
    // .filter((d) => d.areas?.length > 1) //???
    .filter((d) => d.areas?.length > 0)
    // .map((d) => d.areas[1])
    .map((d) => {
      const area = d.companies.filter((i) => i.roleName === '项目负责')[0];
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
  const areaSet = new Set(areas);
  areaSet.delete(100000); // 过滤中国
  areaSet.delete('100000');
  demoArea.value = Array.from(areaSet);
  companyList.value = res
    .filter((d) => d.companies?.length > 0)
    .map((d) => d.companies)
    .flat()
    .map((d) => ({
      lng: +d.longitude,
      lat: +d.latitude,
      projectId: d.id,
      type: d.type,
    }));
  odLines.value = res
    .filter((d) => d.areas?.length > 0)
    .map((d) => {
      // const area = d.areas[0];
      const area = d.companies.filter((i) => i.roleName === '项目负责')[0];
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
