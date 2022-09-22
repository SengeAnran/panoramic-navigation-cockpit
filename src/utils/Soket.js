import EventEmitter from 'eventemitter3';

export default class Socket extends EventEmitter {
  /**
   * @param {String} url
   * @param {String} protocol
   */
  constructor(url, protocol) {
    super();
    this.url = url; // 请求接口地址
    this.protocol = protocol; // 协议
    this.socket = null; // socket对象
    this.initSocket(); // 初始化socket
    this.reconnetNum = 0;
    this.initProtectEvent();
  }

  get readyState() {
    return this.socket?.readyState;
  }

  initSocket = () => {
    try {
      // 初始化socket资源
      this.destroySocket();
    } catch (e) {
      console.log(e);
    }
    const secret = Math.floor(Math.random() * Math.pow(10, 12));
    const wsUrl = `${this.url}?secret=${secret}`;
    this.socket = new WebSocket(wsUrl, this.protocol); // 建立连接
    const socket = this.socket;
    socket.onopen = () => {
      // 建立好连接时
      this.on('socket-broadcast', (data) => {
        // 发送消息给后端
        socket.send(JSON.stringify(data));
      });
      this.emit('connected'); // 向上传连通消息
      this.checkHeartBeat(); // 发起心跳
    };
    socket.onmessage = (ev) => {
      // eslint-disable-next-line
      // console.log('socket message', ev.data);
      try {
        const payload = JSON.parse(ev.data).data;
        if (payload === 'pong') {
          // 接收到心跳消息
          clearTimeout(this.closeSocketTimeout);
          this.reconnetNum = 0; // 重连次数累计清零
          this.closeSocketTimeout = null; // 关闭socket关闭时间器
          return;
        }
        const data = payload; // 接收到普通消息
        this.emit(data.type, data.content);
      } catch (err) {
        console.log(err);
      }
    };
    socket.onclose = (ev) => {
      // 关闭连接时
      // eslint-disable-next-line
      console.log('reconnection socket for close', ev);
      this.initSocket();
    };
    socket.onerror = (ev) => {
      // 连接出错时
      // eslint-disable-next-line
      console.log('reconnection socket for error', ev);
      this.initSocket();
    };
  };

  destroySocket = () => {
    // socket存在时回收资源
    if (!this.socket) {
      return;
    }
    this.socket.onmessage = null;
    this.socket.onclose = null;
    this.socket.onerror = null;
    clearTimeout(this.heartBeatTimeout);
    clearTimeout(this.closeSocketTimeout);
    this.socket.close();
    this.socket = null;
    this.heartBeatTimeout = null;
    this.closeSocketTimeout = null;
    this.removeAllListeners('socket-broadcast');
  };

  initProtectEvent() {
    window.addEventListener('online', () => {
      // 网络连接时
      console.error('online'); // eslint-disable-line
      this.checkHeartBeat();
    });
    // window.addEventListener('focus', (ev) => {
    //   console.warn('focus'); // eslint-disable-line
    //   this.checkHeartBeat();
    // });
  }

  checkHeartBeat() {
    if (this.heartBeatTimeout) {
      // 有现有心跳清空心跳
      clearTimeout(this.heartBeatTimeout);
    }
    if (this.closeSocketTimeout) {
      // 在要关闭socket的时限内不发心跳
      return;
    }

    const socket = this.socket;
    socket.send(JSON.stringify({ type: 'ping' })); // 发送心跳
    // 1000ms内没有返回，关闭socked后重新连接
    this.closeSocketTimeout = setTimeout(() => {
      // eslint-disable-next-line
      console.log('10s内没有返回，关闭socked后重新连接');
      if (this.reconnetNum < 4) {
        //重连次数限制4次
        this.reconnetNum++;
        this.initSocket();
      }
    }, 10000);
    this.heartBeatTimeout = setTimeout(() => {
      // 在连接正常的情况下没隔10s发送一次心挑
      this.checkHeartBeat();
    }, 10000);
  }
}
