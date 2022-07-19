<!-- CenterQuota -->
<template>
  <div class="CenterQuota-root" :class="{ 'is-small': isSmall }">
    <div class="quota-item-box" v-for="(item, i) in list" :key="i">
      <div class="name">{{ item.name }}</div>
      <div class="info-box">
        <RollNum class="value" :number="Number(item.value) || 0" />
        <div class="unit">{{ item.unit }}</div>
        <div class="rate-box" :class="{ down: item.rate < 0 }" v-if="item.rate || item.rate === 0">
          <div class="icon"></div>
          <div class="rate">{{ Math.abs(item.rate) }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [
      { name: '乡村会客厅', value: '103', unit: '个', rate: 12 },
      { name: '党群服务中心', value: '154', unit: '个', rate: -12 },
      { name: '共享设施', value: '640', unit: '个', rate: -12 },
      { name: '帮扶关爱', value: '2400', unit: '人次', rate: 12 },
    ],
  },
  isSmall: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.CenterQuota-root {
  position: absolute;
  top: 130px;
  left: 455px;
  width: 1010px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &.is-small {
    .quota-item-box:nth-of-type(4n) {
      margin-right: 20px;
    }
    .quota-item-box .name {
      min-width: 130px;
    }
  }
  .quota-item-box {
    padding: 10px 15px;
    height: 82px;
    border: 1px solid var(--borderColor);
    background: linear-gradient(-45deg, rgba(36, 51, 43, 0.6) 0%, rgba(61, 77, 61, 0.6) 100%);
    border-radius: 8px;
    margin-right: 20px;
    margin-bottom: 20px;
    &:last-child,
    &:nth-of-type(4n) {
      margin-right: 0;
    }
    &:nth-of-type(n + 5) {
      margin-bottom: 0;
    }
    .name {
      font-size: 18px;
      font-family: MiSans-Medium;
      font-weight: 500;
      color: #ffffff;
      white-space: nowrap;
      border-bottom: 1px solid var(--borderColor);
      text-align: center;
      min-width: 165px;
      padding-bottom: 5px;
    }
    .info-box {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      line-height: 1;
      padding-top: 6px;
      .value {
        font-size: 24px;
        font-family: 'MiSans-Medium';
        font-weight: 500;
        color: var(--color);
      }
      .unit {
        font-size: 18px;
        font-family: 'MiSans-Medium';
        font-weight: 500;
        color: var(--color);
      }
      .rate-box {
        margin-left: 5px;
        display: flex;
        align-items: center;
        margin-bottom: 2px;
        &.down {
          .icon {
            background-image: url('./down.png');
          }
          .rate {
            color: #fc9463;
          }
        }
        .icon {
          width: 15px;
          height: 15px;
          background-image: url('./up.png');
        }
        .rate {
          font-size: 12px;
          font-family: MiSans-Medium;
          font-weight: bold;
          color: #5ffcbb;
        }
      }
    }
  }
}
</style>
