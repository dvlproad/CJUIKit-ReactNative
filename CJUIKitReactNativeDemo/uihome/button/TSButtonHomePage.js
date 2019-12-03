//TSButtonHomePage.js
import React, { Component } from 'react';
import {
    LKNavigationFactory,
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class TSButtonHomePage extends LKDemoTableHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
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
                            title: "TSEditSubmitButtonPage",
                            nextPageName: "TSEditSubmitButtonPage"
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
            title: `TSEditSubmitButtonPage`,
        }),
    },
}
