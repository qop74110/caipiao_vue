//
// const suanfa1 = (n, m, arr) => {
//
//   if (m === 2) {
//     return 2;
//   } else {
//     for (let i = 0; i < n - m + 1; i++) {
//       return str[i] * suanfa1(n - 1, m - 1, arr[n - 1])
//     }
//   }
//
// };


//
// // 三串
// const suanfa4 = (arr) => {
//   let zhushu = 0;
//   const a = arr.concat();
//   for (let i = 0; i < arr.length - 2; i++) {
//     a.shift();
//     zhushu += arr[i].length * suanfa2(a);
//   }
//   return zhushu;
// };
//
// // 4串
// const suanfa5 = (arr) => {
//   let zhushu = 0;
//   const a = arr.concat();
//   for (let i = 0; i < arr.length - 3; i++) {
//     a.shift();
//     zhushu = arr[i].length * suanfa4(a)
//     debugger;
//   }
//   return zhushu;
// }


/**
 *
 * @param arr 选择的数据 二维数组
 * @param chuan 几串1 的几
 * @returns {number}  注数
 */
const suanfa = (arr, chuan) => {
  if (chuan === 2) {
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

export default suanfa;
