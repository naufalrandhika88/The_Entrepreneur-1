import { API_HOST, TestToken } from "../constants/api";
import {User} from "../model/user";
import { SessionSaga } from "./sessionSaga";

export class HomeSaga{
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

  doGetHomeData=async ()=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/page/home`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })

    .then((response) => response.json())
    .then((responseJson) => {
      var res: Event[] = responseJson.data.events
      var user: User = responseJson.data.user
       return {
         error: !responseJson.success,
         data: res,
         user: user
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