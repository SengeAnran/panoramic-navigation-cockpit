const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const dir = path.resolve(__dirname, 'geojson');
fs.removeSync(dir);
fs.mkdirSync(dir);

const china = [
  // {
  //   name: '中国',
  //   code: '100000',
  // },
];
async function getArea(code, arr) {
  const parent = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`);
  const properties = parent.data.features[0].properties;
  // console.log(properties.name);
  fs.writeFileSync(path.resolve(dir, `${code}.json`), JSON.stringify(parent.data));
  arr.push(properties);
  const full = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`);
  fs.writeFileSync(path.resolve(dir, `${code}_full.json`), JSON.stringify(full.data));
  arr.children = [];
  const features = full.data.features;
  for (const feature of features) {
    const adcode = feature.properties.adcode;
    await getArea(adcode, arr.children).catch(() => {
      console.log(adcode);
    });
  }
  console.log(arr);

}

getArea(100000, china);
