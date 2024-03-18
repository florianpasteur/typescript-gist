
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

    getAllFrom(keys) {
        let mapRef = this.map;
        for (const key of keys) {
            if (!mapRef.keys[key]) {
                return [];
            }
            mapRef = mapRef.keys[key];
        }



        return getAllValues(mapRef);
    }
    getAllKeysFrom(keys) {
        let mapRef = this.map;
        for (const key of keys) {
            if (!mapRef.keys[key]) {
                return [];
            }
            mapRef = mapRef.keys[key];
        }

        return getAllKeys(mapRef);
    }

}


function getAllValues(node) {
    let result = [];

    function recurse(node) {
        for (let key in node.keys) {
            const childNode = node.keys[key];
            result = result.concat(getAllValues(childNode));
        }
        result = result.concat(node.values);
    }

    recurse(node);
    return result;
}

function getAllKeys(node, parentKeyChain = []) {
    let keyChains = [];

    function recurse(node, currentKeyChain) {
        for (let key in node.keys) {
            const childNode = node.keys[key];
            const childKeyChain =  [...currentKeyChain, key];
            keyChains.push(childKeyChain);
            recurse(childNode, childKeyChain);
        }
    }

    recurse(node, parentKeyChain);
    return keyChains;
}