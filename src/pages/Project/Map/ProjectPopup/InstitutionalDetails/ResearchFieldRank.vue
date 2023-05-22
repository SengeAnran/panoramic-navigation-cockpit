<template>
  <div class="body">
    <div class="list">
      <div
        v-for="(item, index) in dataList"
        :key="item.name"
        :class="{ active: activeIndex === index }"
        class="list-item"
        @click="changeActive(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="delimiter" />
    <Ranking :dataList="dataList2" />
  </div>
</template>

<script setup>
import Ranking from './Ranking';
import { computed, ref } from 'vue';
import { getProjectFraction, getSchoolFirstLevel } from '@/api/project';
import { useStore } from 'vuex';
const store = useStore();
const popId = computed(() => {
  return store.getters.popId;
});
const activeIndex = ref(0);
const activeId = ref();
const dataList2 = ref([]);
const dataList = ref([
  // { name: '信息科学' },
  // { name: '医学' },
  // { name: '生物学' },
  // { name: '材料科学' },
  // { name: '数学' },
  // { name: '经济学' },
  // { name: '地质学' },
  // { name: '物理学' },
  // { name: '地理学' },
  // { name: '工程学' },
  // { name: '商业' },
  // { name: '化学' },
  // { name: '环埴科学' },
]);
async function getTypeData() {
  const res = await getSchoolFirstLevel(popId.value);
  dataList.value = res.map((i) => {
    return {
      name: i.fieldName,
      id: i.id,
    };
  });
  activeId.value = dataList.value[0].id;
  getDataList();
}
getTypeData();
function getDataList() {
  getProjectFraction(popId.value, activeId.value).then((res) => {
    dataList2.value = res.map((i) => {
      return {
        name: i.fieldName,
        value: i.rank,
        innovationIndex: i.innovationIndex,
      };
    });
  });
}
function changeActive(item, index) {
  activeIndex.value = index;
  activeId.value = item.id;
  getDataList();
}
</script>

<style lang="scss" scoped>
.body {
  display: flex;
  align-items: flex-start;
  .list {
    max-height: 480px;
    overflow-y: scroll;
    .list-item {
      text-align: center;
      width: 184px;
      height: 32px;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
      &.list-item:nth-child(n + 2) {
        cursor: pointer;
        margin: 6px 0;
      }
      &.active {
        background: linear-gradient(
          90deg,
          rgba(78, 132, 186, 0) 0%,
          rgba(111, 169, 227, 0.99) 46%,
          rgba(78, 132, 186, 0.01) 99%
        );
        font-weight: bold;
      }
    }
  }
  .delimiter {
    margin: 0px 10px;
    width: 1px;
    flex: none;
    height: auto;
    align-self: stretch;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #42c2d9 50%, rgba(255, 255, 255, 0) 100%);
  }
}
</style>
