class Node{
    #value;
    #next;

    constructor(value=null,next=null){
        this.#value = value;
        this.#next = next;
    }

    get value(){
        return this.#value;
    }

    set value(updatedValue){
        this.#value = updatedValue;
    }

    get next(){
        return this.#next;
    }

    set next(updatedNext){
        this.#next = updatedNext;
    }
}

// let testNode = new Node(4);
// console.log(testNode.next);
// console.log(testNode.value);
// testNode.value = 10;
// console.log(testNode.value);

class LinkedList{
    #head;
    #tail;

    constructor(){
        this.#head = null;
        this.#tail = null;
    }
}

