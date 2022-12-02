<template>
  <h3>录音</h3>
  <button @click="record">开始录音</button>
  <button @click="stopRecord">停止录音</button>
  <audio class="audio-node" autoplay></audio>
</template>

<script setup>
import { record, stopRecord } from './record';
</script>

<style scoped></style>
