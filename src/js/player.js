
import {Actor, Vector, Input, Shape, CollisionType,Color} from "excalibur";
import {Resources} from "./resources.js";
import {Tunnel} from "./tunnel.js";
import {MathFunctions} from "./MathFunctions.js";

export class player extends Actor
{
    game;

    speed=500

    layers=[];
    layerActors=[];

    startZ=32;

    segmentSpeed=25;

    movementArea;
    maxDistance=512+64;

    delta;
    constructor() {
        super()
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game=_engine;

        this.layers=[
            Resources.pl0,
            Resources.pl1,
            Resources.pl1,
            Resources.pl2,
            Resources.pl2,
            Resources.pl3,
            Resources.pl3,
            Resources.pl3,
            Resources.pl4,
            Resources.pl4,
            Resources.pl5,
            Resources.pl5,
            Resources.pl5,
            Resources.pl6,
            Resources.pl6,
        ]
        for(let i =0;i<this.layers.length;i++)
        {
            let layer = new Actor();
            layer.pos = new Vector(400,300)
            layer.z=this.startZ+i;
            let sprite = this.layers[i].toSprite();
            sprite.tint = Color.fromHSL(0,0,(i/this.layers.length)*0.3+0.3,1)
            layer.graphics.use(sprite);

            this.game.currentScene.add(layer);
            this.layerActors.push(layer);
        }

        //this.scale=new Vector(1.5,1.5)
        this.collider.set(Shape.Circle(16))
        this.body.collisionType = CollisionType.Active;
        this.movementArea=this.game.currentScene.bounds;
    }
    onPostUpdate(_engine, _delta) {
        this.delta=_delta/1000;
        if(Vector.distance(this.pos,this.movementArea.pos)>this.maxDistance)
        {
            this.gameOver();
        }
        //this.label.text=this.score.toString();
        super.onPostUpdate(_engine, _delta);
        let moveVel = this.input();
        moveVel.x *=this.speed;
        moveVel.y *=this.speed;

        let vel = new Vector(0,0);
        vel.x = MathFunctions.lerp(this.vel.x,moveVel.x,this.delta*this.segmentSpeed);
        vel.y = MathFunctions.lerp(this.vel.y,moveVel.y,this.delta*this.segmentSpeed);
        //this.layerActors[0].vel=vel;
        this.vel=vel;
        this.layerMove();
        //this.shooting()
    }
    layerMove()
    {
        let previous = this.pos;
        for(let i = 0;i<this.layers.length;i++)
        {
            let current = this.layerActors[i].pos;
            let nx = MathFunctions.lerp(current.x,previous.x,this.delta*this.segmentSpeed);
            let ny = MathFunctions.lerp(current.y,previous.y,this.delta*this.segmentSpeed);
            this.layerActors[i].pos = new Vector(nx,ny);
            previous=this.layerActors[i].pos;
        }
    }
    input()
    {
        let vel = new Vector(0,0);
        let pressing = false;
        if(this.game.input.keyboard.isHeld(Input.Keys.W))
        {
            vel.y=-1;
            pressing=true;
        }
        else if(this.game.input.keyboard.isHeld(Input.Keys.S))
        {
            vel.y=1;
            pressing=true
        }
        if(this.game.input.keyboard.isHeld(Input.Keys.D))
        {
            vel.x=1;
            pressing=true
        }
        else if(this.game.input.keyboard.isHeld(Input.Keys.A))
        {
            vel.x=-1;
            pressing=true
        }
        if(pressing)
        {
            vel=vel.normalize();
        }
        return vel
    }
    gameOver()
    {
        console.log("gameOver")
        this.game.score=Tunnel.score;
        this.game.goToScene("GameOver")
    }
    _prekill(_scene) {
        super._prekill(_scene);
        for(let i =0;i<this.layerActors.length;i++)
        {
            this.layerActors[i].kill();
        }
    }
}