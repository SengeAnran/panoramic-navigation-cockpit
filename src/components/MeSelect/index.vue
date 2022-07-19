<!-- MeSelect -->
<template>
  <div class="MeSelect-root" v-if="visible" ref="selectRef">
    <div
      class="select-item"
      v-for="item in options"
      :class="{ active: item.key === activeKey }"
      @click="handleSetActive(item)"
      :key="item.key"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
/**
 * MeSelect 下拉选择-选项组件，不包含选中，父级需要position为[relative|absolute]
 * visible 控制组件是否显示，通过 v-model:visible 指定时，可以点击空白区域关闭组件
 * options 组件选项数据 [{name: '', key: ''},...]
 * modelValue 选中的key，通过 v-model 指定，可双向绑定
 * actvieOption 选中的item，通过 v-model:actvieOption 指定，可双向绑定
 * 注意：modelValue 和 actvieOption 至少指定一个，不然组件没有选中效果，但是可以通过change事件获得被点击的选项
 * @change 事件，在选项点击时触发
 */
const props = defineProps({
  visible: { type: Boolean, required: true },
  options: { type: Array, required: true },
  modelValue: { type: [Number, String] },
  actvieOption: { type: Object },
});

const selectRef = ref(null);
const activeKey = computed(() => props.modelValue || (props.actvieOption && props.actvieOption.key));
const emit = defineEmits(['update:visible', 'update:modelValue', 'update:actvieOption', 'change']);

function handleSetActive(item) {
  emit('update:visible', false);
  emit('update:modelValue', item.key);
  emit('update:actvieOption', item);
  emit('change', item);
}
function closeSelectEle(ev) {
  if (selectRef.value && selectRef.value.parentNode && !selectRef.value.parentNode.contains(ev.target)) {
    emit('update:visible', false);
  }
}
onMounted(() => {
  window.addEventListener('click', closeSelectEle);
});
onBeforeUnmount(() => {
  window.removeEventListener('click', closeSelectEle);
});
</script>

<style lang="scss" scoped>
.MeSelect-root {
  position: absolute;
  top: calc(100% + 10px);
  padding: 5px 0;
  border: 1px solid var(--popupBorder);
  background-color: rgba(22, 33, 45, 0.75);
  z-index: 99999;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;

  .select-item {
    white-space: nowrap;
    font-size: 14px;
    padding: 4px 10px;
    cursor: pointer;
    &.active {
      background-color: var(--popupBorder);
    }
    &:hover {
      background-color: var(--popupBorder);
    }
  }
}
</style>
