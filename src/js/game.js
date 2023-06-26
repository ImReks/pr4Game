import '../css/style.css'
import {
    Engine,
    Scene,
    Physics
} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
//import {MainMenuScene} from "./MainMenuScene.js"
import {WordScene} from "./wordScene.js"
import {MenuScene} from "./MenuScene.js";
import {GameOverScene} from "./GameOverScene.js";
export class Game extends Engine {
    score=0;
    constructor() {
        super({ width: (800), height: (600) })
        this.start(ResourceLoader).then(() => this.startGame())
    }
    startGame()
    {
      //  this.addScene("Menu",new MainMenuScene())
        this.addScene("Menu",new MenuScene())
        this.addScene("Word",new WordScene())
        this.addScene("GameOver",new GameOverScene())
        this.goToScene("Menu");
     //   this.showDebug(true);
        Physics.checkForFastBodies = true
    }

}

new Game()
