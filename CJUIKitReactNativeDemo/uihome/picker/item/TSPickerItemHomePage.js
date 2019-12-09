//TSPickerItemHomePage.js
import React, { Component } from 'react';

import {
    LKDemoTableHomeComponent,
} from "cjrn-demo-base";

import {
    LKNavigationFactory,
} from "../../../lkcui/lkcui";

export default class TSPickerItemHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `选择事项(单选：如体重、多选：如支持的运营商)`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Weight",
                    data: [
                        {title: "PickWeightPage", nextPageName: "PickWeightPage"},
                        {title: "弹出时候的各种情况 TSPickerItemShowPage", nextPageName: "TSPickerItemShowPage"},
                    ]
                },
            ]
        }
    }
}


// PickerItemChildPages
import PickWeightPage from "./PickWeightPage";
import TSPickerItemShowPage from "./TSPickerItemShowPage";

export const PickerItemChildPages = {
    PickWeightPage: {
        screen: PickWeightPage,
        navigationOptions: () => ({
            title: `体重选择`,
        }),
    },

    TSPickerItemShowPage: {
        screen: TSPickerItemShowPage,
        navigationOptions: () => ({
            title: `体重选择`,
        }),
    },
};
