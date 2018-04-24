/**
 *
 * @param arr 选择的数据 二维数组
 * @param chuan 几串1 的几
 * @returns {number}  注数
 */
const suanfa = (arr, chuan) => {
  if (chuan === 1) return danzhu(arr);
  else if (chuan === 2) {
    for (let i = 0; i < arr.length; i++) {
      const b = suanfa2(arr);
      return b
    }
  } else {
    let zhushu = 0;
    const a = arr.concat();
    for (let i = 0; i < arr.length - chuan + 1; i++) {
      a.shift();
      const b = suanfa(a, chuan - 1);
      zhushu += arr[i].length * b;
    }
    return zhushu;
  }
};

// 2串
const suanfa2 = (arr) => {
  let zhushu = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    zhushu += arr[i].length * (suanfa3(i + 1, arr));
  }
  return zhushu;
};

// 累加
const suanfa3 = (i, arr) => {
  let zhushu = 0;
  for (; i < arr.length; i++) {
    zhushu += arr[i].length;
  }
  return zhushu;
};

/*测试数据
 const testData = [
 [1, 2],
 [1, 2],
 [1, 2, 3],
 [1, 2],
 ];


 suanfa4(testData, 3)*/


const danzhu = (arr) => {
    let zhushu = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < arr[i].length; k++) {
        zhushu++
      }
    }
    return zhushu;
  }
;

export  {suanfa, danzhu};
