import React from 'react';
import {StyleSheet, View } from 'react-native';
import { k8, k16, k24, k32 } from '../constants/dimens';

export function HorizontalSpacer1() {
    return(
        <View style={styles.hs1}></View>
    );
}

export function HorizontalSpacer2() {
    return(
        <View style={styles.hs2}></View>
    );
}

export function HorizontalSpacer3() {
    return(
        <View style={styles.hs3}></View>
    );
}

export function HorizontalSpacer4() {
    return(
        <View style={styles.hs4}></View>
    );
}

export function VerticalSpacer1() {
    return(
        <View style={styles.vs1}></View>
    );
}

export function VerticalSpacer2() {
    return(
        <View style={styles.vs2}></View>
    );
}

export function VerticalSpacer3() {
    return(
        <View style={styles.vs3}></View>
    );
}

export function VerticalSpacer4() {
    return(
        <View style={styles.vs4}></View>
    );
}

const styles = StyleSheet.create({
    hs1:{
        width:k8,
    },
    hs2:{
        width:k16,
    },
    hs3:{
        width:k24,
    },
    hs4: {
        width:k32,
    },
    vs1: {
        height: k8,
      },
    vs2: {
        height: k16,
    },
    vs3: {
        height: k24,
    },
    vs4: {
        height: k32,
    },
  });
  