import React from 'react';
import { StyleSheet,  View, TouchableOpacity, } from 'react-native';
import Text from '../core-ui/Text';
import Icon from '../core-ui/Icon';
import { GRAY } from '../constants/color';

type Props={
    levelAction: ()=>void;
    membershipAction: ()=>void;
}
export default function StatusCard(props: Props){
    let {levelAction, membershipAction} = props;

    return(
        <View style={styles.view}>
            <TouchableOpacity style={styles.maxWidth} onPress={levelAction}>
                <View style={styles.segment} >
                    <Icon name="level"/>
                    <View style={styles.segmentContent}>
                        <Text type="body" children="ENTREPRENEUR"/>
                        <Text type="subheading" color="brown" children="Learning"/>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{borderLeftWidth: 1, borderColor: GRAY}}></View>
            <TouchableOpacity style={styles.maxWidth} onPress={membershipAction}>
                <View style={styles.segment} >
                    <Icon name="membership"/>
                    <View style={styles.segmentContent}>
                        <Text type="body" children="Basic"/>
                        <Text color="yellow" type="subheading" children="UPRGADE"/>
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