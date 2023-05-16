import '../css/style.css'
import {
    Actor,
    Engine,
    IsometricMap,
    IsometricTile,
    Random,
    Vector,
    Color,
    Timer,
    IsometricEntityComponent, IsometricEntitySystem
} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import {levelChunk} from "./levelChunk.js";
import {player} from "./player.js";
import {Level} from "./Level.js";

export class Game extends Engine {

    constructor() {
        super({ width: (window.innerWidth-5), height: (window.innerHeight-5) })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame()
    {

       // let map = new levelChunk({pos:new Vector(0,0),rows:64,columns:64,tileHeight:32,tileWidth:64},Math.random()*1000,Math.random()*1000)
      //  this.add(map);
       // let map2 = new levelChunk({pos:new Vector(0,16*16),rows:16,columns:16,tileHeight:32,tileWidth:64})
      //  this.add(map2);
        let map = new Level({tileHeight:32,tileWidth:32,rows:128,columns:128},64)
        this.add(map);
        let playerObject = new player();
        playerObject.z =10000
        // playerObject.addComponent(IsometricEntityComponent,true);
        this.add(playerObject)
        this.currentScene.camera.strategy.lockToActor(playerObject);
        //this.debug=true;

    }

}

new Game()
