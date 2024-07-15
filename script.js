import { LinkedList } from "./linked.mjs";

function HashMap() {
  return {
    capacity: 16,
    loadFactor: 0.75,
    buckets: Array(16).fill(null),

    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }
      return Math.abs(hashCode) % this.capacity;
    },

    set(key, value) {
      const index = this.hash(key);
      const currentKeys = this.keys();
      if (currentKeys.length > this.loadFactor * this.capacity) {
        this.capacity *= 2;
      }

      if (!this.buckets[index]) {
        this.buckets[index] = LinkedList();
        this.buckets[index].append({ key, value });
      } else {
        let current = this.buckets[index].head;
        let found = false;
        while (current) {
          if (current.data.key === key) {
            current.data.value = value;
            found = true;
            break;
          }
          current = current.next;
        }
        if (!found) {
          this.buckets[index].append({ key, value });
        }
      }
    },

    get(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return null;
      }
      let current = this.buckets[index].head;
      while (current) {
        if (current.data.key === key) {
          return current.data.value;
        }
        current = current.next;
      }
      return null;
    },
    has(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return false;
      }
      let current = this.buckets[index].head;
      while (current) {
        if (current.data.key === key) {
          return true;
        }
        current = current.next;
      }
      return false;
    },
    remove(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return false;
      }
      let current = this.buckets[index].head;
      let previous = null;
      while (current) {
        if (current.data.key === key) {
          if (previous) {
            previous.next = current.next;
          } else {
            this.buckets[index].head = current.next;
          }
          return true;
        }
        previous = current;
        current = current.next;
      }
      return false;
    },

    length() {
      let length = 0;
      this.buckets.forEach((bucket) => {
        if (bucket) {
          let current = bucket.head;
          while (current) {
            length++;
            current = current.next;
          }
        }
      });
      return length;
    },

    clear() {
      this.buckets = Array(this.capacity).fill(null);
    },

    keys() {
      const keys = [];
      this.buckets.forEach((bucket) => {
        if (bucket) {
          let current = bucket.head;
          while (current) {
            keys.push(current.data.key);
            current = current.next;
          }
        }
      });

      return keys;
    },

    values() {
      const values = [];
      this.buckets.forEach((bucket) => {
        if (bucket) {
          let current = bucket.head;
          while (current) {
            values.push(current.data.value);
            current = current.next;
          }
        }
      });
      return values;
    },

    entries() {
      const entries = [];
      this.buckets.forEach((bucket) => {
        if (bucket) {
          let current = bucket.head;
          while (current) {
            entries.push([current.data.key, current.data.value]);
            current = current.next;
          }
        }
      });
      return entries;
    },
  };
}
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("mango", "orange");
test.set("apple", "black");
console.log(test.entries());
