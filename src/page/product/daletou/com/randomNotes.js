function setBallArr(length) {
    const arr = []
    for (let i = 1; i < length; i++) {
        arr.push((i < 10 ? '0' : '' ) + i)
    }
    return arr
}
function sortArr(arr) {
    arr.sort((a, b) => {
        return Math.random() > .5 ? -1 : 1;
    });
    return arr
}

const random_sort = () => {
    const red = setBallArr(36)
    const blue = setBallArr(13)


    return {
        red: sortArr(red).slice(0, 5),
        blue: sortArr(blue).slice(0, 2)
    }
};


export default random_sort;
