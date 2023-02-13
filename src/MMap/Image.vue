<script>
import { inject, onUnmounted, onMounted, watch } from 'vue';
const defaultImage = { width: 1, height: 1, data: new Uint8Array([0, 0, 0, 0]) };

export default {
  props: {
    id: String,
    src: String,
  },
  setup(props) {
    const mapPromise = inject('mapPromise');
    function addImage(map, image) {
      if (image) {
        return map.addImage(props.id, image);
      }
      debugger;
      image = new Image();
      image.src = props.src;
      image.onload = () => {
        map.addImage(props.id, image);
      };
    }
    function removeImage(map) {
      if (map.hasImage(props.id)) {
        map.removeImage(props.id);
      }
    }
    async function updateImage() {
      const map = await mapPromise;
      removeImage(map);
      addImage(map);
    }
    watch(() => props.src, updateImage);

    onMounted(async () => {
      const map = await mapPromise;
      addImage(map, defaultImage);
      updateImage();
    });
    onUnmounted(async () => {
      const map = await mapPromise;
      removeImage(map);
    });
    return () => <Empty />;
  },
};
</script>
