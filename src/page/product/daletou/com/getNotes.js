/**
 * 计算注数
 */

function jiecheng(m, length) {
    let val = m
    for (let i = 1; i < length; i++) {
        val = val * (m - i)
    }
    return val
}

export default function (playType, d) {
    let [a, b] = [0, 0]
    // 普通投注
    if (playType === 0) {
        if (d.red >= 5 || d.blue >= 2) {
            if (d.red === 5) a = 1
            else a = jiecheng(d.red, 5) / 120
            if (d.blue === 2) b = 1
            else b = jiecheng(d.blue, 2) / 2
        }
    }
    // 胆拖玩法
    else if (playType === 1) {
        if ((d.redDan > 0 && d.redDan < 5) &&
            d.blueDan < 2 &&
            (d.red + d.redDan > 5) &&
            (d.blue + d.blueDan > 2)) {
            a = jiecheng(d.red, 5 - d.redDan) / jiecheng(5 - d.redDan, 4 - d.redDan)
            b = jiecheng(d.blue, 2 - d.blueDan) / jiecheng(2 - d.blueDan, 1 - d.blueDan)
        }
    }
    console.log('a = ' + a)
    console.log('b = ' + b)
    return a * b
}
