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
                        { title: "Button", nextPageName: "ButtonHomePage" },
                        { title: "ToolBar(工具器)", nextPageName: "ToolBarHomePage" },
                    ]
                },
                { key: "弹窗/蒙层",
                    data: [
                        { title: "ActionSheet", nextPageName: "TSActionSheetPage" },
                        { title: "PopupManager(弹窗管理)", nextPageName: "TSPopupManagerPage" },
                    ]
                },
            ],
        }
    }
}



//UIPages

//button
import ButtonHomePage, { ButtonChildPages } from "./button/ButtonHomePage";

//toolbar
import ToolBarHomePage from "./toolbar/ToolBarHomePage";

// 弹窗
import TSActionSheetPage from "./actionsheet/TSActionSheetPage";
import TSPopupManagerPage from "./actionsheet/TSPopupManagerPage";


export const UIRoutePage = 'UIHomePage';
// export const UIRoutePage = 'PickerDateHomePage';
// export const UIRoutePage = 'ButtonHomePage';
export const UIPages = {
    UIHomePage: {
        screen: UIHomePage,
        navigationOptions: () => ({
            title: `UI首页`,
        }),
    },

    ButtonHomePage: {
        screen: ButtonHomePage,
        navigationOptions: () => ({
            title: `ButtonHomePage`,
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
};
