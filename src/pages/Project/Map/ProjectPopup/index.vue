<template>
  <div class="project-popup">
    <!--    项目详情-->
    <ProjectDetail @showDetail="showDetail" v-if="showProjectDetail" v-bind="$attrs" :point="props.point" />
    <!--    企业详情-->
    <EnterpriseDetails @closeView="closeEnter" class="enterprise-details" v-if="showEnterpriseDetails" />
    <!--    人才详情-->
    <TalentDetails
      @closeView="showTalentDetails = false"
      @showSchoolOrEnt="showSchoolOrEnt"
      class="enterprise-details"
      v-if="showTalentDetails"
    />
    <!--    机构详情-->
    <InstitutionalDetails
      @closeView="showInstitutionalDetails = false"
      class="enterprise-details"
      v-if="showInstitutionalDetails"
    />
  </div>
</template>
<script setup>
import ProjectDetail from './ProjectDetail/index';
import EnterpriseDetails from './EnterpriseDetails/index';
import TalentDetails from './TalentDetails/index';
import InstitutionalDetails from './InstitutionalDetails/index';
import { ref } from 'vue';
const props = defineProps({
  point: null,
  showCompany: {
    type: Boolean,
    default: false,
  },
});
// const areaMap = ref();
const showProjectDetail = ref(!props.showCompany);
const showEnterpriseDetails = ref(props.showCompany);
const showTalentDetails = ref(false);
const showInstitutionalDetails = ref(false);
// onMounted(async () => {
//   const { data } = await axios.get('/map/flat.json');
//   areaMap.value = data;
// });
function closeEnter() {
  showEnterpriseDetails.value = false;
  showProjectDetail.value = true;
}
function showDetail(data) {
  const type = data?.data.type;
  if (data?.data.nodeId) {
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
  }
}
function showSchoolOrEnt(data) {
  console.log(data);
  showTalentDetails.value = false;
  showEnterpriseDetails.value = true;
}
</script>
<style lang="scss" scoped>
.project-popup {
  position: relative;
  border: 1px solid #46e9fe;
  border-radius: 10px;
}
</style>
