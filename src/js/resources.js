import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'
import fishImage from '../images/fish.png'
import forestTileset from "../images/forestTileset.png"
import  plant from "../images/plant.png"

const Resources = {
    Fish: new ImageSource(fishImage),
    forest: new ImageSource(forestTileset),
    plant: new ImageSource(plant)
}
const ResourceLoader = new Loader([Resources.Fish,Resources.forest,Resources.plant]);

export { Resources, ResourceLoader }