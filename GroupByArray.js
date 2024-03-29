/**
 * Represents a map-like structure that groups values by keys into arrays.
 * @class
 */
class GroupByArray {
    /**
     * Constructs a new GroupByArray.
     */
    constructor() {
        /**
         * Internal map to store key-value pairs.
         * @type {Map}
         * @private
         */
        this.map = new Map();
    }

    /**
     * Sets a value associated with the specified key. If the key already exists, the value is pushed into the existing array.
     * @param {*} key - The key to set.
     * @param {*} val - The value to associate with the key.
     * @returns {GroupByArray} The updated GroupByArray instance.
     */
    set(key, val) {
        if (this.map.has(key)) {
            this.map.get(key).push(val);
        } else {
            this.map.set(key, [val]);
        }
        return this;
    }

    /**
     * Gets the array of values associated with the specified key.
     * @param {*} key - The key whose associated values are to be returned.
     * @returns {Array|null} An array of values associated with the key, or null if the key does not exist.
     */
    get(key) {
        if (this.map.has(key)) {
            return [].concat(this.map.get(key));
        }
        return null;
    }

    /**
     * Returns an array of all values stored in the GroupByArray.
     * @returns {Array} An array containing all values stored in the GroupByArray.
     */
    values() {
        return Array.from(this.map.values());
    }

    /**
     * Returns an array of entries (key-value pairs) stored in the GroupByArray.
     * @returns {Array} An array containing all entries (key-value pairs) stored in the GroupByArray.
     */
    entries() {
        return Array.from(this.map.entries());
    }

    /**
     * Returns an array of keys stored in the GroupByArray.
     * @returns {Array} An array containing all keys stored in the GroupByArray.
     */
    keys() {
        return Array.from(this.map.keys());
    }
}

module.exports = GroupByArray
