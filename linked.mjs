export function LinkedList() {
  return {
    head: null,

    Node(data) {
      return {
        data,
        next: null,
      };
    },

    append(data) {
      const newNode = this.Node(data);
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    },
  };
}
