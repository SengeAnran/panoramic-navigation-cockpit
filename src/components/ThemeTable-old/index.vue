<template>
  <div class="table-info">
    <CommonTable v-bind="$attrs">
      <!--      动态插槽-->
      <template v-for="(item, index) in slotArr" :key="index" v-slot:[item]="{ scope }">
        <slot :scope="scope" :name="item" />
      </template>
    </CommonTable>
  </div>
</template>
<script setup>
import { useAttrs, ref, watchEffect } from 'vue';
const attrs = useAttrs();
const slotArr = ref([]);
function computedAttrs() {
  attrs.columns.forEach((item) => {
    if (item.scopedSlots) {
      slotArr.value.push(item.scopedSlots);
    }
    if (item.children && item.children.length > 0) {
      item.children.forEach((item) => {
        if (item.scopedSlots) {
          slotArr.value.push(item.scopedSlots);
        }
        if (item.children && item.children.length > 0) {
          item.children.forEach((item) => {
            if (item.scopedSlots) {
              slotArr.value.push(item.scopedSlots);
            }
          });
        }
      });
    }
  });
}
watchEffect(computedAttrs);
</script>

<style lang="scss" scoped>
$pageSizeInactive: rgba(255, 255, 255, 0.5);
$pageSizeActive: #ffffff;
$pageSizeBg: #04325e;
.table-info {
  :deep {
    /* 覆盖表格样式 */
    .el-table__header-wrapper {
      thead {
        font-size: 14px !important;
      }
      border: 1px solid #16678d;
      background: linear-gradient(90deg, transparent 0%, rgb(0, 50, 94, 0.92) 50%, transparent);
      margin-bottom: 0;
    }
    .el-table__body-wrapper {
      .el-table__body {
        font-size: 14px;
        tr {
          // background-color: #00325e;
          background-color: rgb(0, 50, 94, 0.15);
          td.el-table-fixed-column--right {
            background: linear-gradient(90deg, rgb(24, 49, 79, 0.3) 0%, rgb(24, 49, 79, 1) 20%) !important;
          }
        }
        tr:last-child {
          td {
            border-bottom: 1px rgb(89, 154, 254, 20%) solid;
          }
        }
        tr:nth-of-type(2n + 1) {
          background: linear-gradient(90deg, rgb(0, 50, 94, 0.3) 0%, rgb(0, 50, 94, 0.92) 50%, rgb(0, 50, 94, 0.3));
          td {
            border-top: 1px solid rgb(22, 103, 141, 0.5);
            border-bottom: 1px solid rgb(22, 103, 141, 0.5);

            &.el-table-fixed-column--right {
              background: linear-gradient(90deg, rgb(0, 50, 94, 0.3) 0%, rgb(21, 49, 80, 1) 20%) !important;
            }
          }
        }
      }
    }
    .el-table thead.is-group th.el-table__cell {
      background: none;
      &.el-table-fixed-column--right {
        background: linear-gradient(90deg, rgb(0, 50, 94, 0.3) 0%, rgb(21, 49, 80, 1) 20%) !important;
      }
    }
    .el-table {
      --el-table-border-color: none;
      --el-table-expanded-cell-bg-color: none;
    }
    /* 覆盖分页样式 */
    .self-pagination {
      text-align: center;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      margin-right: 30px;
      .btn-next,
      .btn-prev {
        background-color: $pageSizeBg !important;
        min-width: auto !important;
        width: 32px !important;
        height: 32px !important;
        .el-icon {
          display: block !important;
          font-size: 18px;
          color: #fff;
        }
        &.btn-next {
          transform: rotate(0deg);
        }
        &:disabled {
          color: $pageSizeActive;
          opacity: 0.2;
        }
      }
      .el-pager li:not(.more) {
        border-radius: 4px !important;
        background-color: $pageSizeBg !important;
        width: 32px !important;
        height: 32px !important;
        min-width: auto !important;
        margin-top: 1px !important;
        color: $pageSizeInactive !important;
        opacity: 0.2 !important;
        &:not(.disabled).active {
          color: $pageSizeActive !important;
          background-color: $pageSizeBg !important;
          opacity: 1 !important;
        }
        &:not(.disabled).is-active {
          color: $pageSizeActive !important;
          background-color: $pageSizeBg !important;
          opacity: 1 !important;
        }
        &:hover {
          color: $pageSizeActive !important;
          opacity: 1 !important;
        }
      }
      .el-pager li.more {
        background-color: $pageSizeBg !important;
        color: $pageSizeActive !important;
        height: 11px !important;
        margin-top: 1px !important;
        opacity: 0.2 !important;
        &:hover {
          opacity: 1 !important;
          color: $pageSizeActive !important;
        }
      }
      .btn-next,
      .btn-prev,
      .el-pager li {
        margin-left: 5px !important;
        margin-right: 5px !important;
      }
    }
  }
}
</style>
