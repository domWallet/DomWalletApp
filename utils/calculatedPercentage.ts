import {globalDesign} from "@/styles/global";
import { Dimensions } from 'react-native';

const calculateWidth = (width: number)=> {
    const deviceWidth = Dimensions.get('window').width
    let per = (width / globalDesign.defaultWidth)
    return deviceWidth * per
}

const calculateHeight = (height: number) => {
    const deviceHeight = Dimensions.get('window').height
    let per = (height / globalDesign.defaultHeight)
    return deviceHeight * per
}

export { calculateWidth, calculateHeight }
