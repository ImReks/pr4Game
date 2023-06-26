import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import  background from "../images/backGround.png"
import tunnel from "../images/TubeTexture.png"
import tunnelDark from "../images/TubeTextureDark.png"
import border from "../images/ViewBorder.png"
import pl0 from  "../images/playerL0.png"
import pl1 from  "../images/playerL1.png"
import pl2 from  "../images/playerL2.png"
import pl3 from  "../images/playerL3.png"
import pl4 from  "../images/playerL4.png"
import pl5 from  "../images/playerL5.png"
import pl6 from  "../images/playerL6.png"
import stone from "../images/rock.png"
const Resources = {
    background : new ImageSource(background),
    tunnel:new ImageSource(tunnel),
    tunnel2:new ImageSource(tunnelDark),
    border:new ImageSource(border),
    pl0:new ImageSource(pl0),
    pl1:new ImageSource(pl1),
    pl2:new ImageSource(pl2),
    pl3:new ImageSource(pl3),
    pl4:new ImageSource(pl4),
    pl5:new ImageSource(pl5),
    pl6:new ImageSource(pl6),
    stone:new ImageSource(stone)
}
const resourceArray = []
for (const key in Resources) {
    resourceArray.push(Resources[key])
}
const ResourceLoader = new Loader(resourceArray)

export { Resources, ResourceLoader }