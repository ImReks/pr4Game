import {Actor, Color, Font, FontUnit, GraphicsGroup, Scene, ScreenElement, Text, Vector,Input} from "excalibur";
import {Tunnel} from "./tunnel.js";
import {HitBox} from "./HitBox.js";
import {Resources} from "./resources.js";

export class GameOverScene extends Scene
{
    game
    gameOverUi
    constructor() {
        super();
    }
    onInitialize(_engine) {
        super.onInitialize(_engine);
        let background = new Actor();
        background.pos= new Vector(Resources.background.width/2,Resources.background.height/2);
        background.graphics.use(Resources.background.toSprite());
        background.z=3;
        background.scale=new Vector(2,2)

        let tunnel = new Tunnel();
        tunnel.background=background;
        this.add(tunnel);
        let bounds = new HitBox(tunnel);
        this.add(bounds);
        this.camera.strategy.elasticToActor(bounds,0.5,0);
        this.game=_engine
        this.gameOverUi = new ScreenElement();
        let scoreText = new Text({
            text: '0',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color: Color.White
        })
        scoreText.text = `your score: ${this.game.score}`;

        let restartText = new Text({
            text: 'Press Space to try again',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color: Color.White
        })



        const group = new GraphicsGroup({members:[
                {
                    graphic:scoreText,
                    pos:new Vector(200,200),
                },
                {
                    graphic:restartText,
                    pos:new Vector(100,300),
                },
            ]})
        this.gameOverUi.z = 1000;
        this.gameOverUi.graphics.use(group)
        this.add(this.gameOverUi);
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        if(this.game.input.keyboard.isHeld(Input.Keys.Space))
        {
            console.log("Restarting");
            this.restart()
        }
    }

    restart()
    {
        this.game.goToScene("Word");
    }
}