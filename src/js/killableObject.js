import {Actor,Physics,Collider,Vector} from "excalibur";
export class killableObject extends Actor
{
    health
    helthRegen

    maxhealth

    manager
    constructor(startHealth,regenRate) {
        super();
        this.maxhealth = startHealth;
        this.health=startHealth;
        this.helthRegen=regenRate;
        this.scale=new Vector(1,1);

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.on("postcollision",event =>this.damage(1));
    }

    damage(amount)
    {
        this.health-=amount;
        console.log("au")
    }
    _preupdate(engine,delta) {
        super._preupdate(engine, delta);
        if(this.health<=0)
        {
            this.kill();
        }
        else if(this.helthRegen<this.maxhealth)
        {
            this.health = Math.min(this.health+this.helthRegen*(delta/1000),this.maxhealth);
        }

        if(this.pos.x<-16)
        {
            this.pos.x = 768+15
        }
        if(this.pos.x>16+768)
        {
            this.pos.x = -15;
        }
        if(this.pos.y<-16)
        {
            this.pos.y = 620+15
        }
        if(this.pos.y>16+620)
        {
            this.pos.y = -15
        }
    }
    _prekill(_scene) {
        super._prekill(_scene);
        if(this.manager!=null)
        {
            this.manager.currentAmount--;
        }
    }
}