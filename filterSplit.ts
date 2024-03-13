/*
* Filter an array and split the array into 2 arrays, one with the elements matching the predicate and one with the elements rejected by the predicate
* */

// const filteredArray = myArray.filter(str => str.length > 255);
// becomes
// const [filteredArray, rejectedArray] = myArray.filterSplit(str => str.length > 255);

declare global {
    interface Array<T> {
        filterSplit(predicate: (item: T, index: number, array: T[]) => boolean): [T[], T[]];
    }
}

Array.prototype.filterSplit = function<T>(predicate: (item: T, index: number, array: T[]) => boolean): [T[], T[]] {
    const matched: T[] = [];
    const rejected: T[] = [];

    this.forEach((item, index, array) => {
        if (predicate(item, index, array)) {
            matched.push(item);
        } else {
            rejected.push(item);
        }
    });

    return [matched, rejected];
};