export const xAxisStyle = {
  type: 'category',
  axisLine: {
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.4)',
    },
  },
  splitLine: {
    show: false,
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.15)',
    },
  },
  axisTick: {
    show: false,
  },
  splitArea: {
    show: false,
  },
  axisLabel: {
    interval: 0,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'MiSans-Normal',
  },
};

export const yAxisStyle = {
  type: 'value',
  axisLine: {
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.4)',
    },
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.1)',
    },
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    interval: 0,
    color: '#fff',
    fontSize: 12,
    fontFamily: 'MiSans-Normal',
  },
  splitArea: {
    show: false,
  },
};

export const tooltipStyle = {
  trigger: 'axis',
  backgroundColor: 'rgba(31, 46, 59, 0.6)',
  borderColor: 'rgba(87, 134, 173, 1)',
  axisPointer: {
    type: 'shadow',
  },
  textStyle: {
    fontSize: 12,
    color: '#fff',
  },
};
