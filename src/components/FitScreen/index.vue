<script>
import { onBeforeUnmount, onMounted } from 'vue';
import { equalRatioFull, centerFull, none } from './resize';

const displayMap = {
  centerFull,
  equalRatioFull,
  none,
};

export default {
  name: 'FitScreen',
  props: {
    displayType: {
      validator: function (value) {
        return Object.keys(displayMap).indexOf(value) !== -1;
      },
      default: 'centerFull',
    },
    pageSize: {
      type: Object,
      default: () => ({ width: 1920, height: 1080 }),
    },
  },
  setup(props) {
    function fitScreen() {
      displayMap[props.displayType](props.pageSize);
    }
    onMounted(() => {
      fitScreen();
      window.addEventListener('resize', fitScreen);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', fitScreen);
    });
  },
  render() {
    return null;
  },
};
</script>
<style lang="scss">
body {
  transform-origin: top left;
}
</style>
