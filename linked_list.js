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

    // this method returns the first node in the list
    get head(){
        return this.#head;
    }

    // this method returns the last node in the list
    get tail(){
        return this.#tail;
    }

    // this method returns the node at the given index
    at(index){
        if (index<0 || index >= this.#size)
            return null;

        let thisIdx = 0;
        let thisNode = this.#head;
        while (thisIdx != index){
            thisNode = thisNode.next;
            thisIdx++;
        }

        return thisNode;
    }

    
    // this method removes the last element from the list
    // a prev property is not present in Node objects in this implementation,
    // hence you need to find the node preeceding the last one,
    // which will be the new tail
    pop(){
        // the list is not empty (note: no tail = no head)
        if (this.#size == 1) {
            this.#tail = null;
            this.#head = null;
            this.#size = 0;
        } else if (this.#size > 1){
            this.#tail = this.at(this.#size-2);
            this.#tail.next = null;
            this.#size--;
        } // else do nothing to do: the list is empty
    }

    // this method removes the first element from the list
    shift(){
        // the list is not empty (note: no tail = no head)
        if (this.#size == 1) {
            this.#tail = null;
            this.#head = null;
            this.#size = 0;
        } else if (this.#size > 1){
            this.#head = this.#head.next;
            this.#size--;
        } // else do nothing to do: the list is empty
    }

    // this method returns true if the passed in value is in the list 
    // and otherwise returns false
    contains(value){
        let thisNode = this.#head;
        
        while (thisNode != null){
            if (thisNode.value === value)
                return true;
            thisNode = thisNode.next;
        }

        return false;
    }

    // this method returns the index of the node containing value, 
    // or null if not found.
    find(value){
        let thisNode = this.#head;
        let idx = 0;
        
        while (thisNode != null){
            if (thisNode.value === value)
                return idx;
            thisNode = thisNode.next;
            idx++;
        }

        return null;
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

    // this method inserts a new node with the provided value at the given index.
    insertAt(value, index){
        if (index<0 || index > this.#size)
            return null;

        if (index==0){
            this.prepend(value);
            return;
        } else if (index== this.#size) {
            this.append(value);
            return;
        }
        
        // here we are sure the head / tail will not be modified
        let nodeAtIndex = this.at(index-1);
        let newNode = new Node(value,nodeAtIndex.next);
        nodeAtIndex.next = newNode;
        this.#size++;
    }

    // this method remove the node at the given index.
    removeAt(index){
        if (index<0 || index >= this.#size)
            return null;

        if (index==0){
            this.shift();
            return;
        } else if (index == this.#size-1) {
            this.pop();
            return;
        }
        
        // here we are sure the head / tail will not be modified
        let nodeAtIndex = this.at(index-1);
        nodeAtIndex.next = nodeAtIndex.next.next;
        this.#size--;
    }
}

// Test ----------------------------------------------------------------------------------------

let testLinkedList = new LinkedList();
let logPartialResult = () => {
    console.log(testLinkedList.toString());
    let head = testLinkedList.head;
    let tail = testLinkedList.tail;
    console.log({size: testLinkedList.size, head: head? head.value : head, tail: tail ? [tail.value,tail.next] : tail});
}
logPartialResult();

let append_test = [1,2,3,4];
let prepend_test = [0, -1];
for (let app of append_test){
    testLinkedList.append(app);
    console.log(`\nTrying to append ${app}`);
    logPartialResult();
}
for (let prep of prepend_test){
    testLinkedList.prepend(prep);
    console.log(`\nTrying to prepend ${prep}`);
    logPartialResult();
}

at_test = [-3, 0, 1,  4, 5, 6, 10];
for (let at of at_test){
    let node = testLinkedList.at(at);
    console.log(`\nAt index ${at}: `, node?node.value:node);
}

while(testLinkedList.head){
    testLinkedList.pop();
    console.log(`\nTrying to remove the last element`);
    logPartialResult();
}
testLinkedList.pop();
console.log(`\nTrying to remove the last element (do nothing)`);
logPartialResult();

for (let app of append_test){
    testLinkedList.append(app);
}
for (let prep of prepend_test){
    testLinkedList.prepend(prep);
}
console.log('\n\n\nRecreate the list...\n',testLinkedList.toString());
while(testLinkedList.head){
    testLinkedList.shift();
    console.log(`\nTrying to remove the first element`);
    logPartialResult();
}
testLinkedList.shift();
console.log(`\nTrying to remove the first element (do nothing)`);
logPartialResult();

for (let app of append_test){
    testLinkedList.append(app);
}
for (let prep of prepend_test){
    testLinkedList.prepend(prep);
}
console.log('\n\n\nRecreate the list...\n',testLinkedList.toString());
val_test = [-1, 2, 4, -5, null];
for (let val of val_test){
    console.log(`Contains ${val} ?`, testLinkedList.contains(val), 'at index', testLinkedList.find(val));
}

ins_test = [[-11,-1], [0,0], [11,1], [22,2], [77,7], [99,9], [1111,11],  [1313,13]];
for (let ins of ins_test){
    testLinkedList.insertAt(ins[0],ins[1]);
    console.log(`\nTrying to insert ${ins[0]} at ${ins[1]}`);
    logPartialResult();
}

rem_test = [-1,0,1,8,8,9];
for (let rem of rem_test){
    testLinkedList.removeAt(rem);
    console.log(`\nTrying to remove at ${rem}`);
    logPartialResult();
}