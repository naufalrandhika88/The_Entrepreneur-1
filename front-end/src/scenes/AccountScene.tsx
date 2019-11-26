import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { navigationOption } from '../component/NavBar';
import { k8 } from '../constants/dimens';
import { Avatar } from 'react-native-elements';
import Text from '../core-ui/Text';
import { HorizontalSpacer1, HorizontalSpacer3, VerticalSpacer1, HorizontalSpacer2, VerticalSpacer2 } from '../core-ui/Spacer';
import { NavigationScreenProps, NavigationActions, StackActions } from 'react-navigation';

type Props = NavigationScreenProps;
type State = {};

export default class AccountScene extends Component<Props, State>{
    static navigationOptions= navigationOption("Account");
    props!: Props;
    onLogout=()=>{
        const resetAction = StackActions.reset({
            index: 0, 
            key: null,
            actions: [
                 NavigationActions.navigate({ routeName: 'Welcome' })
            ],
       });
       this.props.navigation.dispatch(resetAction);
    }
      
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.avatar}>
                    <Avatar containerStyle={styles.avatar_picture} rounded size="large" ></Avatar>
                    <HorizontalSpacer1></HorizontalSpacer1>
                    <View style={{flexDirection: "column"}}>
                        <Text type="headline">Lia Eden</Text>
                        <VerticalSpacer1></VerticalSpacer1>
                        <View style={{flexDirection: "row", alignContent:"space-between"}}>
                            <View style={{flexDirection: "column"}}>
                                <Text type="body" color="gray4">Entrepreneur</Text>
                                <Text type="body" color="brown">Learning</Text>
                            </View>
                            <HorizontalSpacer3></HorizontalSpacer3>
                            <View style={{flexDirection: "column"}}>
                                <Text type="body" color="gray4">Membership</Text>
                                <Text type="body" color="yellow">Premium</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{padding: k8}}>
                    <VerticalSpacer2></VerticalSpacer2>
                    <View style={styles.line}></View>
                    <VerticalSpacer1></VerticalSpacer1>
                    <Text type="subheading">Edit Profile</Text>
                    <VerticalSpacer1></VerticalSpacer1>
                    <Text type="subheading">Terms of Service</Text>
                    <VerticalSpacer1></VerticalSpacer1>
                    <Text type="subheading">Privacy Policy</Text>
                    <VerticalSpacer1></VerticalSpacer1>
                    <Text type="subheading" color="red" onPress={this.onLogout}>Logout</Text>
                    <VerticalSpacer1></VerticalSpacer1>
                </View>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
        padding: k8,
    },
    avatar:{
        flexDirection: "row",
    },
    avatar_picture:{
        padding: k8,
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        opacity: 0.4,
      },
  });
  