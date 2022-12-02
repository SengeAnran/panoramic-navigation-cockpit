import { getVoiceTxt } from '@/api/voice';

let mediaStreamValue, jsNode, mediaNode;
let leftDataList = [],
  rightDataList = [];

export function record() {
  leftDataList = [];
  rightDataList = [];
  mediaStreamValue = null;
  jsNode = null;
  mediaNode = null;
  window.navigator.mediaDevices
    .getUserMedia({
      // audio: true,
      audio: {
        sampleRate: 44100, // 采频率
        channelCount: 2, // 声道
        volume: 1.0, // 音量
      },
    })
    .then((mediaStrem) => {
      // 音频流的抽象
      beginRecord(mediaStrem);
    })
    .catch((err) => {
      // 如果用户电脑没有麦克风设备或者用户拒绝了，或者连接出问题了等
      // 这里都会抛异常，并且通过err.name可以知道是哪种类型的错误
      console.error(err);
    });
}

function beginRecord(mediaStrem) {
  mediaStreamValue = mediaStrem;
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  mediaNode = audioContext.createMediaStreamSource(mediaStrem); // 创建mediaNode
  // 这里connect之后就会自动播放了
  // mediaNode.connect(audioContext.destination); // connect到扬声器 边录边播
  // 可以在onaudioprocess回调里面获取到inputBuffer的数据，处理之后，然后放到outputBuffer
  // 创建一个jsNode
  jsNode = createJSNode(audioContext);
  // 需要连到扬声器消费掉outputBuffer，process回调才能触发
  // 并且由于不给outputBuffer设置内容，所以扬声器不会播放出声音
  jsNode.connect(audioContext.destination);
  jsNode.onaudioprocess = onAudioProcess;
  // 把mediaNode连接到jsNode
  mediaNode.connect(jsNode);
}

// 保存录音数据
function onAudioProcess(event) {
  const audioBuffer = event.inputBuffer;
  // 保存数据
  const leftChannelData = audioBuffer.getChannelData(0); // 左声道
  const rightChannelData = audioBuffer.getChannelData(1); // 右声道
  // 需要克隆一下 ??
  leftDataList.push(leftChannelData.slice(0));
  rightDataList.push(rightChannelData.slice(0));
}

// 创建javascriptProcessorNode 实例
function createJSNode(audioContext) {
  const BUFFER_SIZE = 4096; // 缓冲区大小，通常设定为4kB
  // 它里面有两个缓冲区，一个是输入inputBuffer，另一个是输出outputBuffer 它们是AudioBuffer实例
  const INPUT_CHANNEL_COUNT = 2; // 输入和输出频道数量,这里设定为双声道
  const OUTPUT_CHANNEL_COUNT = 2;
  // createJavaScriptNode已被废弃
  let creator = audioContext.createScriptProcessor || audioContext.createJavaScriptNode;
  creator = creator.bind(audioContext); // 改变函数this指向
  return creator(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT);
}

// 停止录音
export function stopRecord() {
  mediaStreamValue.getAudioTracks()[0].stop(); // 停止录音
  mediaNode.disconnect(); // 断开mediaNode连接
  jsNode.disconnect(); // 断开jsNode连接
  // 左右声道数据分别进行Float32Array数据拍平
  const leftData = mergeArray(leftDataList);
  const rightData = mergeArray(rightDataList);
  // 所有数据融合成一维数组
  const data = interleaveLeftAndRight(leftData, rightData);
  // 转换成能播放的 Wav 格式的 arrayBuffer 数据
  const arrayBuffer = createWavFile(data);
  return uploadFile(arrayBuffer);
}

// 合并数组
function mergeArray(list) {
  const length = list.length * list[0].length;
  const data = new Float32Array(length);
  let offset = 0;
  for (let i = 0; i < list.length; i++) {
    data.set(list[i], offset);
    offset += list[i].length;
  }
  return data;
}

// 交叉合并左右声道的数据
function interleaveLeftAndRight(left, right) {
  const totalLength = left.length + right.length;
  const data = new Float32Array(totalLength);
  for (let i = 0; i < left.length; i++) {
    const k = i * 2;
    data[k] = left[i];
    data[k + 1] = right[i];
  }
  return data;
}

// 创建一个wav文件，首先写入wav的头部信息，包括设置声道、采样率、位声等
function createWavFile(audioData) {
  const WAV_HEAD_SIZE = 44;
  // 创建一个长度audioData.length * 2 + WAV_HEAD_SIZE 的ArrayBuffer 数据；
  const buffer = new ArrayBuffer(audioData.length * 2 + WAV_HEAD_SIZE);
  //// 需要用一个view来操控buffer
  const view = new DataView(buffer);
  // 写入wav头部信息
  // RIFF chunk descriptor/identifier
  writeUTFBytes(view, 0, 'RIFF');
  // RIFF chunk length
  view.setUint32(4, 44 + audioData.length * 2, true);
  // RIFF type
  writeUTFBytes(view, 8, 'WAVE');
  // // format chunk identifier
  // // FMT sub-chunk
  writeUTFBytes(view, 12, 'fmt ');
  // format chunk length 格式化块长度
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // stereo (2 channels) // 声道
  view.setUint16(22, 2, true);
  // sample rate 频率
  view.setUint32(24, 44100, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, 44100 * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, 2 * 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data sub-chunk
  // data chunk identifier
  writeUTFBytes(view, 36, 'data');
  // data chunk length 数据块长度
  view.setUint32(40, audioData.length * 2, true);
  //写入录音数据
  const length = audioData.length;
  let index = 44;
  const volume = 1;
  for (let i = 0; i < length; i++) {
    view.setInt16(index, audioData[i] * (0x7fff * volume), true);
    index += 2;
  }
  return buffer;
}

function writeUTFBytes(view, offset, string) {
  const lng = string.length;
  for (let i = 0; i < lng; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

async function uploadFile(arrayBuffer) {
  const blob = new Blob([new Uint8Array(arrayBuffer)]);
  const formData = new FormData();
  formData.append('samples', blob);
  try {
    const res = await getVoiceTxt(formData);
    console.log(res);
    return res || [];
    // const res = ['语音识别', '测试', '这是'];
  } catch (err) {
    console.error('接口出错', err);
  }
}
// function playRecord(arrayBuffer) {
//   const blob = new Blob([new Uint8Array(arrayBuffer)]);
//   const blobUrl = URL.createObjectURL(blob);
//   document.querySelector('.audio-node').src = blobUrl;
// }

//
// function play(arrayBuffer) {
//   // 获取AudioContext类
//   // safari 需要使用webkit前缀
//   const AudioContext = window.AudioContext || window.webkitAudioContext;
//   const audioContext = new AudioContext();
//   // 创建audioBufferSourceNode对象
//   // 创建一个AudioBufferSourceNode对象，使用AudioContext的工厂函数创建
//   const audioNode = audioContext.createBufferSource();
//   // 将解码后数据放入buffer属性
//   // 解码音频，可以使用Promise，但是较老的Safari需要使用回调
//   audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {
//     // 音频时长duration:257.62258333333335， 声道数量 numberOfChannels和采样率 sampleRate
//     audioNode.buffer = audioBuffer;
//     audioNode.connect(audioContext.destination); // 连接播放器 audioContext.destination
//     // 从0s播放音乐
//     audioNode.start(0);
//   });
//   // console.log(audioBufferSourceNode);
// }
