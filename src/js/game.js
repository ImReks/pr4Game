import '../css/style.css'
import {
    Engine,
    Scene,
    Physics
} from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
//import {MainMenuScene} from "./MainMenuScene.js"
import {WordScene} from "./wordScene.js"
export class Game extends Engine {

    constructor() {
        super({ width: (768), height: (620) })
        this.start(ResourceLoader).then(() => this.startGame())
    }
    startGame()
    {
      //  this.addScene("Menu",new MainMenuScene())
        this.addScene("Word",new WordScene())
        this.goToScene("Word")
       // this.showDebug(true);
        Physics.checkForFastBodies = true
    }

}

new Game()
