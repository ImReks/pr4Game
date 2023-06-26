import {Actor, Vector, Color, clamp, Sprite} from "excalibur";
import {Resources} from "./resources.js";
import {TunnelLayer} from "./tunnelLayer.js";
import {MathFunctions} from "./MathFunctions.js";

export class Tunnel extends Actor
{
    game;

    static score=0;
    background;
    angle=0;
    rotAngle=0;
    layers=64;
    speed = 0.25;

    minScale = 0.0
    maxScale = 10
    layerActors=[];
    layerDistances=[];

    tint = 0.125;

    parity=0;
    pattern=[];
    lastPos=new Vector(400,300);
    constructor(data) {
        super(data);
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game=_engine;
        for(let i = 0;i<this.layers;i++)
        {
            let startDistance=i/this.layers;
            let layerActor = new TunnelLayer(startDistance);
            layerActor.pos=this.pos;
            layerActor.z = this.layers-i;

           // console.log(startDistance)
            let sprite = Resources.tunnel.toSprite();
            sprite.tint = Color.fromHSL(0.5,0.75,(1-startDistance)*0.9,1);
            layerActor.graphics.use(sprite);
            layerActor.scale = this.rescale(startDistance);
         //   layerActor.rotation=i*0.224399475;
            this.game.currentScene.add(layerActor);
            this.layerActors.push(layerActor);
            this.layerDistances.push(startDistance);
           // console.log(layerActor.scale)
        }
        //console.log(this.layerActors);
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        for(let i = 0;i<this.layers;i++)
        {
            this.layerDistances[i]-=(_delta/1000)*this.speed;
            if(this.layerDistances[i]<0)
            {
                Tunnel.score++;
             //   this.maxScale = clamp(this.maxScale+(Math.random()*2-1)*0.25,3,7.5);
                this.angle+= (Math.random()*2-1) *(_delta/1000)*50;
               // this.rotAngle+=Math.PI/14;
                this.tint= (this.tint+(_delta/1000)*0.025)%0.5;
                this.pattern = (this.pattern+1)%2;
                if(this.angle>Math.PI*2)
                {
                    this.angle=0;
                }
                this.layerDistances[i]=1
                let moveAmount = (_delta/1000)*800
                this.layerActors[i].pos = new Vector(Math.cos(this.angle)*moveAmount+this.lastPos.x,Math.sin(this.angle)*moveAmount+this.lastPos.y);
                let dir = new Vector(this.layerActors[i].pos.x-this.lastPos.x,this.layerActors[i].pos.y-this.lastPos.y).normalize();
                this.rotation = dir.toAngle();
                this.lastPos=this.layerActors[i].pos;
                this.background.pos = this.lastPos;
                this.layerActors[i].distance = this.layerDistances[i];
                this.layerActors[i].Reshufle();
            }
            this.layerActors[i].scale=this.rescale(this.layerDistances[i]);
            this.layerActors[i].z = Math.ceil((1-this.layerDistances[i])*this.layers);
            let sprite = Resources.tunnel.toSprite();;
         //   sprite = sprite.clone();
            let lum = MathFunctions.falloff2(1-this.layerDistances[i]);
            let alpha = MathFunctions.falloff(1-this.layerDistances[i])
            sprite.tint = Color.fromHSL(0.5,0.33,lum,alpha);
                this.layerActors[i].graphics.use(sprite);
                this.layerActors[i].lum=lum;
                this.layerActors[i].alpha=alpha;
            this.layerActors[i].distance = this.layerDistances[i];
           // this.layerActors[i].rotation = this.layerDistances[i]*2*Math.PI;
        }
    }

    rescale(distance)
    {
        let factor = MathFunctions.lerp(this.maxScale,this.minScale,distance);
      //  console.log(factor);
        return new Vector(factor,factor);
    }
    _prekill(_scene) {
        super._prekill(_scene)
        for(let i =0;i<this.layerActors.length;i++)
        {
            this.layerActors[i].kill();
        }
    }
}