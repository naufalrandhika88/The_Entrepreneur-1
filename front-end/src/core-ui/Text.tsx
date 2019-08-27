import React from 'react';
import {WHITE, RED, BLACK, BLUE, CUSTOM_BLACK, CUSTOM_YELLOW } from '../../constants/color';

import {
    Text
  } from 'react-native';

type TextProp = {
    content: string;
    type: 'display3'|'display2'|'display1'|'headline'|'subheading'|'body';
    color?: 'white'|'black'|'red'|'blue'|'gray'|'yellow';
};

export default function Texts(props: TextProp){
    let {color, type, content} = props;

    var selectedColor: string;

    color === 'white' ? selectedColor = WHITE:
    color === 'red' ? selectedColor = RED:
    color === 'blue' ? selectedColor = BLUE:
    color == 'gray' ? selectedColor = CUSTOM_BLACK:
    color == 'yellow' ? selectedColor = CUSTOM_YELLOW:
    selectedColor = BLACK;

    const _display3 = ()=>(<Text style={textStyle(56)}>{content}</Text>);
    const _display2 = ()=>(<Text style={textStyle(45)}>{content}</Text>);
    const _display1 = ()=>(<Text style={textStyle(34)}>{content}</Text>);
    const _headline = ()=>(<Text style={textStyle(24)}>{content}</Text>);
    const _subheading = ()=>(<Text style={textStyle(16)}>{content}</Text>);
    const _body = ()=>(<Text style={textStyle(12)}>{content}</Text>);
    const _caption = ()=>(<Text style={textStyle(10)}>{content}</Text>);


    return type === 'display3' ? _display3():
    type === 'display2' ? _display2():
    type === 'display1' ? _display1():
    type === 'headline' ? _headline():
    type === 'subheading' ? _subheading():
    type === 'body' ? _body():
    type === 'caption' ? _caption():
    _body();

    function textStyle(fontSize: number){
        return {
            fontSize: fontSize,
            color: selectedColor
        }
    }
}
