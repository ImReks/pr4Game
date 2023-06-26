import {Actor, Color, Font, FontUnit, GraphicsGroup, Input, Scene, ScreenElement, Text, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Tunnel} from "./tunnel.js";
import {HitBox} from "./HitBox.js";

export class MenuScene extends Scene
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
        let titleText = new Text({
            text: 'Fish Tunnel',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color: Color.White
        })
        let startText = new Text({
            text: 'Press Space to start',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color: Color.White
        })



        const group = new GraphicsGroup({members:[
                {
                    graphic:titleText,
                    pos:new Vector(200,200),
                },
                {
                    graphic:startText,
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