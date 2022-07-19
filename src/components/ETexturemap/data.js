/**
 * @desc 地图共用基础配置
 */
export const MAP_DEFAULT_SETTING = {
  map: 'zjGeo',
  aspectScale: 1,
  layoutCenter: ['50%', '50%'], //地图位置
  layoutSize: '105%',
};

/**
 * @desc 地图区域名称style
 */

export const MAP_DEFAULT_LABEL = {
  emphasis: {
    show: true,
  },
  normal: {
    show: true,
    fontSize: 16,
    textStyle: {
      color: '#F5FBFF',
      fontSize: '12px',
      fontFamily: 'Microsoft YaHei',
    },
    offset: [10, 40],
    formatter: (params) => {
      const name = (params.data && params.data.name) || '';
      return '{lPadding|}{dIcon|}{bValue|' + name + '}';
    },
    backgroundColor: '#001E41dd', //标签背景颜色
    borderRadius: 2, //外层边框圆角
    rich: {
      lPadding: {
        width: 7,
      },
      dIcon: {
        width: 7,
        height: 10,
        align: 'left',
        backgroundColor: {
          image: require('./imgs/locate-icon.png'),
        },
      },
      bValue: {
        color: '#F5FBFF',
        height: 20,
        padding: [0, 10, 0, 5],
        align: 'right',
        fontSize: 12,
      },
    },
  },
};

export const SCATTER_STYLE = {
  symbol: 'circle',
  symbolSize: 43,
  itemStyle: {
    color: 'transparent',
  },
  label: {
    emphasis: {
      show: true,
    },
    normal: {
      show: true,
      textStyle: {
        color: '#FAE570',
        fontSize: '24px',
        fontFamily: 'DINPro',
      },
      width: 58,
      height: 58,
      backgroundColor: {
        image: require('./imgs/bubble.png'),
      },
      formatter(value) {
        return value.data.value[2];
      },
    },
  },
};

export const TOOLTIP_STYLE = {
  show: true,
  trigger: 'item',
  triggerOn: 'click',
  padding: 0,
  enterable: true,
  transitionDuration: 1,
  borderWidth: 0,
  backgroundColor: 'rgba(1,18,48,0.8)',
  textStyle: {
    color: '#000',
    decoration: 'none',
  },

  formatter: function (params) {
    console.log(params);
    const { data } = params;
    const fontStyle = 'font-size: 14px;color:#FEFFFE;margin:0;';
    const hzData = `<p style="padding: 0px 10px;${fontStyle}">第一批未来乡村 28个</p>
    <p style="padding: 0px 10px 5px 10px;${fontStyle}">投资完成率 78%</p>
    <p style="padding: 0px 10px;${fontStyle}">第二批未来乡村 11个</p>
    <p style="padding: 0px 10px 5px 10px;${fontStyle}">投资完成率 78%</p>`;
    const elseData = ` <p style="padding: 5px 10px 10px;${fontStyle}">暂无数据</p>`;

    const tipHtml = `
    <div style="width: 280px; border: 1px solid #99B8FC;">
      <div style="padding: 10px;${fontStyle} border-bottom: 1px solid #99B8FC;margin-bottom:8px;">${data.name}</div>
      ${data.name === '杭州市' ? hzData : elseData}
    </div>`;
    return tipHtml;
  },
};

/**
 * @desc 地图背景共用配置
 */
export function getMapSetting(areaColor, emphasisAreaColor, config) {
  const defaultAreaColor = '#00153655';
  const borderColor = (config && config.borderColor) || '#D2EDFE88';
  return {
    ...MAP_DEFAULT_SETTING,
    itemStyle: {
      normal: {
        areaColor: areaColor || defaultAreaColor,
        borderColor: borderColor,
        borderWidth: 1.5,
      },
      emphasis: {
        areaColor: emphasisAreaColor || areaColor || defaultAreaColor,
      },
    },
    select: {
      label: {
        show: false,
      },
      itemStyle: {
        areaColor: emphasisAreaColor || areaColor || defaultAreaColor,
      },
    },
  };
}

// 地图数据
export function getData() {
  return [
    { name: '杭州市', value: [119.476498, 29.898918, 39] },
    { name: '宁波市', value: [121.479174, 29.733017, 31] },
    { name: '温州市', value: [120.463912, 27.894726, 27] },
    { name: '嘉兴市', value: [120.783487, 30.620063, 10] },
    { name: '湖州市', value: [119.873663, 30.743058, 13] },
    { name: '绍兴市', value: [120.640933, 29.732893, 21] },
    { name: '金华市', value: [119.957007, 29.115117, 18] },
    { name: '衢州市', value: [118.679569, 28.932446, 15] },
    { name: '舟山市', value: [122.146805, 30.056563, 10] },
    { name: '台州市', value: [121.136679, 28.757098, 20] },
    { name: '丽水市', value: [119.517145, 28.197644, 30] },
  ];
}

export function drawImg(dom, imgUrl) {
  const c = dom;
  const ctx = c.getContext('2d');
  const img = document.createElement('img');
  img.src = imgUrl;
  return new Promise((resolve) => {
    img.onload = function () {
      ctx.drawImage(this, 0, 0, 560, 630);
      resolve(true);
    };
  });
}
