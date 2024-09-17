import { API_HOST, TestToken } from '../constants/api';
import { ForumData } from '../model/forum';
import { SessionSaga } from './sessionSaga';

export class ForumSaga{
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


  doGetUmum=()=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/feature/get-forums`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var res: ForumData[] = responseJson.data.umum
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

  doGetJual=()=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/feature/get-forums`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
       var res: ForumData[] = responseJson.data.jual
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

  doGetBeli=()=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/feature/get-forums`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
       var res: ForumData[] = responseJson.data.beli
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