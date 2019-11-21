//LifecycleHomePage.js
import React, { Component } from 'react';
import {
    LKDemoTableHomeComponent
} from "../lkcui/lkcui";

export default class LifecycleHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "State",
                    data: [
                        { title: "StateEasy：最基本的使用",   page: "StateEasyPage" },
                        { title: "StateNormal：正常使用", page: "StateNormalPage" },
                    ]
                },
                { key: "Props",
                    data: [
                        { title: "PropsEasyPage：没使用默认值",   page: "PropsEasyPage" },
                        { title: "PropsNormalPage：使用默认值，但没进行类型检查", page: "PropsNormalPage" },
                        { title: "PropsPerfectPage：使用默认值，且进行类型检查)", page: "PropsPerfectPage" },
                    ]
                },
            ],
        }
    }
}


//LifeCyclePages
import StateEasyPage from "./state/StateEasyPage";
import StateNormalPage from "./state/StateNormalPage";
import PropsEasyPage from "./props/PropsEasyPage";
import PropsNormalPage from "./props/PropsNormalPage";
import PropsPerfectPage from "./props/PropsPerfectPage";

export const LifeCycleRoutePage = 'LifecycleHomePage';
export const LifeCyclePages = {
    LifecycleHomePage: {
        screen: LifecycleHomePage,
            navigationOptions: () => ({
            title: `Lifecycle首页`,
        }),
    },
    StateEasyPage: {
        screen: StateEasyPage,
            navigationOptions: () => ({
            title: `State(最简单的使用)`,
        }),
    },
    StateNormalPage: {
        screen: StateNormalPage,
            navigationOptions: () => ({
            title: `State(正常使用)`,
        }),
    },
    PropsEasyPage: {
        screen: PropsEasyPage,
            navigationOptions: () => ({
            title: `Props(最简单的使用)`,
        }),
    },
    PropsNormalPage: {
        screen: PropsNormalPage,
            navigationOptions: () => ({
            title: `Props(基本的使用)`,
        }),
    },
    PropsPerfectPage: {
        screen: PropsPerfectPage,
            navigationOptions: () => ({
            title: `Props(完整的使用)`,
        }),
    },
}
