function observe(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key])
    })
}
function defineReactive(data, key, val) {
    observe(val)
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
            return val
        },
        set: function(newVal) {
            val = newVal
            console.log(`detected ${val} change to ${newVal}`)
        }
    })
}