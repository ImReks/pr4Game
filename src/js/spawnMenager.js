import {Actor} from "excalibur";
export class spawnMenager extends Actor
{
    targetAmount;
    spawnObject;

    currentAmount;

    constructor(amount,spawnObject)
    {
       // console.log("spawning");
        super()
        this.targetAmount=amount;
        this.spawnObject=spawnObject;
        this.currentAmount=0
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
       // console.log("spawn")
        if(this.currentAmount<this.targetAmount)
        {
          //  console.log("added",this.currentAmount,this.targetAmount)
            let object =new this.spawnObject();
            object.menager = this;
            this.scene.add(object);
            this.currentAmount++;
        }
    }

}