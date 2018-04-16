let ssq_red = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33"];
let ssq_blue = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];

ssq_red.sort(function (a, b) {
  return Math.random() > .5 ? -1 : 1;
});
ssq_blue.sort(function (a, b) {
  return Math.random() > .5 ? -1 : 1;
});

const random_sort = () => {
  return {
    tuo_arr: [],
    tuo: "",
    red: ssq_red.slice(0, 6).join(","),
    red_arr: ssq_red.slice(0, 6),
    blue_arr: ssq_blue.slice(0, 1),
    blue: ssq_blue.slice(0, 1).join(","),
    notes: 1,
    money: 2,
    _money: 2,
    multiple: 1,
    type: 1
  }
};


export default random_sort;
