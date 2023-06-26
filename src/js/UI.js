import {ScreenElement, Vector, Text, Font, FontUnit, Color, GraphicsGroup, Actor, Rectangle} from "excalibur";
import {Resources} from "./resources.js";
import {Tunnel} from "./tunnel.js";

export class UI extends ScreenElement {

    game
    scoreText
    constructor() {
        super({x: 0, y: 0})
    }

    onInitialize(engine) {
        this.z =10000
        this.scoreText = new Text({
            text: '0',
            font: new Font({
                unit: FontUnit.Px,
                family: 'PressStart',
                size: 60,
            }),
            color: Color.White
        })
        let group = new GraphicsGroup({
            members: [
                {
                    graphic: this.scoreText,
                    pos: new Vector(400, 64),
                },
            ],
        })
        this.graphics.use(group)
    }
    onPreUpdate(_engine, _delta) {
        super.onPreUpdate(_engine, _delta);
        this.scoreText.text=Tunnel.score.toString();
    }
}