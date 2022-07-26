<template>
  <div class="left-content">
    <div class="title">
      <h3 class="theme-font-style">业务导览</h3>
      <div class="eglish-name">Business Guide</div>
      <div class="list-btn">
        <div class="icon"></div>
      </div>
    </div>
    <div class="list">
      <div class="list-item">
        <img src="" alt="" />
        <div class="name">
          <div class="name-text"></div>
          <div class="name-eglish"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style lang="scss" scoped>
.left-content {
  z-index: 10;
  background: url('./img/bg_img_left.png') no-repeat;
  position: absolute;
  left: 280px;
  width: 640px;
  height: 100%;
  .title {
    position: absolute;
    left: 145px;
    top: 97px;
    h3 {
      font-size: 50px;
      margin: 0;
      padding: 0;
    }
    .eglish-name {
      font-size: 15px;
      font-family: DIN-BlackItalic;
      font-weight: 400;
      color: #7684be;
    }
    .list-btn {
      cursor: pointer;
      position: absolute;
      left: 205px;
      top: 20px;
      width: 24px;
      height: 24px;
      border: 1px solid #78abdb;
      border-radius: 4px;
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-top: 8px solid white;
        border-left: 6.5px solid rgba(255, 255, 255, 0);
        border-right: 6.5px solid rgba(255, 255, 255, 0);
      }
    }
  }
  .list {
    position: absolute;
    top: 250px;
    .list-item {
      display: flex;
    }
  }
}
</style>
