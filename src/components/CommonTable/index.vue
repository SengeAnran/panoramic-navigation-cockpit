<!-- CommonTable -->
<template>
  <div class="CommonTable-root" :class="{ panel: hasPanel }">
    <el-table
      ref="commonTable"
      :data="dataSource"
      tooltip-effect="dark"
      :height="height"
      :max-height="maxHeight"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="(sortProp) => $emit('sort-change', sortProp)"
    >
      <el-table-column type="selection" width="50" v-if="hasSelection" />
      <el-table-column label="序号" type="index" :width="indexWidth" :index="indexMethod" v-if="hasIndex" />
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="column.scopedSlots"
          :key="index"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
        >
          <template v-slot="scope">
            <slot :scope="scope" :name="column.scopedSlots"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index + 'key'"
          :prop="column.dataIndex"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :show-overflow-tooltip="column.showOverflowTooltip || false"
          :sortable="column.sortable"
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-bind="page"
      v-model:current-page="page.currentPage"
      class="self-pagination"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
/**
 * 表格组件 CommonTable 用法同element-plus中的Table
 * hasPanel 是否是面板表格样式
 * height 高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
 * columns 列配置
 * dataSource 显示的数据
 * hasIndex 是否显示序号
 * indexWidth 序号宽度
 * hasSelection 是否选择
 * selectedList 选中的列表
 * pagination 分页配置，不传时不显示分页
 */
const props = defineProps({
  hasPanel: { type: Boolean, default: false },
  height: { type: [String, Number] },
  maxHeight: { type: [String, Number] },
  columns: { type: Array, default: () => [] },
  dataSource: { type: Array, default: () => [] },
  hasIndex: { type: Boolean, default: false },
  indexWidth: { type: String, default: '55' },
  hasSelection: { type: Boolean, default: false },
  selectedList: { type: Array, default: () => [] },
  pagination: { type: [Object, Boolean] },
});

const emits = defineEmits(['changePage', 'update:selectedList', 'sort-change']);

const defaultPagination = ref({
  small: false,
  layout: 'prev, pager, next',
  total: 0,
  pageSize: 10,
  pageSizes: [10, 50, 100],
  currentPage: 1,
  pagerCount: 21,
  hideOnSinglePage: false,
});

const commonTable = ref(null);

const page = computed(() => {
  return {
    ...defaultPagination.value,
    ...props.pagination,
  };
});

watch(
  () => props.selectedList,
  (list) => {
    if (props.hasSelection && list && !list.length) {
      commonTable.value.clearSelection();
    }
  },
);

function indexMethod(index) {
  return page.value.pageSize * (page.value.currentPage - 1) + index + 1;
}

function handleSizeChange(val) {
  emits('changePage', { ...page.value, pageSize: val });
}

function handleCurrentChange(val) {
  emits('changePage', { ...page.value, currentPage: val });
}

function handleSelectionChange(val) {
  emits('update:selectedList', val);
}
</script>

<style lang="scss">
.CommonTable-root {
  position: relative;
  &.panel {
    .el-table__header-wrapper {
      thead {
        color: #7ba4a9;
      }
      th.el-table__cell {
        border: none !important;
        font-family: 'SourceHanSansCN-Normal';
        background: rgba(48, 66, 85, 0.55);
      }
    }
    .el-table__body {
      tr:nth-of-type(2n + 1) td {
        background-color: rgba(23, 32, 42, 0.549);
      }
      tr:nth-of-type(2n) td {
        background-color: rgba(45, 60, 70, 0.549);
      }
      td.el-table__cell {
        font-size: 14px;
      }
    }
  }
  .el-table tr,
  .el-table {
    background-color: transparent;
  }
  .el-table__inner-wrapper::before {
    content: none;
  }
  .el-table__header-wrapper {
    thead {
      font-size: 15px;
      color: rgb(255, 255, 255);
    }
    th.el-table__cell {
      border: 1px solid var(--tableHeaderBorder);
      background-color: var(--tableHeaderBackground);
      border-left: none;
      border-right: none;
      padding: 10px 0;
      &:first-child {
        border-left: 1px solid var(--tableHeaderBorder);
      }
      &:last-child {
        border-right: 1px solid var(--tableHeaderBorder);
      }
    }
  }
  .el-table__body {
    font-size: 15px;
    color: #fff;
    font-family: 'SourceHanSansCN-Normal';
    tr:nth-of-type(2n + 1) td {
      background-color: var(--tableTdBackground);
    }
    tr:hover td {
      background-color: var(--tableTdHoverBackground) !important;
    }
    td.el-table__cell {
      border-bottom: none;
    }
  }
  .el-table__border-bottom-patch {
    height: 0;
  }
}
</style>
