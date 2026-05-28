//1)
class Tringle{
    constructor (a,b,c){
        if(a+b<=c || a+c<=b || b+c<=a){
            throw new Error("invalid tringle sides");
            
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getperimeter(){
        return this.a+this.b+this.c;
    }

    getarea(){
        const s = this.getperimeter()/2;
        return Math.sqrt(s*(s-this.a)*(s-this.b)*(s-this.c));
    }

    isrighttringle(){
        const sides = [this.a,this.b,this.c].sort((x,y)=>x-y);
        const[x,y,z] = sides;
        return Math.abs(x ** 2 + y ** 2 - z ** 2) < 1e-9;
    }
}
const t = new Tringle(3,4,5);
console.log(t.getperimeter());
console.log(t.getarea());
console.log(t.isrighttringle());


//2)
class smartphone{
    constructor(brand,model,releaseyear){
        this.brand = brand;
        this.model = model;
        this.releaseyear = releaseyear;
    }

  getinfo() {
    return `${this.brand} ${this.model} (${this.releaseYear})`;
  }
}
class gamingphone extends smartphone{
    constructor(brand,model,releaseyear,gpuscore,batterycapacity){
        super(brand,model,releaseyear);
        this.gpuscore = gpuscore;
        this.batterycapacity = batterycapacity;
    }
    performanceindex(){
        const index = this.gpuscore *(this.batterycapacity/1000);
        return Math.round(index);
    }
}
const phone = new gamingphone("ASUS", "ROG Phone 8", 2024, 1500, 6000);
console.log(phone.getinfo());          
console.log(phone.performanceindex()); 

//3)
class cryptowallet{
    constructor(owner){
        this.owner = owner;
        this.balance = 0;
        this.history = [];
    }

    deposit(amount){
        if(amount<=0) return console.log("tanxa 0-ze meti unda iyos");
        this.balance += amount;
        this.history.push({type:"deposit",amount,date:new Date()});
    }

    withdraw(amount){
        if(amount > this.balance)return console.log("balansi ar aris sakmarisi");
        this.balance -= amount;
        this.history.push({type:"withdraw",amount,date:new Date()})
    }

    transfer(towallet,amount){
        if(amount >this.balance)return console.log("balansi ar aris sakmarisi");
        this.withdraw(amount);
        towallet.deposit(amount);
        console.log(`gadairicxa ${amount} → ${towallet.owner}`);
    }
    gethistory(){
        return this.history
    }
}
const mike = new cryptowallet("mike");
const bob = new cryptowallet("bob");
mike.deposit(500);
mike.transfer(bob,200);
console.log(mike.balance);

//4)
class wishlist{
    constructor(){
        this.items = [];
        this.nextid = 1
    }

    additem(name,price){
        const item = {id:this.nextid++,name,price}
        this.items.push(item);
        return item;
    }

    deleteitem(id){
        const before = this.items.length;
        this.items = this.items.filter(item =>item.id !== id);
        const deleted = before >this.items.length;
        console.log(deleted ? "waishala" : "nivti ver moidzebna");
    }

    updateitem(id,newdata){
        const item = this.items.find(i=>i.id === id);
        if(!item) return console.log("nivti ver moidzebna");

        Object.assign(item,newdata);
        return item;
    }
}
const list = new wishlist();
list.additem("macbook",2500);
list.additem("airpods",300);
list.updateitem(1,{price:2300});
list.deleteitem(2);
console.log(list.items);

//5)
class Freelancer {
  constructor(name, hourlyRate) {
    this.name = name;
    this.hourlyRate = hourlyRate; 
  }


  calculateEarnings(hours, bonusRate = 0.2) {
    const OVERTIME_LIMIT = 160; 

    
    const regularHours   = Math.min(hours, OVERTIME_LIMIT);
    const regularPay     = regularHours * this.hourlyRate;

    const overtimeHours  = Math.max(0, hours - OVERTIME_LIMIT);
    const overtimePay    = overtimeHours * this.hourlyRate * (1 + bonusRate);

    const total = regularPay + overtimePay;

    console.log(`${this.name}: ${hours}სთ → $${total.toFixed(2)}`);
    return total;
  }
}

// გამოყენება
const dev = new Freelancer("Giorgi", 25); // $25/სთ

dev.calculateEarnings(140); 
dev.calculateEarnings(180); 
dev.calculateEarnings(200, 0.5); 