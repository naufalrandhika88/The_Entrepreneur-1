import { API_HOST, TestToken } from '../constants/api';
import { SessionSaga } from './sessionSaga';

export class ForumDetailsSaga{
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

  doGetForumDetails=(id: String)=>{
    this.updateHttpHeader()
    return fetch(`${API_HOST}/api/feature/get-forum/${id}`,{
      method: 'GET',
      headers: this.kHttpHeader.headers,
    })
    .then((response) => response.json())
    .then((responseJson) => {
       return {
         error: false,
         data: responseJson.data
       }
    })
    .catch((error) => {
      return {
        error: true,
        errorDetail: error
      }
    });
  }

  addComment=(id_forum, id_user, comment)=>{
    return fetch(`${API_HOST}/api/feature/add-comment`,{
        method: 'POST',
        headers: this.kHttpHeader.headers,
        body: JSON.stringify({
            id_forum: id_forum,
            id_user: id_user,
            comment: comment
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
         return {
           error: !responseJson.success,
           data: responseJson.data
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