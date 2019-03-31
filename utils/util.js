/**
 *
 * @param data 元数据 required
 * @returns {Array} 返回映射表,所有方法都需要
 */
export const dataMap = (data) => {
  const arr = [];
  if (data.length) {
    data.map(item => {
      const parentKey = item.id; // 最外层ID
      arr.push({ parentKey, id: parentKey }); // 自己
      const loop = v => {
        v.map(j => {
          arr.push({ parentKey, id: j.id });
          if (j.children) {
            loop(j.children);
          }
        });
      };
      if (item.children) {
        loop(item.children);
      }
    });
  }
  return arr;
};

/**
 * 删除方式为引用删除
 * @param data 元数据 required
 * @param map 映射表 required
 * @param record 选中行 required
 * @returns null 无返回,以删除元数据引用,操作成功后,data保存,record选中行数据清除
 */
export const deleted = (data, map, record) => {
  let _key;
  let _id;
  for (let i = 0; i < map.length; i++) {
    if (map[i].id === record.id) {
      _key = map[i].parentKey;
      _id = map[i].id;
      if (_key === _id) { // 删除最外层
        const _delIndex = data.findIndex((value) => {
          return value.id === _key;
        });
        if (_delIndex >= 0) {
          data.splice(_delIndex, 1);
          break;
        }

      } else {
        for (let j = 0; j < data.length; j++) {
          if (data[j].id === _key) {
            const jChildren = data[j].children;
            const loop = value => {
              for (let k = 0; k < value.length; k++) {
                if (value[k].id === _id) {
                  value.splice(k, 1);
                  break;
                }

                if (value[k].children) {
                  loop(value[k].children);
                }
              }
            };

            jChildren && loop(jChildren);
          }
        }
      }
      break;
    }
  }
};

/**
 * 删除方式为引用删除(批量删除) 待完善
 * @param data 元数据 required
 * @param map 映射表 required
 * @param record 选中行 required
 * @returns tOrf 是否为批量删除
 */
// export const deletedBatch = (data, map, record) => {
//   let _key;
//   let _id;
//   for (let a = 0; a < record.length; a++) {
//     for (let i = 0; i < map.length; i++) {
//       if (map[i].id === record[a].id) {
//         _key = map[i].parentKey;
//         _id = map[i].id;
//         if (_key === _id) { // 删除最外层
//           const _delIndex = data.findIndex((value) => {
//             return value.id === _key;
//           });
//           if (_delIndex >= 0) {
//             data = data.splice(_delIndex, 1);
//             break;
//           }

//         } else {
//           for (let j = 0; j < data.length; j++) {
//             if (data[j].id === _key) {
//               const jChildren = data[j].children;
//               const loop = value => {
//                 for (let k = 0; k < value.length; k++) {
//                   if (value[k].id === _id) {
//                     value.splice(k, 1);
//                     break;
//                   }

//                   if (value[k].children) {
//                     loop(value[k].children);
//                   }
//                 }
//               };

//               jChildren && loop(jChildren);
//             }
//           }
//           data = data
//         }
//         break;
//       }
//     }
//   }

// };

/**
 *
 * @param data 元数据 required
 * @param map 映射表 required
 * @param record 选中行 required
 * @param newData 修改成功后的返回数据 required
 * @returns null 无返回,修改引用,操作成功后,选中行数据更改
 */
export function modify(data, map, record, newData) {
  delete newData.children;
  if (!record) {
    throw ('请选中需要修改的数据');
  }

  if (record.parentId === 0) {
    const _id = record.id;
    for (let i = 0; i < map.length; i++) {
      if (map[i].id === _id) {
        const key = map[i].parentKey;
        for (let j = 0; j < data.length; j++) {
          if (data[j].id === key) {
            Object.assign(data[j], newData);
          }
        }
      }
    }
  } else {
    let _key;
    let _id;
    for (let i = 0; i < map.length; i++) {
      if (map[i].id === record.id) {
        _key = map[i].parentKey;
        _id = map[i].id;
        for (let j = 0; j < data.length; j++) {
          if (data[j].id === _key) {
            const jChildren = data[j].children;
            const loop = value => {
              for (let k = 0; k < value.length; k++) {
                if (value[k].id === _id) {
                  Object.assign(value[k], newData);
                  break;
                }

                if (value[k].children) {
                  loop(value[k].children);
                }
              }
            };

            jChildren && loop(jChildren);
          }
        }
        break;
      }
    }
  }

}

/**
 * 新增
 * @param data 元数据 required
 * @param map 映射表 required
 * @param record 选中的行
 * @param newData 新增成功返回的数据 required
 * @returns null 无返回,引用修改
 */
export const create = (data, map, record, newData) => {
  if (!record) {
    data.push(newData);
    map.push({ parentKey: newData.id, id: newData.id });
  } else {

    const _id = record.id;
    const _key = newData.parentId;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === _key) {
        if (!data[i].children) {
          data[i].children = [newData];
        } else {
          data[i].children.push(newData);
        }
        map.push({ id: _id, parentKey: _key });
        break;
      }
      const Children = data[i].children;
      const loop = (value = []) => {
        for (let j = 0; j < value.length; j++) {
          if (value[j].id === _key) {
            if (!value[j].children) {
              value[j].children = [newData];
            } else {
              value[j].children.push(newData);
            }
            map.push({ id: _id, parentKey: data[i].id });
            break;
          }

          if (value[j].children) {
            loop(value[j].children);
          }
        }
      };

      loop(Children);
    }
  }
};

