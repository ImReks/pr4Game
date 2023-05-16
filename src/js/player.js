import {Actor, Vector, TileMap, Input, Circle, CircleCollider, Shape, CollisionType} from "excalibur";
import {Resources} from "./resources.js";
export class player extends Actor
{
    constructor(x,y) {
        super({pos:new Vector(1500,1500),collisionType: CollisionType.Active});
        this.graphics.use(Resources.Fish.toSprite())
        this.z = 1000
        this.scale.x = 0.5
        this.scale.y = 0.5
        let circle = Shape.Circle(32)
        this.collider.set(circle);

    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
       // this.graphics.use(Resources.Fish.toSprite())
       //

    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.vel = new Vector(0,0);
        if(_engine.input.keyboard.isHeld(Input.Keys.D))
        {
            this.vel.x=150;
        }
        else if(_engine.input.keyboard.isHeld(Input.Keys.A))
        {
            this.vel.x=-150
        }

        if(_engine.input.keyboard.isHeld(Input.Keys.W))
        {
            this.vel.y=-150;
        }
        else if(_engine.input.keyboard.isHeld(Input.Keys.S))
        {
            this.vel.y=150
        }
      //  this.logger.info(`${this.vel.x},${this.vel.y}`)
    }
    moveInput(engine)
    {
        let moveVector = new Vector(0,0);
        if(engine.input.keyboard.isHeld(Input.Keys.D))
        {
            moveVector.x=1;
        }
        else if(engine.input.keyboard.isHeld(Input.Keys.A))
        {
            moveVector.x=-1
        }

        if(engine.input.keyboard.isHeld(Input.Keys.W))
        {
            moveVector.y=-1;
        }
        else if(engine.input.keyboard.isHeld(Input.Keys.S))
        {
            moveVector.y=1
        }
        return moveVector
    }
}