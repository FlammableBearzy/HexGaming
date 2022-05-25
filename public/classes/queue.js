class Queue
{
    constructor()
    {
        this.list = [];
        this.head = 0;
        this.tail =0;
        this.count = 0;
    }
    enqueue(item){
        this.list[this.tail] = item;
        this.tail++;
        this.count++;
    }
    dequeue(){
        if(!this.isEmpty())
        {
            let item = this.list[this.head];
            this.list[this.head] = null;
            this.head++;
            this.count--;
            return item;
        }
        else
        {
            return null;
        }
    }
    isEmpty(){
        return this.count > 0;
    }
}
