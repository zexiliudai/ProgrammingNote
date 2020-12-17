
const flatten = (arr) => {
    let newArr = []
    for (let i = 0; i< arr.length; i++) {
        let element = arr[i]
        if(element && Object.prototype.toString === "[object Array]") {
            newArr.concat(flatten(element))
        }
        else newArr.push(element)
    }
    return newArr
}