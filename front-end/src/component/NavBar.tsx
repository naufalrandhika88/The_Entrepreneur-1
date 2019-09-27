import React from 'react';
import { View } from "react-native";
import { headerBarColor } from "../constants/color";
import Icon from '../core-ui/Icon';

export function navigationOption(title: string){
    return {
        title: title,
        headerStyle: {
            backgroundColor: headerBarColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft:(
              <View style={{paddingLeft: 16}}>
                   <Icon name="logo"/>
              </View>
          ),
          headerRight:(
              <View style={{paddingRight: 16}}>
                  <Icon name="qr"/>
              </View>
          )
    };
};
