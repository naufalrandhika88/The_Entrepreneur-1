import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { navigationOption } from '../component/NavBar';
import { k8 } from '../constants/dimens';
import { Avatar } from 'react-native-elements';
import Text from '../core-ui/Text';
import { HorizontalSpacer1, HorizontalSpacer3, VerticalSpacer1} from '../core-ui/Spacer';
import { NavigationScreenProps, NavigationActions, StackActions } from 'react-navigation';
import {AccountSaga} from '../sagas/accountSaga'
import {User} from '../model/user'
import { any } from 'prop-types';
import { SessionSaga } from '../sagas/sessionSaga';
import Toast from 'react-native-root-toast';

type Props = NavigationScreenProps;
type State = {};

export default class AccountScene extends Component<Props, State>{
    static navigationOptions= navigationOption("Account");
    accountSaga: AccountSaga = new AccountSaga
    sessionSaga: SessionSaga = new SessionSaga

    props!: Props;
    
    state={
        error: null,
        data: any,
        user: any
    }

    componentWillMount=async ()=>{
        this.setState(
            await this.accountSaga.doGetHomeData()
        )
    }

    onLogout=async ()=>{
        if(await this.sessionSaga.removeSession()){
            Toast.show("You have been logged out, see you later!", {
                backgroundColor: "#0ba257",
                duration: 1000,
                opacity: 0.8,
                position: Toast.positions.BOTTOM
              })
              
            const resetAction = StackActions.reset({
                index: 0, 
                key: null,
                actions: [
                        NavigationActions.navigate({ routeName: 'Welcome' })
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }

    }
      
    render() {
        var data: User = this.state.user

        return (
            <View style={styles.view}>
                <View style={styles.avatar}>
                    <Avatar containerStyle={styles.avatar_picture} title={data.full_name} rounded size="large" ></Avatar>
                    <HorizontalSpacer1></HorizontalSpacer1>
                    <View style={{flexDirection: "column"}}>
                        <Text type="headline">{data.full_name}</Text>
                        <VerticalSpacer1></VerticalSpacer1>
                        <View style={{flexDirection: "row", alignContent:"space-between"}}>
                            <View style={{flexDirection: "column"}}>
                                <Text type="body" color="gray4">Entrepreneur</Text>
                                <Text type="body" color="brown">Learning</Text>
                            </View>
                            <HorizontalSpacer3></HorizontalSpacer3>
                            <View style={{flexDirection: "column"}}>
                                <Text type="body" color="gray4">Membership</Text>
                                 <Text type="body" color="yellow">{data.membership}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{padding: k8}}>
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
  