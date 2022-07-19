<template>
  <h3 class="title"><slot /></h3>
</template>
<style lang="scss" scoped>
.title {
  font-size: 15px;
  text-align: center;
  font-family: Source Han Serif CN;
  font-weight: bold;
  margin: 30px 0 12px 0;
  background: linear-gradient(0deg, #74faab 27.9541015625%, #b6fef5 79.2236328125%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
