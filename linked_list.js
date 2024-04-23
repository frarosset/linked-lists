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
    #size;

    constructor(){
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    // this method adds a new node containing value to the end of the list
    append(value){
        let newNode = new Node(value);

        // the list is not empty (note: no tail = no head)
        if (this.#tail){
            this.#tail.next = newNode;
            //console.log('Old tail', this.#tail.value,' - head', this.#head.value);
            this.#tail = newNode;
            //console.log('New tail', this.#tail.value,' - head', this.#head.value);
        } else {
            this.#head = newNode;
            this.#tail = newNode;
            //console.log('New list with tail', this.#tail.value,' - head', this.#head.value);
        }
        this.#size++;
    }

    // this method adds a new node containing value to the start of the list
    prepend(value){
        let newNode = new Node(value);

        // the list is not empty (note: no tail = no head)
        if (this.#head){
            newNode.next = this.#head;
            this.#head = newNode;
        } else {
            this.#head = newNode;
            this.#tail = newNode;
        }
        this.#size++;
    }

    // this method returns the total number of nodes in the list
    get size(){
        return this.#size;
    }

    // this method represents the LinkedList objects as strings, 
    // allowing to print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString(){
        let thisNode = this.#head;
        let str = '';
        
        while (thisNode != null){
            str += `( ${thisNode.value} )  -> `;
            thisNode = thisNode.next;
        }
        str += 'null';

        return str;
    }
}


let testLinkedList = new LinkedList();
testLinkedList.append(1);
testLinkedList.append(2);
testLinkedList.prepend(0);
testLinkedList.append(3);
testLinkedList.append(4);
testLinkedList.prepend(-10);
console.log(testLinkedList.size, testLinkedList.toString());
