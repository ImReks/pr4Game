import {killableObject} from "./killableObject.js";
import {Vector,Actor,Physics,Input} from "excalibur";

export class spaceShip extends killableObject
{
    constructor(health,regen,projectile) {
        super(health,regen);
    }
}