import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Text from '../core-ui/Text';
import { HorizontalSpacer2, VerticalSpacer1, VerticalSpacer3 } from '../core-ui/Spacer';

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
                <View>
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
                <HorizontalSpacer2></HorizontalSpacer2>
                <View style={{alignSelf: "center"}}>
                    <Text type="headline">Nama</Text>
                    <Text type="subheading">Gelar</Text>
                </View>
            </View>
            <VerticalSpacer1></VerticalSpacer1>
            <View>
                <Text color="gray3">Date</Text>
                <Text>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc</Text>
            </View>
            <VerticalSpacer3></VerticalSpacer3>
        </View>
    )
}


const styles = StyleSheet.create({
    row:{
        flex: 1,
        flexDirection: 'row',
    },
})