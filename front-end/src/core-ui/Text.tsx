import React from 'react';

import {
    StyleSheet,
    Text
  } from 'react-native';

type TextProp = {
    content: string;
    type: 'display3'|'display2'|'display1'|'headline'|'subheading'|'body2'|'body1';
};

export default function Texts(props: TextProp){
    let {type, content} = props;

    const _display3 = ()=>(<Text style={textStyle.display3}>{content}</Text>);
    const _display2 = ()=>(<Text style={textStyle.display2}>{content}</Text>);
    const _display1 = ()=>(<Text style={textStyle.display1}>{content}</Text>);
    const _headline = ()=>(<Text style={textStyle.headline}>{content}</Text>);
    const _subheading = ()=>(<Text style={textStyle.subheadline}>{content}</Text>);
    const _body2 = ()=>(<Text style={textStyle.body2}>{content}</Text>);
    const _body1 = ()=>(<Text style={textStyle.body1}>{content}</Text>);
    const _caption = ()=>(<Text style={textStyle.caption}>{content}</Text>);


    return type === 'display3' ? _display3():
    type === 'display2' ? _display2():
    type === 'display1' ? _display1():
    type === 'headline' ? _headline():
    type === 'subheading' ? _subheading():
    type === 'body2' ? _body2():
    type === 'body1' ? _body1():
    type === 'caption' ? _caption():
    _body1();
}

const textStyle=StyleSheet.create({
    display3:{
        fontSize: 56,
    },
    display2:{
        fontSize: 45,
    },
    display1:{
        fontSize: 34,
    },
    headline:{
        fontSize: 24,
    },
    subheadline:{
        fontSize: 16,
    },
    body2:{
        fontSize: 14,
    },
    body1:{
        fontSize: 14,
    },
    caption:{
        fontSize:12,
    }
});