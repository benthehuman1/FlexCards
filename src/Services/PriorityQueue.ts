/*
interface IComparable<T> {
     compareTo(other: T): number;
}


class ComparableString implements IComparable<ComparableString>{
    data: string;

    constructor(data: string){
        this.data = data;
    }
    
    compareTo(other: ComparableString): number{
        return this.data.localeCompare(other.data);
    }

}



class PriorityQueue<T extends IComparable<T>>{

    static top: number = 0;
    static parent = (i: number) => ((i + 1) >>> 1) - 1;
    static left = (i: number) => (i << 1) + 1;
    static right = (i: number) => (i + 1) << 1;

    _comparator(a: T, b: T){
        return a.compareTo(b) <= 0;
    }

    _heap: T[];
  constructor() {
    this._heap = [];
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[PriorityQueue.top];
  }
  push(...values: T[]) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > PriorityQueue.top) {
      this._swap(PriorityQueue.top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value: T) {
    const replacedValue = this.peek();
    this._heap[PriorityQueue.top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i: number, j: number) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i: number, j: number) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > PriorityQueue.top && this._greater(node, PriorityQueue.parent(node))) {
      this._swap(node, PriorityQueue.parent(node));
      node = PriorityQueue.parent(node);
    }
  }
  _siftDown() {
    let node = PriorityQueue.top;
    while (
      (PriorityQueue.left(node) < this.size() && this._greater(PriorityQueue.left(node), node)) ||
      (PriorityQueue.right(node) < this.size() && this._greater(PriorityQueue.right(node), node))
    ) {
      let maxChild = (PriorityQueue.right(node) < this.size() && this._greater(PriorityQueue.right(node), PriorityQueue.left(node))) ? PriorityQueue.right(node) : PriorityQueue.left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}


class ModMinQueue<T extends IComparable<T>>{
    
    queue: PriorityQueue<T> //Most of the items
    cache: T[]; //First Three items
    pool: number[]; //Pool of items from the cache to pick from.

    constructor(items: T[]){
        this.queue = new PriorityQueue<T>();
        items.forEach(element => {
            this.queue.push(element)
        });
        
        this.cache = [];
        this.cache[0] = this.queue.pop();
        this.cache[1] = this.queue.pop();
        this.cache[2] = this.queue.pop();

        this.pool = [0, 1, 2];

    }

    private getProbablityOfIndex(index: number): number{
        //Maps the index in the chache to the prbablility that that item would be selected.
        switch(index){
            case 0:
                return 0.5; break;
            case 1:
                return 0.3; break;
            case 2:
                return 0.2; break;
            default:
                return 0.5;
        }
    }

    private getPopIndex_Default(): number{
        var rand: number = Math.random();
        if(rand < 0.5) { return 0; }
        else if(rand >= 0.5 && rand < 0.8) { return 1; }
        else { return 2; }
    }

    public getPopIndex(): number{
        var rand: number = Math.random();

        if(this.pool.length == 3){ return this.getPopIndex_Default() }

        var pSum: number = this.getProbablityOfIndex(this.pool[0]) + this.getProbablityOfIndex(this.pool[1]);
        var pFirstInPool = this.getProbablityOfIndex(this.pool[0]) / pSum;

        if(rand < pFirstInPool){ return this.pool[0]; }
        else {return this.pool[1]; }
    }

    pop(): T{
        var index = this.getPopIndex();
        var pool: number[] = [0, 1, 2];
        var element = this.cache[index];

        this.cache.splice(index, 1);
        pool.splice(index, 1);
        
        this.cache.push(this.queue.pop());
        this.pool = pool;

        return element;
    }
    
    push(element: T){
        var highestInCache = this.cache[2];
        if(element.compareTo(highestInCache) < 0){ //If the new element is less than the hightest element in the cache
            this.queue.push(highestInCache)
            this.cache.pop();

            var cacheIndex: number;
            var pool: number[];

            var lessThanLeastCache = (element.compareTo(this.cache[0]) < 0);
            var lessThanMostrCache = (element.compareTo(this.cache[1]) < 0);

            if(lessThanLeastCache){//If the new element is less than the lowest element in the cache
                cacheIndex = 0;
                pool = [1, 2]
            }
            else{
                if(lessThanMostrCache){//If the new element is less than the new hightest element in the cache
                    cacheIndex = 1;
                    pool = [0, 2]
                }
                else{//If the new element is more than the new hightest element in the cache
                    cacheIndex = 2;
                    pool = [0, 1]
                }
            }
            
            this.cache.splice(cacheIndex, 0, element);
            this.pool = pool;
        }
        else{
            this.queue.push(element);
            this.pool = [0, 1, 2];
        }
    }
}

var s1: ComparableString = new ComparableString("B");
var s2: ComparableString = new ComparableString("D");
var s3: ComparableString = new ComparableString("F");
var s4: ComparableString = new ComparableString("H");
var s5: ComparableString = new ComparableString("J");
var s6: ComparableString = new ComparableString("L");

console.log(s2.compareTo(s1))

var pq = new PriorityQueue<ComparableString>();
pq.push(s1, s2, s3, s4, s5, s6);

console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
console.log(pq.pop())
var sArr: ComparableString[] = [];

sArr.push(s1, s2, s3, s4, s5, s6);

var PeeQew = new ModMinQueue<ComparableString>(sArr)

var removed: ComparableString = PeeQew.pop();
console.log("REM:");
console.log(removed);
//PeeQew.push(removed);
console.log(PeeQew.pool);
console.log("");
console.log("PUSH C");
PeeQew.push(new ComparableString("I"));
console.log(PeeQew.cache);
console.log(PeeQew.pool);
*/