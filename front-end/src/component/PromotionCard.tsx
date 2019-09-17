import React, {StyleProp, ImageStyle} from 'react-native'
import {Image as Picture} from 'react-native';

type Props={
    style: StyleProp<ImageStyle>
};

export default function PromotionCard(props: Props){
    let {style} = props;
    return(
        <Picture
        source={require('../../assets/images/placeholder.png')}
        style={style}
        resizeMode={'cover'}/>
    );
}