import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { screenHeight, k8, k24, k16 } from '../constants/dimens';
import { ScrollView } from 'react-native-gesture-handler';
import { GRAY5 } from '../constants/color';
import Text from '../core-ui/Text'
import { VerticalSpacer2, VerticalSpacer1, HorizontalSpacer1 } from '../core-ui/Spacer';
import Icon from '../core-ui/Icon';
import Button from '../core-ui/Button';
import { navigationOption } from '../component/NavBar';

export default class EventDetailsScene extends Component{
    static navigationOptions = navigationOption('Forum Details')
    state = {
        person: 1
    };

    addPerson=()=>{
        this.setState({
            person: this.state.person+=1
        })
    }

    subtractPerson=()=>{
        if(this.state.person > 1){
            this.setState({
                person: this.state.person-=1
            })
        }
    }

    render(){
        return (<ScrollView>
            <View>
                <Slideshow 
                    height={screenHeight/3}
                    dataSource={[
                        { url:'http://placeimg.com/640/480/any' },
                        { url:'http://placeimg.com/640/480/any' },
                        { url:'http://placeimg.com/640/480/any' }
                    ]}/>
            </View>
            <View style={styles.titleContent}>
                <Text type="headline" color="white">Talkshow Menjadi Orang Miskin</Text>
                <VerticalSpacer1></VerticalSpacer1>
                <Text type="subheading" color="white">23 September 2019</Text>
                <VerticalSpacer1></VerticalSpacer1>
                <Text type="subheading" color="white">Hotel Santika</Text>
                <VerticalSpacer1></VerticalSpacer1>
                <Text type="subheading" color="yellow">Rp 220.000</Text>
                <VerticalSpacer1></VerticalSpacer1>
            </View>
            <View style={styles.content}>
                <Text type="subheading">Include:</Text>
                <Text type="body">- Seminar Kit</Text>
                <Text type="body">- Lunch</Text>
                <Text type="body">- Networking</Text>
                <VerticalSpacer2></VerticalSpacer2>
                <Text type="subheading">Buy Ticket:</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{flex: 1}} type="body">Regular class</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon onPress={this.addPerson} customStyle={{height: k24}} name="add"></Icon>
                        <HorizontalSpacer1></HorizontalSpacer1>
                        <Text type="headline">{this.state.person}</Text>
                        <HorizontalSpacer1></HorizontalSpacer1>
                        <Icon onPress={this.subtractPerson} customStyle={{height: k24}} name="minus"></Icon>
                    </View>
                </View>
            </View>
            <Button buttonType="yellow" onPress={()=>{}}text="Reserve Now"></Button>
        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    titleContent:{
        padding: k16,
        backgroundColor: GRAY5,
    },
    content:{
        padding: k16,
    }
})