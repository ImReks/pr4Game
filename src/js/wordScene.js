import {Scene, Actor, Vector, Label,FontUnit,Font,Color} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";
import {Tunnel} from "./tunnel.js";
import {HitBox} from "./HitBox.js";
import {UI} from "./UI.js";

export class WordScene extends Scene
{
    game
    scorelabel;
    bounds;
    tunnel;
    background;
    pl;
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game = _engine;
        console.log("wordScene")
        this.background = new Actor();
        this.background.pos= new Vector(Resources.background.width/2,Resources.background.height/2);
        this.background.graphics.use(Resources.background.toSprite());
        this.background.z=3;
        this.background.scale=new Vector(2,2)
        this.add(this.background)
        let ui = new UI();
        this.add(ui);


    }
    onActivate(_context) {
        super.onActivate(_context);
        if(this.tunnel != null)
        {
            this.tunnel.kill();
            this.bounds.kill();
            this.pl.kill();
        }
        Tunnel.score=0;
        this.tunnel = new Tunnel({x:400,y:300})
        this.tunnel.background=this.background;
        this.add(this.tunnel)
        this.bounds = new HitBox(this.tunnel)
         // this.camera.strategy.elasticToActor(this.bounds,0.75,0);
        this.add(this.bounds);
        this.pl = new player();
        this.pl.pos = new Vector(400,300)
        this.pl.movementArea=this.bound;
        this.camera.strategy.lockToActor(this.pl);
        this.add(this.pl);
        let ui = new UI();
        this.add(ui);
    }
}