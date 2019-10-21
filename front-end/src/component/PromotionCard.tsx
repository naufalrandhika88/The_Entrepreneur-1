import React from 'react'
import {StyleProp,StyleSheet, ImageStyle} from 'react-native'
import {Image as Picture} from 'react-native';
import { screenWidth, k16 } from '../constants/dimens';

type Props={
    imgUrl?: String;
    newStyle?: StyleProp<ImageStyle>;
};

export default function PromotionCard(props: Props){
    let {newStyle, imgUrl} = props;
    return(
        <Picture
        source={ imgUrl == null ? require('../../assets/images/placeholder.png') : {uri: imgUrl}}
        style={[styles.promotion, newStyle]}
        resizeMode={'cover'}/>
    );
}

const styles= StyleSheet.create({
    promotion:{
        height:100,
        width: screenWidth - k16*2  
    },
})