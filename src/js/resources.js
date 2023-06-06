import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import  player from "../images/playerSpaceShip.png"
import  shoter from "../images/Shoter.png"
import  chaser from "../images/Chaser.png"
import  background from "../images/backGround.png"
import  meteor from "../images/meteor.png"
import bullet from "../images/BulletPlayer.png"
const Resources = {
    player : new ImageSource(player),
    shoter : new ImageSource(shoter),
    chaser : new ImageSource(chaser),
    background : new ImageSource(background),
    meteor: new ImageSource(meteor),
    bullet:new ImageSource(bullet)
}
const ResourceLoader = new Loader([Resources.player,Resources.shoter,Resources.chaser,Resources.background,Resources.meteor, Resources.bullet]);

export { Resources, ResourceLoader }