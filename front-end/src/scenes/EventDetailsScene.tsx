import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { screenHeight, k8, k24, k16 } from '../constants/dimens';
import { ScrollView } from 'react-native-gesture-handler';
import { GRAY5, headerBarColor } from '../constants/color';
import Text from '../core-ui/Text'
import { VerticalSpacer2, VerticalSpacer1, HorizontalSpacer1 } from '../core-ui/Spacer';
import Icon from '../core-ui/Icon';
import Button from '../core-ui/Button';
import { NavigationScreenProps } from 'react-navigation';
import {Event} from '../model/event';
import { EventsSaga } from '../sagas/eventsSaga';

type Props = NavigationScreenProps

export default class EventDetailsScene extends Component<Props>{
    props!: Props;
    eventSaga: EventsSaga = new EventsSaga()

    static navigationOptions = {
        title: "Forum Details",
        headerStyle: {
            backgroundColor: headerBarColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight:(
              <View style={{paddingRight: 16}}>
                  <Icon name="qr"/>
              </View>
          )
    };

    state = {
        person: 1,
        error: false,
        data: null,
    };

    orderTicket=async ()=>{
        var data: Event = this.state.data
        var res = await this.eventSaga.orderTicket(
            data.id,
            this.state.person,
            this.state.person*data.price
        )
        if(!res.error){
            alert("Order success!")
            this.componentWillMount()
        }else{
            alert("Order fails, please try again!")
        }
    }

    addPerson=()=>{
        var data: Event = this.state.data
        if(this.state.person < data.available_seat)
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

    componentWillMount=async ()=>{
        this.setState(
            await this.eventSaga.getEventDetails(
                this.props.navigation.getParam("id")
            )
        )
    }

    render(){
        if(!this.state.error){
            if(this.state.data == null){
                return (<ActivityIndicator style={styles.fullScreen} size="large" color={headerBarColor} />)
            }else{
                var data: Event = this.state.data
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
                        <Text type="headline" color="white">{data.event_name}</Text>
                        <VerticalSpacer1></VerticalSpacer1>
                        <Text type="subheading" color="white">{data.event_date}</Text>
                        <VerticalSpacer1></VerticalSpacer1>
                        <Text type="subheading" color="white">{data.place}</Text>
                        <VerticalSpacer1></VerticalSpacer1>
                        <Text type="subheading" color="yellow">Rp{data.price}</Text>
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
                    <Button buttonType="yellow" onPress={this.orderTicket}text="Reserve Now"></Button>
                </ScrollView>)
            }
        }else{
            return (<Text style={styles.fullScreen} color="red">Unable to load</Text>)
        }
    }
}

const styles = StyleSheet.create({
    titleContent:{
        padding: k16,
        backgroundColor: GRAY5,
    },
    content:{
        padding: k16,
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
})