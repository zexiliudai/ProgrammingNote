const PENDING = "pending"
const FUFILLED = "fulfilled"
const REJECTED = "rejected"

const resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError('Chaning cycle detected for promise #<Promise>'))
    }
    let called
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') {
                this.call(x, y => {
                    if (called) {
                        return
                    }
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) {
                        return
                    }
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class _promise {

    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.callbackResolve = []
        this.callbackReject = []

        let resolve = (value) => {
            console.log(this)
            if (this.status === PENDING) {
                this.status = FUFILLED
                this.value = value
                this.callbackResolve.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if (this.status) {
                this.status = REJECTED
                this.reason = reason
            }
        }

        try {
            executor(resolve, reject)
        }
        catch (error) {
            reject(error)
        }
    }

    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw error }
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === FUFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFullfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0)

            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)


            }
            if (this.status === PENDING) {
                this.callbackResolve.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFullfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })

                this.callbackReject.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
}

var curry = function(fn) {
    var args = [].slice.call(arguments, 1)
    return function(){
        var newArgs = args.concat([].slice(arguments))
        console.log(fn)
        return fn.apply(this,newArgs)
    }
    }

var add = function(a, b) {
    return (a + b)
}




