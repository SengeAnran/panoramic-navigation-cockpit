import Recorder from 'js-audio-recorder';
import { getVoiceTxt } from '../../api/voice';
let recorder;
export function starRecord() {
  recorder = new Recorder({
    sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1, // 声道，支持 1 或 2， 默认是1
  });
  recorder.start();
  // // 回调持续输出时长
  // recorder.onprocess = function (params) {
  //   console.log(params);
  // };
}
export async function endRecord() {
  // const duration = recorder.duration; // 获取录音的总时长。
  // const fileSize = recorder.fileSize; // 录音文件大小（单位：字节）
  recorder.stop();
  const res = await uploadFile(recorder.getWAVBlob());
  recorder = null;
  return res;
  // recorder.downloadWAV("新录音");
}
async function uploadFile(blob) {
  const formData = new FormData();
  formData.append('samples', blob);
  try {
    const res = await getVoiceTxt(formData);
    return res || [];
    // const res = ['语音识别', '测试', '这是'];
  } catch (err) {
    console.error('接口出错', err);
  }
}
