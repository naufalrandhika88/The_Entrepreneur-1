import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Text from '../core-ui/Text';

type Props = {
    imgSrc?: string;
    giveLikes?: () => void;
    share?: (text: string) => void;
    report?: (text: string) => void;
  };

export default function CommentCard(props: Props) {
    let {imgSrc, giveLikes, share, report} = props;

    return(
        <View>
            <View style={styles.row}>
                <View style={{}}>
                {
                    imgSrc ? 
                    <Avatar
                    size="medium"
                    rounded
                    source={{
                        uri: imgSrc,
                    }}
                    />:
                    <Avatar          
                    size="medium"
                    rounded icon={{ name: 'home' }} />
                }
                </View>
                <View style={{flex: 1}}>
                    <Text>Tes</Text>
                    <Text>Tes2</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    row:{
        flex: 1,
        flexDirection: 'row',
    }
})