function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)) {
            return reject(new TypeError('need arguments as array'))
        }
        let result = [], count = 0, i=0
        for(let promise of promises) {
            Promise.resolve(promise).then(data => {
                count++ 
                // 不能用push，因为不知道返回数据的顺序，需要用i来插入数组
                result[i]=data
                i++
                console.log('cnmd')
                if(result.length === promises.length) {
                    return resolve(result)
                }
            }, reason=>{
                reject(reason)
            })
        }
    })
} 

let test = () => {
    for(let i =0; i<10; i++ ){
        (function(i){return i})(i)
        console.log(i)
    }
}
