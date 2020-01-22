//TSButtonHomePage.js
import React, { Component } from 'react';
import { CJTSTableHomeBasePage, CJTSNavigationFactory } from "cjrn-demo-base";

export default class TSButtonHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Button",
                    data: [
                        {
                            title: "设置按钮背景色的ButtonBGPage",
                            nextPageName: "TSButtonBGPage"
                        },
                        {
                            title: "修改/提交按钮",
                            nextPageName: "TSEditSubmitButtonPage"
                        },
                        {
                            title: "底部按钮",
                            nextPageName: "TSBottomButtonsPage"
                        },
                    ]
                },
            ],
        }
    }
}

/**
 * ButtonChildPages
 */
import TSButtonBGPage from "./TSButtonBGPage";
import TSEditSubmitButtonPage from "./TSEditSubmitButtonPage";
import TSBottomButtonsPage from "./TSBottomButtonsPage";

export const ButtonChildPages = {
    TSButtonBGPage: {
        screen: TSButtonBGPage,
        navigationOptions: () => ({
            title: `TSButtonBGPage`,
        }),
    },
    TSEditSubmitButtonPage: {
        screen: TSEditSubmitButtonPage,
        navigationOptions: () => ({
            title: `修改/提交按钮`,
        }),
    },
    TSBottomButtonsPage: {
        screen: TSBottomButtonsPage,
        navigationOptions: () => ({
            title: `底部按钮`,
        }),
    },
}
