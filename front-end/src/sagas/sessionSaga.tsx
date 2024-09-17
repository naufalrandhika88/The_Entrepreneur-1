import { User } from "../model/user";
import { AsyncStorage } from 'react-native';

export class SessionSaga{
    setSession=async (user: User, token: string)=>{
        user.token=token
        await AsyncStorage.setItem('@user', JSON.stringify(user))
        return true;
    }

    getSession=async ()=>{
        try{
            var data= await AsyncStorage.getItem('@user')
            if(data == null){
                return null
            }else{
                return JSON.parse(data)
            }
        }catch(e){
            return null
        }
    }

    getSessionToken=async()=>{
        try{
            var data= await AsyncStorage.getItem('@user')
            if(data == null){
                return null
            }else{
                let user: User = JSON.parse(data)
                return user.token
            }
        }catch(e){
            return null
        }
    }

    removeSession=async ()=>{
        try{
            await AsyncStorage.removeItem('@user')
            return true;
        }catch(e){
            return false;
        }
    }
}