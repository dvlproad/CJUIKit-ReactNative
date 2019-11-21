//UtilHomePage.js
import React, { Component } from 'react';
import {
    LKDemoTableHomeComponent
} from "../lkcui/lkcui";

export default class UtilHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "Date",
                    data: [
                        { title: "Date", page: "DateHome" },
                    ]
                },
                { key: "String",
                    data: [
                        { title: "StringPage", page: "StringPage" },
                    ]
                },
                { key: "Timer",
                    data: [
                        { title: "CountTimerPage", page: "CountTimerPage" },
                    ]
                },
                { key: "C",
                    data: [
                        { title: "成吉思汗" },
                        { title: "超市快递" }
                    ]
                },
            ],
        }
    }
}


//UtilPages

//string
import StringPage from "./string/StringPage";

//timer
import CountTimerPage from './timer/CountTimerPage';

export const UtilRoutePage = 'UtilHomePage';
export const UtilPages = {
    UtilHomePage: {
        screen: UtilHomePage,
        navigationOptions: () => ({
            title: `Util首页`,
        }),
    },
    StringPage: {
        screen: StringPage,
        navigationOptions: () => ({
            title: `String首页`,
        }),
    },
    CountTimerPage: {
        screen: CountTimerPage,
        navigationOptions: () => ({
            title: `Timer首页`,
        }),
    },
};
