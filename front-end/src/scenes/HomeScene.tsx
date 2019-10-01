import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, } from 'react-native';
import {navigationOption} from '../component/NavBar';
import Text from '../core-ui/Text';
import EventCard from '../component/EventCard';
import StatusCard from '../component/StatusCard';
import TextIcon from '../component/TextIcon';
import ForumCard from '../component/ForumCard';
import { VerticalSpacer3, VerticalSpacer1 } from '../core-ui/Spacer';
import { k16 } from '../constants/dimens';
import {NavigationScreenProps} from 'react-navigation';

import PromotionCard from '../component/PromotionCard';

type Props = NavigationScreenProps;

type State = {};

export default class HomeScene extends Component<Props, State>{
    static navigationOptions= navigationOption("Home");
    private example=[
        {
            'imageURL':'https://facebook.github.io/react/logo-og.png',
            'eventTitle':"WORKSHOP",
            'title':"Jemur Keramik",
            'date':"23 Januari 2019",
            'price':"Rp 220.000",
            'key':0,
        },
    ]
    
    render() {
        var tes = this.example[0];
        tes.key = 1;
        this.example.push(tes);
        tes.key = 2;
        this.example.push(tes);
        tes.key = 3;
        this.example.push(tes);
        tes.key = 4;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        tes.key = 5;
        this.example.push(tes);
        
        return (
            <SafeAreaView style={styles.view}>
                <ScrollView style={styles.flex1} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                    <StatusCard 
                        levelAction={()=>{
                      
                        }}
                        membershipAction={()=>{
                            this.props.navigation.navigate('Upgrade')
                        }}
                    />
                    <VerticalSpacer3/>
                    <View style={styles.menu}>
                        <TextIcon name="forum" text="Forum"></TextIcon>
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
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            this.example.map((data)=>{
                                return (
                                    <EventCard 
                                    key={Math.random()}
                                    imageURL={'https://facebook.github.io/react/logo-og.png'}
                                    eventTitle="WORKSHOP"
                                    title="Jemur Keramik"
                                    date="23 Januari 2019"
                                    price="Rp 220.000"/>
                                )
                            })
                        }
                    </ScrollView>
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
  