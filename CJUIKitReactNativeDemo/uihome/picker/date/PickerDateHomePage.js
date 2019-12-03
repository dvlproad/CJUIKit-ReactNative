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
                        {title: "DatePickerPage_00ComJS", nextPageName: "DatePickerPage_00ComJS"},
                        {title: "DatePickerPage_01ComJS", nextPageName: "DatePickerPage_01ComJS"},
                        {title: "DatePickerPage_02ComJS", nextPageName: "DatePickerPage_02ComJS"},
                        {title: "TSDatePickerShowPage", nextPageName: "TSDatePickerShowPage"},
                    ]
                },
            ]
        }
    }
}


// PickerDateChildPages
//singleDate-JS
import DatePickerPage_00ComJS from "./DatePickerPage_00ComJS";
import DatePickerPage_01ComJS from "./DatePickerPage_01ComJS";
import DatePickerPage_02ComJS from "./DatePickerPage_02ComJS";
import TSDatePickerShowPage from "./TSDatePickerShowPage";


export const PickerDateChildPages = {
    DatePickerPage_00ComJS: {
        screen: DatePickerPage_00ComJS,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN_未封装)`,
        }),
    },
    DatePickerPage_01ComJS: {
        screen: DatePickerPage_01ComJS,
        navigationOptions: () => ({
            title: `单个日期选择(统一样式RN_已封装)`,
        }),
    },
    DatePickerPage_02ComJS: {
        screen: DatePickerPage_02ComJS,
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
