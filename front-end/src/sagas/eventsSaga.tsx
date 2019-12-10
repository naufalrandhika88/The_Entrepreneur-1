import { API_HOST, TestToken } from '../constants/api';
import {Event} from '../model/event';
import { SessionSaga } from './sessionSaga';
import { User } from '../model/user';

export class EventsSaga{
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

  getEventDetails=(id)=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/feature/get-event/${id}`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var res: Event = responseJson.data
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

  orderTicket=async (
    id_event,
    qty,
    total
  )=>{
    this.updateHttpHeader()
    var temp: User = await this.sessionSaga.getSession()

    return fetch(`${API_HOST}/api/feature/new-ticket`,{
      method: 'POST',
      headers: this.kHttpHeader.headers,
      body: JSON.stringify({
        id_event: id_event,
        id_user: temp.id,
        type: 'Regular',
        qty: qty,
        total: total,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var res: Event = responseJson.data
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
