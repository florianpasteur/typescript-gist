Array.prototype.toSet = function(mapFn) {
    if (typeof mapFn === 'function') {
        return new Set(this.map(mapFn));
    }
    return new Set(this);
};

Array.prototype.groupBy = function(mapFn) {
    if (typeof mapFn !== 'function') {
        throw new TypeError('The argument must be a function');
    }

    return this.reduce((acc, item) => {
        const key = mapFn(item);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
};

Array.prototype.flatten = function(depth = 1) {
    return this.reduce((acc, val) =>
            Array.isArray(val) && depth > 1 ?
                acc.concat(val.flatten(depth - 1)) :
                acc.concat(val),
        []);
};

Array.prototype.uniq = function() {
    return [...new Set(this)];
};

Array.prototype.chunk = function(size) {
    if (!Number.isInteger(size) || size <= 0) {
        throw new TypeError('Size should be a positive integer');
    }
    const result = [];
    for (let i = 0; i < this.length; i += size) {
        result.push(this.slice(i, i + size));
    }
    return result;
};

Array.prototype.partition = function(predicate) {
    if (typeof predicate !== 'function') {
        throw new TypeError('Predicate should be a function');
    }
    return this.reduce(([pass, fail], elem) =>
            predicate(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]],
        [[], []]);
};

Array.prototype.intersection = function(arr) {
    const set = new Set(arr);
    return this.filter(item => set.has(item));
};

Array.prototype.difference = function(arr) {
    const set = new Set(arr);
    return this.filter(item => !set.has(item));
};