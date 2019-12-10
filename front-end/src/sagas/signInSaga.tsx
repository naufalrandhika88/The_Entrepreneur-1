import { TestToken, API_HOST } from "../constants/api";
import {User} from "../model/user";

export class SignInSaga{
  kHttpHeader={
    headers:{
      'Content-Type': 'application/json',
      'Authorization':TestToken
    },
  }

  doSignIn=(email, password)=>{
    return fetch(`${API_HOST}/api/auth/sign-in`,{
      method: 'POST',
      headers: this.kHttpHeader.headers,
      body: JSON.stringify({
          email: email,
          password: password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
      var user: User = responseJson.data
       return {
         error: !responseJson.success,
         user: user,
         token: responseJson.token,
         message: responseJson.message,
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