//TSPickerAreaHomePage.js
import React, { Component } from 'react';
import { LKDemoTableHomeComponent, LKDemoNavigationFactory  } from "cjrn-demo-base";

export default class TSPickerAreaHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKDemoNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Area",
                    data: [
                        {title: "弹出时候的各种情况 TSAreaPickerShowPage", nextPageName: "TSAreaPickerShowPage"},
                        // {title: "自定义datePicker位置 TSDatePickerFramePage", nextPageName: "TSDatePickerFramePage"},
                    ]
                }
            ]
        }
    }
}


// PickerAreaChildPages
import TSAreaPickerShowPage from "./TSAreaPickerShowPage";

export const PickerAreaChildPages = {
    TSAreaPickerShowPage: {
        screen: TSAreaPickerShowPage,
        navigationOptions: () => ({
            title: `地区选择相关`,
        }),
    },
};
