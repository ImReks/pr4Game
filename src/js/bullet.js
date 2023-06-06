import {Actor, CollisionType,Shape,Vector} from "excalibur";
import {Resources} from "./resources.js";

export class bullet extends Actor
{
    owner;
    damage

    startPos;
    startVel;
    constructor(damage,pos,vel) {
        super();
        this.startPos=pos;
        this.startVel=vel;
        this.damage=damage;
    }
    onInitialize(_engine) {
        console.log("bullet")
        this.pos=this.startPos;
        this.vel=this.startVel;
        super.onInitialize(_engine);
        this.body.collisionType=CollisionType.Active;
        this.graphics.use(Resources.bullet.toSprite());
        this.scale = new Vector(3,3)
        this.collider.set(Shape.Box(3,1))
        this.on("collisionstart",event => this.collide(event))
    }
    collide(event)
    {
        if(event.other != this.owner) {
            event.other.health -= this.damage;
            if(event.other.health<=0)
            {
                this.owner.score++;
            }
            this.kill();
        }


    }
}