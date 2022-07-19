function random(x, y) {
  let min = x,
    max = y;
  if (x > y) {
    min = y;
    max = x;
  }
  const delta = max - min;
  return min + Math.random() * delta;
}

const name = ['王达康', '李守才', '王力', '朱云', '戴晓', '王兵', '郑天天', '刘璋', '诸葛李', '何文章', '范晓晓'];
const name2 = ['党支部'];
export function getPoints(length = 10) {
  const res = { code: 0, msg: '成功', success: true, data: [] };
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * name.length);
    const randomIndex1 = Math.floor(Math.random() * name.length);
    const randomIndex2 = Math.floor(Math.random() * name.length);
    const randomIndex3 = Math.floor(Math.random() * name.length);
    const randomIndex4 = Math.floor(Math.random() * name2.length);
    const total = Math.floor(Math.random() * 200) + 20;
    const manNum = Math.floor(total * Math.random());
    const womanNum = Math.floor(total - manNum);
    const more35 = Math.floor(total * Math.random());
    const under35 = Math.floor(total - more35);
    const highlyEducatedNum = Math.floor(total * Math.random());
    const lowEducatedNum = Math.floor(total - highlyEducatedNum);
    const item = {
      lng: random(119.92197228014983, 119.92619123439258),
      lat: random(30.574378980109632, 30.5762117700582),
      partyMemberType: '在职党员',
      partyMemberName: name[randomIndex],
      partyMemberPhone: '150****5295',
      organizationName: name2[randomIndex4],
      partyNum: total,
      sexProportion: {
        manNum,
        womanNum,
      },
      ageProportion: {
        more35,
        under35,
      },
      degreeProportion: {
        highlyEducatedNum,
        lowEducatedNum,
      },
      farmers: [
        {
          lng: random(119.92197228014983, 119.92619123439258),
          lat: random(30.574378980109632, 30.5762117700582),
          farmersUserphone: '151****5294',
          farmersName: name[randomIndex1],
        },
        {
          lng: random(119.92197228014983, 119.92619123439258),
          lat: random(30.574378980109632, 30.5762117700582),
          farmersUserphone: '152****5292',
          farmersName: name[randomIndex2],
        },
        {
          lng: random(119.92197228014983, 119.92619123439258),
          lat: random(30.574378980109632, 30.5762117700582),
          farmersUserphone: '159****5222',
          farmersName: name[randomIndex3],
        },
      ],
      key1: 'value1',
      key2: 'value2',
    };
    res.data.push(item);
  }
  return new Promise((resolve) => {
    resolve(res);
  });
}
