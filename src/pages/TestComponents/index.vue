<!-- TestComponents -->
<template>
  <div class="TestComponents-root" @click.self="popupBoxFlag = !popupBoxFlag">
    <PanelBox direction="left">
      <LayerBox class="LayerBox1" name="组织建设">
        <ViewBox class="ViewBox" name="组织架构">
          <template #right>
            <TabSwitch :options="options" v-model="activeValue" />
          </template>
          <div class="select-test">
            <div class="select-btn" @click="selectOpen = !selectOpen">下拉选择：{{ actvieOption.name }}</div>
            <MeSelect
              v-model:visible="selectOpen"
              :options="selectOptions"
              v-model="activeSelect"
              v-model:actvieOption="actvieOption"
            />
          </div>
        </ViewBox>
        <ViewBox class="ViewBox" name="组织架构">
          <template #right>
            <TabSwitch :options="options" v-model="activeValue" />
          </template>
        </ViewBox>
        <ViewBox class="ViewBox" name="组织架构">
          <template #right>
            <TabSwitch :options="options" v-model="activeValue" />
          </template>
        </ViewBox>
        <ViewBox class="ViewBox" name="组织架构">
          <template #right>
            <TabSwitch :options="options" v-model="activeValue" />
          </template>
        </ViewBox>
      </LayerBox>
      <LayerBox class="LayerBox1" name="组织建设">
        <ViewBox class="ViewBox" name="组织架构">
          <template #right>
            <TabSwitch :options="options" v-model="activeValue" />
          </template>
        </ViewBox>
      </LayerBox>
    </PanelBox>
    <PanelBox direction="right">
      <LayerBox class="LayerBox2" name="组织建设" :right="true">
        <ViewBox class="ViewBox" name="三会一课" :more="() => handleMore(1)"> </ViewBox>
      </LayerBox>
      <LayerBox class="LayerBox2" name="组织建设" :right="true">
        <ViewBox class="ViewBox" name="三会一课" :more="handleMore"> </ViewBox>
      </LayerBox>
      <LayerBox class="LayerBox2" name="组织建设" :right="true">
        <ViewBox class="ViewBox" name="三会一课" :more="handleMore"> </ViewBox>
      </LayerBox>
      <LayerBox class="LayerBox2" name="组织建设" :right="true">
        <ViewBox class="ViewBox" name="三会一课" :more="handleMore"> </ViewBox>
      </LayerBox>
      <LayerBox class="LayerBox2" name="组织建设" :right="true">
        <ViewBox class="ViewBox" name="三会一课" :more="handleMore"> </ViewBox>
      </LayerBox>
      <LayerBox class="LayerBox2" name="组织建设" :right="true">
        <ViewBox class="ViewBox" name="三会一课" :more="handleMore"> </ViewBox>
      </LayerBox>
    </PanelBox>
  </div>
  <PopupBox
    name="党性体检"
    v-if="popupBoxFlag"
    @close="popupBoxFlag = false"
    :body-style="{ width: '864px', height: '478px' }"
  >
    <div style="width: 100%; height: 100%" @click="handleOpenTooltipBox($event)">
      <TooltipBox style="width: 200px" v-if="false" :event="event" @close="event = null"> 弹框测试 </TooltipBox>
      <CommonTable
        :columns="columns"
        height="478px"
        :data-source="dataSource"
        has-index
        has-panel
        :pagination="pagination"
      >
        <template #key7="{ scope: { row } }">
          <span :style="`color: #${row.key7 === 0 ? '18ff00' : row.key7 === 1 ? 'fff15a' : 'f28731'}`">
            {{ row.key7 === 0 ? '健康' : row.key7 === 1 ? '亚健康' : '不健康' }}
          </span>
        </template>
      </CommonTable>
    </div>
  </PopupBox>
  <IntervalEvent :interval="1" @interval="handleIntervalEvent" />
</template>

<script setup>
import { ref } from 'vue';

const options = [
  { label: '党组织', value: '党组织' },
  { label: '村委会', value: '村委会' },
  { label: '村监会', value: '村监会' },
  { label: '合作社', value: '合作社' },
];
const activeValue = ref('党组织');
const popupBoxFlag = ref(false);

function handleMore(val) {
  console.log(val);
}

const event = ref(null);
function handleOpenTooltipBox(e) {
  event.value = e;
}

const pagination = ref({ pageSize: 10, total: 123, currentPage: 1 });

import { MOCK_DATA as dataSource, COLUMNS as columns } from './options';

function handleIntervalEvent() {
  console.log(12);
}

const selectOptions = [
  { name: '选项1', key: '1' },
  { name: '选项2', key: '2' },
  { name: '选项3', key: '3' },
  { name: '选项4', key: '4' },
  { name: '选项5', key: '5' },
  { name: '选项6', key: '6' },
  { name: '选项7', key: '7' },
  { name: '选项8', key: '8' },
  { name: '选项9', key: '9' },
  { name: '选项10', key: '10' },
  { name: '选项11', key: '11' },
];
const selectOpen = ref(false);
const activeSelect = ref('1');
const actvieOption = ref({ name: '选项1', key: '1' });
</script>

<style lang="scss" scoped>
.TestComponents-root {
  position: relative;
  width: 100%;
  height: 1080px;
  background: url('../../assets/img/bg.png');
}
.ViewBox {
  width: 390px;
  height: 202px;
}
.select-test {
  position: relative;
  .select-btn {
    cursor: pointer;
  }
}
</style>
