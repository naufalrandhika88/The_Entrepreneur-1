import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, } from 'react-native';
import {navigationOption} from '../component/NavBar';
import Texts from '../core-ui/Text';
import EventCard from '../component/EventCard';
import StatusCard from '../component/StatusCard';


type Props = {};
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

        return (
            <SafeAreaView style={styles.view}>
                <ScrollView style={styles.flex1} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                    <StatusCard/>
                    <View style={styles.spacing2}></View>
                    <Texts type="headline" children="Event Terdekat"></Texts>
                    <View style={styles.spacing2}></View>
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
    scrollContainer: {
        padding:16,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
    },
    spacing1: {
        height: 4,
      },
    spacing2: {
        height: 8,
    },
    spacing3: {
        height: 16,
    },
  });
  