//PickerDateHomePage.js
import React, { Component } from 'react';

import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../../lkcui/lkcui";

export default class PickerDateHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `选择日期`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "SingleDate--JS",
                    data: [
                        {title: "自定义datePicker位置 TSDatePickerFramePage", nextPageName: "TSDatePickerFramePage"},
                        {title: "弹出时候的各种情况 TSDatePickerShowPage", nextPageName: "TSDatePickerShowPage"},
                    ]
                },
            ]
        }
    }
}


// PickerDateChildPages
import TSDatePickerFramePage from "./TSDatePickerFramePage";
import TSDatePickerShowPage from "./TSDatePickerShowPage";


export const PickerDateChildPages = {
    TSDatePickerFramePage: {
        screen: TSDatePickerFramePage,
        navigationOptions: () => ({
            title: `直接创建，自己控制显示位置`,
        }),
    },
    TSDatePickerShowPage: {
        screen: TSDatePickerShowPage,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN_已封装)`,
        }),
    },
};
