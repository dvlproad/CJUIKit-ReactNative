/**
 * TSThemePage.js
 *
 * @Description: 切换主题的视图
 *
 * @author      chaoqian.li
 * @date        2019-12-18 14:18:38
 */
import React, { Component } from 'react';

import {
    CJTSTableHomeBasePage,
    CJTSNavigationFactory,
    CJTSRoute,
} from "cjrn-demo-base";

import {
    CQTheme,
} from "cjrn-theme-uikit";

export default class TSThemePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `切换主题`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "切换主题",
                    data: [
                        {
                            title: "default 风格",
                            clickButtonHandle: (moduleModel) => {
                                CQTheme.set(CQTheme.themes['default']);
                                CJTSRoute.pop(props.navigation);
                            },
                        },
                        // {
                        //     title: "Employee 风格",
                        //     clickButtonHandle: (moduleModel) => {
                        //         CQTheme.set(CQTheme.themes['Employee']);
                        //         CJTSRoute.pop(props.navigation);
                        //     },
                        // },
                        {
                            title: "Partner 风格",
                            clickButtonHandle: (moduleModel) => {
                                CQTheme.set(CQTheme.themes['Partner']);
                                CJTSRoute.pop(props.navigation);
                            },
                        },
                    ]
                },
            ]
        }
    }
}
