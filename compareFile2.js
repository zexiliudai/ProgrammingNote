const flatten = (arr) => {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element && Object.prototype.toString.call(element) === '[object Array]') {
        newArr = newArr.concat(flatten(element))
      } else {
        newArr.push(element)
      }
    }
    return newArr
}
