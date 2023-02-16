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
const res = [];
async function tree(code, arr, level = 0) {
  const parent = await readArea(code);
  const properties = parent[0].properties;
  // properties.level = level;
  // console.log(properties.name);
  arr.push(properties);
  const features = await readArea(code, true);
  if (!features.length) {
    return;
  }
  properties.children = [];
  for (const feature of features) {
    const adcode = feature.properties.adcode;
    await tree(adcode, properties.children, level + 1).catch(() => {
      console.log(adcode);
    });
  }
}
tree(100000, res).then(() => {
  fs.writeFile(path.resolve(__dirname, 'tree.json'), JSON.stringify(res));
});
