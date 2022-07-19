<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';

/**
 * IntervalEvent 定时器组件
 * interval 定时器间隔时间，单位s
 */
export default {
  name: 'IntervalEvent',
  props: {
    interval: { default: 0, type: Number },
  },
  emits: ['interval'],
  setup(props, { emit }) {
    const store = useStore();
    const intervalState = computed(() => store.state.interval);
    const interval = computed(() => props.interval);

    watchEffect(() => {
      if (interval.value) {
        if (!(intervalState.value % interval.value)) {
          emit('interval');
        }
      }
    });
  },
  render() {
    return null;
  },
};
</script>
