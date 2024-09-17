import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { navigationOption } from '../component/NavBar';
import InboxCard from '../component/InboxCard';
import InboxSaga from '../sagas/inboxSaga';
import { Inbox } from '../model/inbox';
import { headerBarColor } from '../constants/color';
import Text from '../core-ui/Text';

type Props = {};
type State = {
  error: Boolean,
  data: Inbox[],
  isLoading: Boolean
};

export default class InboxScene extends Component<Props, State> {

  static navigationOptions = navigationOption('Inbox');
  inboxSaga: InboxSaga = new InboxSaga

  componentWillMount=async ()=>{    
    this.setState({
      isLoading: true,
      error: false,
      data: []
    })
    this.refresh()
  }

  refresh=async ()=>{
    this.setState({
      isLoading: true,
    })
    var res: any = await this.inboxSaga.doGetInbox();
    this.setState({
      isLoading: false,
      error: res.error,
      data: res.data
    })
  }
  
  render() {
    if(this.state.isLoading){
      return (<ActivityIndicator style={{
        alignSelf: "stretch"
      }}
      size="large" color={headerBarColor} ></ActivityIndicator>)

    }else{
      if(!this.state.error){
        if(this.state.data.length > 0)
        return(
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.isLoading} onRefresh={this.refresh} />
          }
          >
            {this.state.data.map(
              (f)=>{
                return (
                  <InboxCard
                  key={f.id}
                  dateInbox={f.inbox_date}
                  titleInbox={f.message}
                ></InboxCard>
                )
              }
            )}
        </ScrollView>
        )
        else{
          return (
            <Text color='brown'>You don't have any inbox(es)</Text>
          )
        }
    }else{
      return (
        <Text color="red">There has been an error loading your inbox</Text>
      )
    }


  }
}
}