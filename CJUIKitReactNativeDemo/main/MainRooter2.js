// UINavigator.js
import React from 'react';
import {
    createAppContainer,
} from 'react-navigation';
import {
    createStackNavigator,
} from 'react-navigation-stack';

//ui
import {UIPages, UIRoutePage} from "../uihome/UIHomePage";

const UINavigator = createStackNavigator(
    {
        ...UIPages,
    },
    {
        initialRouteName: UIRoutePage
    }
);

export default createAppContainer(UINavigator);

