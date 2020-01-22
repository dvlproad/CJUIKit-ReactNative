//TSPickerAreaHomePage.js
import React, { Component } from 'react';
import { CJTSTableHomeBasePage, CJTSNavigationFactory  } from "cjrn-demo-base";

export default class TSPickerAreaHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Area",
                    data: [
                        {title: "弹出时候的各种情况 TSAreaPickerShowPage", nextPageName: "TSAreaPickerShowPage"},
                        // {title: "自定义areaPicker位置 TSAreaPickerFramePage", nextPageName: "TSAreaPickerFramePage"},
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
