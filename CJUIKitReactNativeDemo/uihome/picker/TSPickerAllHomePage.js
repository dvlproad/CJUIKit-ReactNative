//TSPickerAllHomePage.js
import React, { Component } from 'react';

import {
    LKDemoNavigationFactory,
    LKDemoCollectionHomeComponent
} from '../../commonUIDemo/commonUIDemo';


export default class TSPickerAllHomePage extends LKDemoCollectionHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKDemoNavigationFactory.backPageNavigationOptions({ navigation }, `各种picker选择`)
    };

    constructor(props) {
        super(props);

        this.state = {
            moduleModels: [
                {
                    title: "日期选择",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "PickerDateHomePage",
                },
                {
                    title: "地区选择",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "TSPickerAreaHomePage",
                },
                {
                    title: "事项选择(单选、多选)",
                    imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                    nextPageName: "TSPickerItemHomePage",
                },
            ],
        }
    }
}


// PickerChildHomePages
import PickerDateHomePage, {PickerDateChildPages } from "./date/PickerDateHomePage";
import TSPickerAreaHomePage, {PickerAreaChildPages } from "./area/TSPickerAreaHomePage";
import TSPickerItemHomePage, {PickerItemChildPages } from "./item/TSPickerItemHomePage";


export const PickerChildHomePages = {
    // 选择日期
    PickerDateHomePage: {
        screen: PickerDateHomePage,
        navigationOptions: () => ({
            title: `PickerDate首页`,
        }),
    },
    ...PickerDateChildPages,


    // 选择地区
    TSPickerAreaHomePage: {
        screen: TSPickerAreaHomePage,
        navigationOptions: () => ({
            title: `PickerArea首页`,
        }),
    },
    ...PickerAreaChildPages,

    // 选择事项(单选：如体重、多选：如支持的运营商)
    TSPickerItemHomePage: {
        screen: TSPickerItemHomePage,
        navigationOptions: () => ({
            title: `PickerItem首页`,
        }),
    },
    ...PickerItemChildPages,
};
