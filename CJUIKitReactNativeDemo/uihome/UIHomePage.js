//UIHomePage.js
import React, { Component } from 'react';
import {
    LKDemoTableHomeComponent
} from "../lkcui/lkcui";

export default class UIHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "组件",
                    data: [
                        { title: "Button(按钮)", nextPageName: "TSButtonHomePage" },
                        { title: "ToolBar(工具器)", nextPageName: "ToolBarHomePage" },
                    ]
                },
                { key: "弹窗/蒙层",
                    data: [
                        { title: "ActionSheet", nextPageName: "TSActionSheetPage" },
                        { title: "Picker(选择器)", nextPageName: "TSPickerAllHomePage" },
                    ]
                },
                { key: "弹窗管理",
                    data: [
                        { title: "PopupManager(弹窗管理)", nextPageName: "TSPopupManagerPage" },
                    ]
                },
            ],
        }
    }
}



//UIPages

//button
import TSButtonHomePage, { ButtonChildPages } from "./button/TSButtonHomePage";

//toolbar
import ToolBarHomePage from "./toolbar/ToolBarHomePage";

// 弹窗
import TSActionSheetPage from "./actionsheet/TSActionSheetPage";
import TSPopupManagerPage from "./PopupManager/TSPopupManagerPage";

// 选择器 Picker
import TSPickerAllHomePage, { PickerChildHomePages } from "./picker/TSPickerAllHomePage";


export const UIRoutePage = 'UIHomePage';
// export const UIRoutePage = 'TSPickerAreaHomePage';
// export const UIRoutePage = 'TSDatePickerShowPage';
export const UIPages = {
    UIHomePage: {
        screen: UIHomePage,
        navigationOptions: () => ({
            title: `UI首页`,
        }),
    },

    TSButtonHomePage: {
        screen: TSButtonHomePage,
        navigationOptions: () => ({
            title: `TSButtonHomePage`,
        }),
    },
    ...ButtonChildPages,

    ToolBarHomePage: {
        screen: ToolBarHomePage,
        navigationOptions: () => ({
            title: `ToolBarHomePage`,
        }),
    },

    // 弹窗
    TSActionSheetPage: {
        screen: TSActionSheetPage,
        navigationOptions: () => ({
            title: `弹窗首页`,
        }),
    },
    TSPopupManagerPage: {
        screen: TSPopupManagerPage,
        navigationOptions: () => ({
            title: `弹窗管理`,
        }),
    },


    // 选择器 Picker
    TSPickerAllHomePage: {
        screen: TSPickerAllHomePage,
        navigationOptions: () => ({
            title: `TSPickerAllHomePage`,
        }),
    },
    ...PickerChildHomePages,
};
