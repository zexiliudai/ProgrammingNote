//shadow copy
function copy(target) {
    let copyedTarget = {}
    for (const key in target) {
        copyedTarget[key] = target[key]
    }
    return copyedTarget
}

//deep copy
function deepCopy(target) {
    if (typeof target === 'object') {
        let copyedTarget = Array.isArray(target) ? [] : {}
        for(const key in target){
            copyedTarget[key] = deepCopy(target[key])
        }
        return copyedTarget
    }
    else {
        return target
    }
}