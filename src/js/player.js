import {Actor,Vector,TileMap,Input} from "excalibur";
export class player extends Actor
{
    constructor(map) {
        super({x:300,y:300});
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
    }
    update(_engine, delta)
    {
        super.update(_engine, delta);
        this.vel = new Vector(0,0);
        if(_engine.input.keyboard.isHeld(Input.Keys.D))
        {
            this.vel.x=300;
        }
        else if(_engine.input.keyboard.isHeld(Input.Keys.A))
        {
            this.vel.x=-300
        }

        if(_engine.input.keyboard.isHeld(Input.Keys.W))
        {
            this.vel.y=-300;
        }
        else if(_engine.input.keyboard.isHeld(Input.Keys.S))
        {
            this.vel.y=300
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