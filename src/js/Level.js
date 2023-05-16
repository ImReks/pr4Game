import {Tile, TileMap, SpriteSheet, Actor,Vector,Color} from "excalibur";
import {Resources} from "./resources.js";
import {Noise} from "./noise.js";

export class Level extends TileMap
{
    spriteSheet
    radius

    states

    xCoord=[5,7,8,5,8,4,6,6,7,4,3,4,5,4,6,3]
    yCoord=[16,15,15,15,16,20,16,15,16,16,20,15,17,17,17,16]
    xOffset;
    yOffset;

    constructor(options,radius)
    {
        super(options);
        this.radius = Math.min(radius,(options.rows-2));
        this.spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.forest,
            grid:
                {
                    spriteWidth:32,
                    spriteHeight:32,
                    rows:21,
                    columns:21
                }
        })
        this.states = [];
        this.xOffset = Math.random()*10000;
        this.yOffset= Math.random()*10000;
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.fillLevel()
    }
    fillLevel()
    {
        for(let x =0;x<this.rows+1;x++)
        {
            for(let y = 0;y<this.rows+1;y++)
            {
                let index = this.index(x,y,this.rows+1)
                let dx = x-this.rows/2
                let dy = y-this.columns/2
                let dist = dx*dx+dy*dy;
                let fall = 1-dist/(this.radius*this.radius);
                let value = Noise.pseudoRandomNoise((x+this.xOffset)/6,(y+this.yOffset)/6)*fall;
                //console.log(value)
                if(value>0.25) {
                    this.states[index]=false;
                }
                else
                {
                    this.states[index]=true
                }

            }
        }
        for(let x =0;x<this.rows;x++)
        {
            for(let y = 0;y<this.rows;y++)
            {
               // let index = index(x,y,this.rows+1)
                let tileIndex = this.index(x,y,this.rows)
                let tileCase = 0;
                tileCase += (this.states[this.index(x,y,this.rows+1)])? 0:1;
                tileCase += (this.states[this.index(x+1,y,this.rows+1)])? 0:2;
                tileCase += (this.states[this.index(x+1,y+1,this.rows+1)])? 0:4;
                tileCase += (this.states[this.index(x,y+1,this.rows+1)])? 0:8;
                let sprite=this.spriteSheet.getSprite(this.xCoord[tileCase],this.yCoord[tileCase]);
                //let bright = Noise.pseudoRandomNoise((x)/3,(y)/3);

                if(tileCase==15)
                {
                    let rng = Noise.randomNoise(x+this.xOffset,y+this.yOffset)
                    if(rng<0.25)
                    {
                        sprite=this.spriteSheet.getSprite(this.xCoord[15],this.yCoord[15]-1)
                       // sprite.tint = Color.fromHSL(0,0,0.5+bright*0.5);
                    }
                    else if(rng>0.9)
                    {
                        let plant = new Actor()
                        plant.pos = new Vector(32*x+16,32*y+16);
                        plant.graphics.use(Resources.plant.toSprite())
                        plant.z = 1000;
                        this.addChild(plant);
                    }
                }
             //   sprite.tint = Color.fromHSL(0,0,0.75+bright*0.25,1);
                this.tiles[tileIndex].addGraphic(sprite);
            }
        }
    }
    index(x,y,width)
    {
        return x+width*y;
    }

}