import {spaceShip} from "./spaceShip.js";
import {Actor, Vector, Input, Shape, CollisionType} from "excalibur";
import {Resources} from "./resources.js";
import {bullet} from "./bullet.js";

export class player extends spaceShip
{
    game;
    angle;

    reload;

    score;
    label;
    lastVel;
    constructor() {
        super(1,1);
this.score=0;
this.reload=0;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game=_engine;
        this.pos = new Vector(768/2,620/2)
        this.scale=new Vector(1.5,1.5)
        this.graphics.use(Resources.player.toSprite())
        this.collider.set(Shape.Circle(16))
        this.body.mass= 2.5

        this.body.collisionType = CollisionType.Active;

    }
    onPostUpdate(_engine, _delta) {
        console.log(this.score);
        //this.label.text=this.score.toString();
        super.onPostUpdate(_engine, _delta);
        let vel = new Vector(0,0);
        let pressing = false;
        if(_engine.input.keyboard.isHeld(Input.Keys.W))
        {
            vel.y=-1;
            pressing=true;
        }
        else if(_engine.input.keyboard.isHeld(Input.Keys.S))
        {
            vel.y=1;
            pressing=true
        }
        if(_engine.input.keyboard.isHeld(Input.Keys.D))
        {
            vel.x=1;
            pressing=true
        }
        else if(_engine.input.keyboard.isHeld(Input.Keys.A))
        {
            vel.x=-1;
            pressing=true
        }
        if(pressing)
        {
            vel=vel.normalize();
            vel.x *=500;
            vel.y*=500;
            this.angle=vel.toAngle();
            this.lastVel = vel;
        }
        this.vel=vel;
        this.rotation=this.angle;
        this.shooting()
    }
    shooting()
    {
        this.reload--;
        if(this.game.input.keyboard.isHeld(Input.Keys.Space) && this.reload<0)
        {
            this.reload=90;
            let bvel = this.lastVel.normalize();
            let bpos = this.pos;
            bvel.x*=700;
            bvel.y*=700;


            let pbullet = new bullet(50,bpos,bvel);
            pbullet.rotation=this.angle;
            pbullet.owner=this;
            this.scene.add(pbullet);
        }
    }
}