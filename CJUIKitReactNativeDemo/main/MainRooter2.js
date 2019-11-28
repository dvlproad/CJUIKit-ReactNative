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
        // HealthCerHome: {
        //     screen: UIRoutePage,
        //     navigationOptions: () => ({
        //         title: `个人健康证`,
        //         headerStyle:{                                 //导航栏样式设置
        //             backgroundColor:'#ffffff',
        //         },
        //         headerLeft: (
        //             <LKBackAppButton />
        //         ),
        //     }),
        // },
        ...UIPages,
    },
    {
        initialRouteName: UIRoutePage
    }
);

export default createAppContainer(UINavigator);

