import {killableObject} from "./killableObject.js";
import {Shape, Physics, randomInRange, Vector, CollisionType,Random} from "excalibur";
import {Resources} from "./resources.js";

export class Meteor extends killableObject
{
    startVel
    manager
    constructor() {
        super(200,0);
        console.log("meteor")
    }
    onInitialize(_engine) {
        this.scale=new Vector(2.5,2.5)
        let RNG = new Random();
        super.onInitialize(_engine);
        this.graphics.use(Resources.meteor.toSprite())
        this.collider.set(Shape.Circle(16));
        let speed = RNG.floating(50,200)
        this.vel = new Vector(RNG.floating(-1,1),RNG.floating(-1,1)).normalize();
        this.vel.x *= speed;
        this.vel.y *= speed;
        this.startVel=speed;
        this.body.mass= 100
        this.body.bounciness=1;
        this.body.collisionType = CollisionType.Active;
        this.pos = new Vector(RNG.floating(-1,1),RNG.floating(-1,1)).normalize()
        this.pos.x*=500;
        this.pos.y*=500;

    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.vel=this.vel.normalize();
        this.vel.x*=this.startVel;
        this.vel.y*=this.startVel;
    }
}