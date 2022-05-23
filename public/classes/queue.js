class Queue
{
    constructor()
    {
        this.list = [];
        this.head = 0;
        this.count = 0;
    }
    enqueue(item){
        this.list.add(item);
        this.count++;
    }
    dequeue(){
        let item = this.list[this.head];
        this.list[this.head] = null;
        this.head++;
        this.count--;
        return item;
    }
    isEmpty(){
        return this.count > 0;
    }
}