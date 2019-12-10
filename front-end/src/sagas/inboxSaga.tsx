import { API_HOST, TestToken } from '../constants/api';
import { SessionSaga } from './sessionSaga';
import { Inbox } from '../model/inbox';

export default class InboxSaga{
  private sessionSaga: SessionSaga = new SessionSaga

  private kHttpHeader={
    headers:{
      'Content-Type': 'application/json',
      'Authorization': TestToken
    },
  }

  private async updateHttpHeader(){
    var token = await this.sessionSaga.getSessionToken() || ''
    this.kHttpHeader={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      },
    }
  }

  doGetInbox=()=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/feature/inbox`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var res: Inbox[] = responseJson.data
      res = res.reverse()
       return {
         error: !responseJson.success,
         data: res
       }
    })
    .catch((error) => {
      return {
        error: true,
        errorDetail: error
      }
    });
 
  }
}