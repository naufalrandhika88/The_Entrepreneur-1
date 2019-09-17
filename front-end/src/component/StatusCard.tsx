import React from 'react';
import { StyleSheet,  View, TouchableOpacity, } from 'react-native';
import Texts from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { GRAY } from '../constants/color';

type Props={

}
export default function StatusCard(props: Props){
    return(
        <View style={styles.view}>
            <TouchableOpacity style={styles.maxWidth} onPress={()=>{}}>
                <View style={styles.segment} >
                    <Icon name="level"/>
                    <View style={styles.segmentContent}>
                        <Texts type="body" children="ENTREPRENEUR"/>
                        <Texts type="subheading" color="brown" children="Learning"/>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{borderLeftWidth: 1, borderColor: GRAY}}></View>
            <TouchableOpacity style={styles.maxWidth} onPress={()=>{}}>
                <View style={styles.segment} >
                    <Icon name="membership"/>
                    <View style={styles.segmentContent}>
                        <Texts type="body" children="Basic"/>
                        <Texts color="yellow" type="subheading" children="UPRGADE"/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    left:{
        justifyContent:"flex-start"
    },
    view:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: GRAY,
        borderRadius: 4,
    },
    maxWidth:{
        flex:1,
    },
    segment:{
        flexDirection: 'row',
        padding:16,
        flex:1,
    },
    segmentContent:{
        flexDirection: 'column',
    }
})