/*https://gist.github.com/alexhawkins/48d7fd31af6ed00e5c60*/

class HashTable {
  
    constructor(){

        this.data = [];
    }

    createHashIndex(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash = hash >>> 0; //convert to 32bit unsigned integer
        }
        return Math.abs(hash % max);
    }

    insert(key, value) {
        if (key === undefined || value === undefined || key.length === 0 || value.length === 0)
            throw ('Insertion of undefined not possible')
        else {
            var hashIndex = this.createHashIndex(key);
            data[hashIndex] = value;
        }
        return this;
    }

    getValue(key) {
        var hashIndex = this.createHashIndex(key);
        return key + ': ' + data[hashIndex];
    }

};

/*
var myDictionary = {
    ailurophile: 'a cat-lover',
    assemblage: 'a gathering',
    bucolic: 'in a lovely rural setting',
    ebullience: 'bubbling enthusiasm',
    evanescent: 'vanishing quickly, lasting a very short time',
    evocative: 'suggestive',
    gossamer: 'the finest piece of thread, a spider\'s silk',
    harbinger: 'messenger with news of the future'
};

//create an instance of our createHashTable, and set the max to 10000
var hashTable = newHashTable(10000);

//now insert our dictionary keys and values into our hash table
for (var key in myDictionary) {
    hashTable.insert(key, myDictionary[key]);
}

//now look up definitions in our hash table;
for (var key in myDictionary) {
    console.log(hashTable.getValue(key));
}
//RESULTS
//ailurophile: a cat-lover
//assemblage: a gathering
//bucolic: in a lovely rural setting
//ebullience: bubbling enthusiasm
//evanescent: vanishing quickly, lasting a very short time
//evocative: suggestive
//gossamer: the finest piece of thread, a spider's silk
//harbinger: messenger with news of the future
//ailurophile: a cat-lover
//gossamer: the finest piece of thread, a spider's silk
console.log(hashTable.insert('labyrinthine', 'twisting and turning').getValue('labyrinthine')); // labyrinthine: twisting and turning
console.log(hashTable.getValue('ailurophile')); // ailurophile: a cat-lover
console.log(hashTable.getValue('gossamer')); //gossamer: the finest piece of thread, a spider's silk
//console.log(hashTable.insert('incipient')); //throw ('Insertion of undefined not possible')
//console.log(hashTable.insert('', 'a naive young women')); //throw ('Insertion of undefined not possible')*/