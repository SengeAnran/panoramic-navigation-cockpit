const ModeCode = {
  //websocket消息类型
  MSG: 'message', // 普通消息
  HEART_BEAT: 'pong', // 心跳
};
/*
 *
 * @param url, 请求地址
 * @param callback  发送数据成功回调函数
 */
export function MyWebSocket(url, callback) {
  let wsUrl, socket;
  const secret = Math.floor(Math.random() * Math.pow(10, 12));
  if (url) {
    wsUrl = `${url}?secret=${secret}`;
  }
  const heartBeatConfig = {
    //time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时
    time: 3 * 1000,
    timeout: 5 * 1000,
    reconnect: 5 * 1000,
  };
  const isReconnect = true;
  // 第一次连接或者断开重连
  if (!socket) {
    //第一次执行，初始化
    connectWebSocket();
  }
  if (socket && socket.reconnectTimer) {
    //防止多个websocket同时执行
    clearTimeout(socket.reconnectTimer);
    socket.reconnectTimer = null;
    connectWebSocket();
  }
  function connectWebSocket() {
    socket = new NewWebSocket(wsUrl, heartBeatConfig, isReconnect);
    if (callback) {
      socket.registerCallBack(callback);
    }
  }
  return socket;
}

class NewWebSocket extends WebSocket {
  /*
   * 构造函数
   * @param url, 请求地址
   * @param heartBeatConfig  time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间间隔
   * @param isReconnect 是否断线重连
   */
  constructor(url, heartBeatConfig, isReconnect, protocols) {
    super(url, protocols);
    this.onopen = this.openHandler; //连接上时回调
    this.onclose = this.closeHandler; //断开连接时回调
    this.onmessage = this.messageHandler; //收到服务端消息
    this.onerror = this.errorHandler; //连接出错
    this.heartBeat = heartBeatConfig;
    this.isReconnect = isReconnect; // 是否断开重连
    this.reconnectTimer = null; //断线重连时间器
    this.callBackMapping = {}; //回调函数
    this.webSocketState = false; //socket状态 true为已连接
    return this;
  }

  openHandler() {
    this.webSocketState = true; //socket状态设置为连接，做为后面的断线重连的拦截器
    this.heartBeat && this.heartBeat.time ? this.startHeartBeat(this.heartBeat.time) : ''; //是否启动心跳机制
    console.log('开启');
  }

  messageHandler(e) {
    let data = this.getMsg(e);
    switch (data.data) {
      case ModeCode.MSG: //普通消息
        console.log('收到消息' + data.msg);
        if (this.callBackMapping) {
          this.callBackMapping(data);
        }
        break;
      case ModeCode.HEART_BEAT: //心跳
        this.webSocketState = true;
        console.log('收到心跳响应' + data.msg);
        break;
      default:
        console.log('收到消息' + data);
        if (this.callBackMapping) {
          this.callBackMapping(data);
        }
        break;
    }
  }

  closeHandler() {
    //socket关闭
    this.webSocketState = false; //socket状态设置为断线
    console.log('关闭');
  }

  errorHandler() {
    //socket出错
    this.webSocketState = false; //socket状态设置为断线
    this.reconnectWebSocket(); //重连
    console.log('出错');
  }
  // 注册回调函数
  registerCallBack(callBack) {
    this.callBackMapping = callBack;
  }
  // 解除回调函数
  unRegisterCallBack() {
    this.callBackMapping = null;
  }

  sendMsg(obj) {
    console.log(this.readyState);
    this.send(JSON.stringify(obj));
    // if (this.readyState === 2) {
    //   this.send(JSON.stringify(obj));
    // }
  }

  getMsg(e) {
    return JSON.parse(e.data);
  }

  /*
   * 心跳初始函数
   * @param time：心跳时间间隔
   */
  startHeartBeat(time) {
    setTimeout(() => {
      const data = {
        type: 'ping',
        content: {},
      };
      this.sendMsg(data);
      this.waitingServer();
    }, time);
  }

  //延时等待服务端响应，通过webSocketState判断是否连线成功
  waitingServer() {
    this.webSocketState = false;
    setTimeout(() => {
      if (this.webSocketState) {
        this.startHeartBeat(this.heartBeat.time);
        return;
      }
      console.log('心跳无响应，已断线');
      try {
        this.close();
      } catch (e) {
        console.log('连接已关闭，无需关闭');
      }
      this.reconnectWebSocket();
    }, this.heartBeat.timeout);
  }

  //重连操作
  reconnectWebSocket() {
    if (!this.isReconnect) {
      return;
    }
    this.reconnectTimer = setTimeout(() => {}, this.heartBeat.reconnect);
  }
}
