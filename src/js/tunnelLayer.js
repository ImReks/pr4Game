import {Actor, Vector, Color, Shape} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";

export class TunnelLayer extends Actor
{
    distance
    chance=0.95

    lum=0;
    alpha=0;
    radius=64;
    stone;
    stoneangle;
    stoneScale=0.2;
    constructor(distance) {
        super();
        this.distance=distance;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.stone !=null)
        {
            this.stone.z = this.z-1;
            let StoneSize = new Vector(this.scale.x,this.scale.y)
            StoneSize.x *=this.stoneScale;
            StoneSize.y *=this.stoneScale;
            this.stone.scale=StoneSize;

            if(this.distance<0.33)
            {
                this.stoneScale*=0.995;
                this.radius *= 1.005;
            }
            let dir = new Vector(Math.cos(this.stoneangle)*this.radius*this.scale.x,Math.sin(this.stoneangle)*this.radius*this.scale.y);
            this.stone.pos = new Vector(dir.x+this.pos.x,dir.y+this.pos.y);
            let sprite = Resources.stone.toSprite();
            sprite.tint = Color.fromHSL(0,0,this.lum,this.alpha);
            this.stone.graphics.use(sprite);
        }
    }

    Reshufle()
    {
        if(this.stone !=null)
        {
            this.stone.kill();
        }
        this.TryGenStone();
    }
    TryGenStone()
    {
        if(Math.random()>this.chance)
        {
            this.radius=64
            this.stoneScale=0.2
            this.stone=new Actor();
            this.stone.z = this.z-1;
            this.stone.graphics.use(Resources.stone.toSprite());
            //this.stone.scale=this.scale;
            this.stoneangle = Math.random()*2*Math.PI
            let dir = new Vector(Math.cos(this.stoneangle)*this.radius,Math.sin(this.stoneangle)*this.radius);
            this.stone.pos = new Vector(dir.x+this.pos.x,dir.y+this.pos.y);
            this.stone.rotation=this.stoneangle-0.5*Math.PI;
            this.scene.add(this.stone);
            this.stone.collider.set(Shape.Box(128,530))
            this.stone.on("precollision",event=>this.detectPlayer(event));
        }
    }
    detectPlayer(event)
    {
        if(this.distance<0.4 && this.distance>0.38) {
            if (event.other instanceof player) {
                event.other.gameOver();
            }
        }
    }
    _prekill(_scene) {
        super._prekill(_scene);
        if(this.stone !=null)
        {
            this.stone.kill();
        }
    }
}