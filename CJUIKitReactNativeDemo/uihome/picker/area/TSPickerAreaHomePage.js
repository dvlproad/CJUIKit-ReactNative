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
                        {title: "TSPickerAreaPage", nextPageName: "TSPickerAreaPage"},
                        {title: "PopupManagerPage", nextPageName: "PopupManagerPage"},
                    ]
                }
            ]
        }
    }
}


// PickerAreaChildPages
import TSPickerAreaPage from "./TSPickerAreaPage";
import PopupManagerPage from "./TSPopupManagerPage";

export const PickerAreaChildPages = {
    TSPickerAreaPage: {
        screen: TSPickerAreaPage,
        navigationOptions: () => ({
            title: `地区选择相关`,
        }),
    },
    PopupManagerPage: {
        screen: PopupManagerPage,
        navigationOptions: () => ({
            title: `地区选择相关`,
        }),
    },
};
