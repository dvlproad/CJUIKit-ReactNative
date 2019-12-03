//TSPickerAreaHomePage.js
import React, { Component } from 'react';

import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../../lkcui/lkcui";

export default class TSPickerAreaHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
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
