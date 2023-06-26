import {Actor, Circle, CollisionType, Raster, Shape, Vector,Color} from "excalibur";
import {Resources} from "./resources.js";
import {MathFunctions} from "./MathFunctions.js";

export class HitBox extends Actor
{
    tunnel
    followIndex=10;
    minDistance=0.33;

    game
    constructor(tunnel) {
        super();
        this.tunnel=tunnel;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game=_engine;
        this.pos=this.tunnel.layerActors[this.followIndex].pos;
        //this.collider.set(Shape.Circle(512))
      //  this.body.collisionType = CollisionType.Passive;
        //let sprite =Resources.tunnel.toSprite();
       // sprite.tint = Color.fromHSL(1,1,0.5,1);
        //this.graphics.use(sprite);
     //   let size = this.lerp(10,0,this.minDistance)
       // this.scale= new Vector(size,size);
       // this.z = 32+16+1
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.tunnel.layerDistances[this.followIndex]<this.minDistance)
        {
            this.followIndex = (this.followIndex+1)%this.tunnel.layers;
        }
        let targetpos = this.tunnel.layerActors[this.followIndex].pos;
        let pos = this.pos;
        pos.x = MathFunctions.lerp(this.pos.x,targetpos.x,(_delta/1000)*10);
        pos.y = MathFunctions.lerp(this.pos.y,targetpos.y,(_delta/1000)*10);
        this.pos = targetpos;
       // this.tunnel.layerActors[this.followIndex].graphic.use(Resources.tunnel.toSprite());

    }
}