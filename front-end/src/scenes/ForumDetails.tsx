import React, { Component } from 'react';
import { NavigationScreenProps } from "react-navigation";
import Text from "../core-ui/Text";
import { ForumSaga } from '../sagas/forumsSaga';
import { ForumData } from '../model/forum';
import { any } from 'prop-types';
import { View,StyleSheet } from 'react-native';
import { k8} from '../constants/dimens';
import Icon from '../core-ui/Icon';
import { VerticalSpacer2 } from '../core-ui/Spacer';
import CommentCard from '../component/commentCard';

type Props = NavigationScreenProps;

export default class ForumDetails extends Component{
    forumSaga: ForumSaga = new ForumSaga
    props!: Props;
    state={
        error: null,
        data: any,
    }

    async componentDidMount(){
        this.setState(await this.forumSaga.doGetForumDetails('2'))
    } 
    
    render() {
        if(this.state.data == null) return ( <Text>Loading..</Text>)
        else if(this.state.error) return (<Text>Error</Text>)
        else {
            var f: ForumData = this.state.data;
            return (
                <View style={styles.container}>
                    <Text type="headline" >{f.forum_name}</Text>
                    <Text type="body" >{f.description}</Text>
                    <View style={styles.row}>
                        <View style={{flex: 1}}>
                            <Icon name="report"></Icon>
                            <Text type="body">{f.likes}</Text>
                        </View>
                        <View style={{flexDirection: 'row',}}>
                            <Icon name="share"></Icon>
                            <Icon name="report"></Icon>
                        </View>
                    </View>
                    <VerticalSpacer2></VerticalSpacer2>
                    <Text type="subheading">Komen Terbaru</Text>
                    <CommentCard></CommentCard>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        padding: k8, 
    },
    row:{
        flex: 1,
        flexDirection: "row"
    }
})