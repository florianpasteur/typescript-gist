class CountOccurrences {


    constructor() {
        this.occurrences = {};
    }

    count(val){
        if (isNaN(this.occurrences[val])) {
            this.occurrences[val] = 1;
        } else {
            this.occurrences[val]++;
        }
    }

    getOccurrences() {
        return {...this.occurrences}
    }
}