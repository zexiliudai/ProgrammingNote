// Define the new fn with new arguments 
function sub_curry() {
    var args = [].slice.call(arguments, 1)
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)))
    }
}

function curry(fn, length) {
    length = length || fn.length
    var slice = Array.prototype.slice
    // After using f = curry(fn),  identify how many arguments is in the new f(*, *, *) and the f.length 
    return function() {
        if (arguments.length < length) {
            var combine = [fn].concat(slice.call(arguments))
            return curry(sub_curry.apply(this, combine), length - arguments.length)
        } else {
            return fn.apply(this, arguments)
        }
    }
}

function subCurry() {
    return function() {
        var newArgs = [].concat(args)
        fn.apply(this, newArgs.concat(arguments))
    }
}

function selfCurry(fn, length) {
    length = length || fn.length
    return function() {
        if (length < fn.length) {
            return selfCurry(subCurry.apply(this, fn, argumetns), length - arguments.length)
        }
        else {
            return fn.apply(this, arguments)
        }
    }
}