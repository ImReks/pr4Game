import { ImageSource, Sound, Resource, Loader, SpriteSheet } from 'excalibur'
import fishImage from '../images/fish.png'
import tileImage from "../images/Square.png"
import isoTile from "../images/IsoTile.png"
import isoTile2 from "../images/IsoTileGray.png"
import tree from "../images/tree.png"
import water from "../images/IsoTileWater.png"
import forestTileset from "../images/forestTileset.png"
import  plant from "../images/plant.png"

const Resources = {
    Fish: new ImageSource(fishImage),
    Tile: new ImageSource(tileImage),
    IsoTile: new ImageSource(isoTile),
    IsoTile2:new ImageSource(isoTile2),
    tree:new ImageSource(tree),
    water:new ImageSource(water),
    forest: new ImageSource(forestTileset),
    plant: new ImageSource(plant)
}
const ResourceLoader = new Loader([Resources.Fish,Resources.Tile,Resources.IsoTile,Resources.IsoTile2,Resources.tree,Resources.water,Resources.forest,Resources.plant]);

export { Resources, ResourceLoader }