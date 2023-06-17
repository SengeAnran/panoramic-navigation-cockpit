<template>
  <div class="project-popup">
    <!--    项目详情-->
    <ProjectDetail @showDetail="showDetail" v-if="showProjectDetail" v-bind="$attrs" :point="props.point" />
    <!--    企业详情-->
    <EnterpriseDetails
      :hideBack="hideBack"
      @closeView="closeEnter"
      class="enterprise-details"
      v-if="showEnterpriseDetails"
    />
    <!--    人才详情-->
    <TalentDetails
      @closeView="showTalentDetails = false"
      @showSchoolOrEnt="showSchoolOrEnt"
      class="enterprise-details"
      v-if="showTalentDetails"
    />
    <!--    机构详情-->
    <InstitutionalDetails
      :hideBack="hideBack"
      @closeView="closeEnter"
      class="enterprise-details"
      v-if="showInstitutionalDetails"
    />
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import ProjectDetail from './ProjectDetail/index';
import EnterpriseDetails from './EnterpriseDetails/index';
import TalentDetails from './TalentDetails/index';
import InstitutionalDetails from './InstitutionalDetails/index';
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
  point: null,
  showCompany: {
    type: Boolean,
    default: false,
  },
});
// const areaMap = ref();
const showProjectDetail = ref(!props.showCompany);
const showEnterpriseDetails = ref(false);
const showTalentDetails = ref(false);
const showInstitutionalDetails = ref(false);
const hideBack = ref(false);
onBeforeMount(() => {
  if (props.showCompany) {
    enterInit();
  }
});
function enterInit() {
  hideBack.value = true;
  if (!props.point.type || !props.point.projectId) return;
  const type = props.point.type;
  store.commit('mapPop/SET_ID', props.point.projectId);
  if (type === 'enterprise') {
    // 企业
    // showTalentDetails.value = false;
    showEnterpriseDetails.value = true;
  } else if (type === 'institution') {
    // 机构
    // showTalentDetails.value = false;
    showInstitutionalDetails.value = true;
  }
}
// onMounted(async () => {
//   const { data } = await axios.get('/map/flat.json');
//   areaMap.value = data;
// });
const store = useStore();
function closeEnter() {
  showEnterpriseDetails.value = false;
  showInstitutionalDetails.value = false;
  showProjectDetail.value = true;
  console.log('showProjectDetail');
}
function showDetail(data) {
  const type = data?.data.type;
  // console.log(data?.data);
  if (data?.data.nodeId) {
    hideBack.value = false; // 二级弹窗返回功能开启
    store.commit('mapPop/SET_ID', data?.data.nodeId);
    if (type === 'character') {
      showTalentDetails.value = true;
      return;
    }
    if (type === 'enterprise') {
      showEnterpriseDetails.value = true;
      return;
    }
    if (type === 'institution') {
      showInstitutionalDetails.value = true;
      return;
    }
  } else {
    ElMessage.warning({
      message: '暂无该节点的详情信息',
      type: 'warning',
    });
  }
}
function showSchoolOrEnt(type) {
  if (type === 'enterprise') {
    // 企业
    showTalentDetails.value = false;
    showEnterpriseDetails.value = true;
  } else if (type === 'institution') {
    // 机构
    showTalentDetails.value = false;
    showInstitutionalDetails.value = true;
  }
}
</script>
<style lang="scss" scoped>
.project-popup {
  position: relative;
  border: 1px solid #46e9fe;
  border-radius: 10px;
}
</style>
