
class GroupByArrayTree {

    constructor() {
        this.map = this._new();
    }

    _new() {
        return {
            keys: {},
            values: []
        }
    }

    set(keys, val) {
        let mapRef = this.map;
        for (const key of keys) {
            if (!mapRef.keys[key]) {
                mapRef.keys[key] = this._new();
            }
            mapRef = mapRef.keys[key];
        }
        mapRef.values.push(val)
        return this;
    }

    get(keys) {
        let mapRef = this.map;
        for (const key of keys) {
            if (!mapRef.keys[key]) {
                return [];
            }
            mapRef = mapRef.keys[key];
        }
        return [].concat(mapRef.values);
    }

}
