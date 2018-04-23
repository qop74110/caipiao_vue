const max_jj = (arr, chuan) => {
  if (chuan !== 1) {
    const a = arr.concat();
    let max = 0;
    for (let i = 0; i < arr.length - chuan + 1; i++) {
      a.shift();
      max += arr[i] * jiangjin(a, chuan - 1)
    }
    return max;
  } else {
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      num += arr[i]
    }
    return num;
  }
};


const sortArr = (m, n) => {
  return m - n;
};

const min_jj = (arr, chuan) => {
  arr.sort(sortArr);
  let min = 1;
  for (let i = 0; i < chuan; i++) {
    min = min * [arr[i]]
  }
  return min;
};

export {min_jj, max_jj};
