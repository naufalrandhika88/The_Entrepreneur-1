import React, { Component } from 'react';

import { StyleSheet, ScrollView, SafeAreaView, View, ActivityIndicator, } from 'react-native';
import {navigationOption} from '../component/NavBar';
import Text from '../core-ui/Text';

import EventCard from '../component/EventCard';
import StatusCard from '../component/StatusCard';
import TextIcon from '../component/TextIcon';
import { VerticalSpacer3, VerticalSpacer1 } from '../core-ui/Spacer';
import { k16 } from '../constants/dimens';
import {NavigationScreenProps} from 'react-navigation';
import {Event} from '../model/event'


import PromotionCard from '../component/PromotionCard';
import { HomeSaga } from '../sagas/homeSaga';
import { headerBarColor } from '../constants/color';
import { any } from 'prop-types';
import { SessionSaga } from '../sagas/sessionSaga';

type Props = NavigationScreenProps;

export default class HomeScene extends Component<Props>{
    static navigationOptions = navigationOption('Home');

    sessionSaga: SessionSaga = new SessionSaga

    homeSaga: HomeSaga = new HomeSaga

    state={
        error: false,
        data: [],
        user: any
    }

    componentWillMount=async ()=>{
        this.setState(
            await this.homeSaga.doGetHomeData()
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.view}>
                <ScrollView style={styles.flex1} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                    <StatusCard 
                        user={this.state.user}
                        levelAction={()=>{
                      
                        }}
                        membershipAction={()=>{
                            this.props.navigation.navigate('Upgrade')
                        }}
                    />
                    <VerticalSpacer3/>
                    <View style={styles.menu}>
                        <TextIcon name="forum" text="Forum"
                            onPress={()=>{
                                this.props.navigation.navigate('Forums')
                            }}
                        ></TextIcon>
                        <TextIcon name="mainEvent" text="Events"></TextIcon>
                        <TextIcon name="course" text="Courses"></TextIcon>
                        <TextIcon name="cart" text="Market"></TextIcon>
                    </View>
                    <VerticalSpacer3/>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <PromotionCard/>
                        <PromotionCard/>
                    </ScrollView>
                    <VerticalSpacer3/>
                    <Text type="headline">Event Terdekat</Text>
                    <VerticalSpacer1/>
                    { !this.state.error ?
                        this.state.data.length == 0 ?<ActivityIndicator style={{
                            alignSelf: "stretch"
                        }}
                        size="large" color={headerBarColor} ></ActivityIndicator>:
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                this.state.data.map((data: Event)=>{
                                    return (
                                        <EventCard 
                                        data={data}
                                        onClick={()=>
                                            this.props.navigation.navigate("EventDetails",{
                                                id: data.id
                                            })
                                        }
                                        key={Math.random()}>
                                        </EventCard>
                                    )
                                })
                            }
                        </ScrollView>
                        : <Text color="red">Unable to load</Text>
                    }
                    
                    {/*
                    <VerticalSpacer3/>
                    <Text type="headline">Trending Forum</Text>
                    <VerticalSpacer3/>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {
                            this.example.map((data)=>{
                                return (
                                    <ForumCard 
                                    key={Math.random()}
                                    forumTitle="WORKSHOP"
                                    nameAuthor="Jemur Keramik"
                                    comment={data.eventTitle}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                    */}

                </ScrollView>
            </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
    },
    flex1:{
        flex: 1,
    },
    menu:{
        flexDirection: "row",
    },
    scrollContainer: {
        padding:k16,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
    },
  });
