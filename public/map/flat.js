const fs = require('fs/promises');
const path = require('path');

const dir = path.resolve(__dirname, 'geojson');

async function readArea(code, full) {
  try {
    const data = await fs.readFile(path.resolve(dir, `${code}${full ? '_full' : ''}.json`), 'utf-8');
    return JSON.parse(data).features;
  } catch (e) {
    return [];
  }
}
const res = {};
async function flat(code, level = 0) {
  const parent = await readArea(code);
  const properties = parent[0].properties;
  // console.log(properties.name);
  // properties.level = level;
  res[properties.adcode] = properties;
  const features = await readArea(code, true);
  if (!features.length) {
    return;
  }
  for (const feature of features) {
    const adcode = feature.properties.adcode;
    await flat(adcode, level + 1).catch(() => {
      console.log(adcode);
    });
  }
}
flat(100000).then(() => {
  // console.log(res);
  fs.writeFile(path.resolve(__dirname, 'flat.json'), JSON.stringify(res));
});
