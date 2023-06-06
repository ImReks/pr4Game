import {Scene, Actor, Vector, Label,FontUnit,Font,Color} from "excalibur";
import {Resources} from "./resources.js";
import {player} from "./player.js";
import {spawnMenager} from "./spawnMenager.js";
import {Meteor} from "./meteor.js";

export class WordScene extends Scene
{
    game
    scorelabel;
    onInitialize(_engine) {
        super.onInitialize(_engine);
        this.game = _engine;
        console.log("wordScene")
        let background = new Actor();
        background.pos= new Vector(Resources.background.width/2,Resources.background.height/2);
        background.graphics.use(Resources.background.toSprite());
        background.z=-1;
        this.add(background)
        let meteorSpawner = new spawnMenager(5,Meteor);
        this.add(meteorSpawner);
        this.add(new Meteor())

    }
    onActivate(_context) {
        super.onActivate(_context);
        let pl = new player();
        this.add(pl);
    }
}