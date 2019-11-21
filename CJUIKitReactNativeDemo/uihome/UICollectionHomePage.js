//UICollectionHomePage.js
import React, { Component } from 'react';
import {
    LKDemoTableHomeComponent
} from "../lkcui/lkcui";

export default class UICollectionHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "布局/跳转",
                    data: [
                        { title: "LayoutHomePage", page: "LayoutHomePage" },
                        { title: "Navigation", page: "NavigationHome" },
                    ]
                },
                { key: "组件",
                    data: [
                        { title: "Button", page: "ButtonHomePage" },
                        { title: "Text", page: "TextHome" },
                        { title: "Image", page: "ImageHomePage" },
                        { title: "Empty", page: "EmptyNetworkPage" },
                        { title: "WebView", page: "WebViewHomePage" },
                    ]
                },
                { key: "进阶",
                    data: [
                        { title: "List(列表)", page: "ListHomePage" },
                        { title: "Modal(Modal)", page: "ModalHomePage" },
                        { title: "Picker(选择器)", page: "PickerAllHomePage" },
                    ]
                },
            ],
        }
    }
}




//UIPages

//layout
import LayoutHomePage from "./layout/LayoutHomePage";

//navigation
import { NavigationPages } from "./navigation/NavigationHomePage";

//button
import { ButtonPages } from "./button/ButtonHomePage";

//text
import TextHomePage from "./text/TextHomePage";

//image
import { ImagePages, ImageRoutePage } from "./image/ImageHomePage";
//list
import { ListPages, ListRoutePage } from "./list/ListHomePage";
//upload
import { UploadPages, UploadRoutePage } from "./upload/UploadHomePage";
//picker
import { PickerAllHomePages, PickRoutePage } from "./picker/PickerAllHomePage";
//modal
import { ModalPages, ModalRoutePage } from "./modal/ModalHomePage";

//webview
import { WebViewPages, WebViewRoutePage } from './webview/WebViewHomePage';

//empty
import EmptyNetworkPage from "./empty/EmptyNetworkPage";

// export const UIRoutePage = 'UIHomePage';
// export const UIRoutePage = PickRoutePage;
export const UIRoutePage = 'UICollectionHomePage';
export const UIPages = {
    UICollectionHomePage: {
        screen: UICollectionHomePage,
        navigationOptions: () => ({
            title: `UI首页`,
        }),
    },
    LayoutHomePage: {
        screen: LayoutHomePage,
        navigationOptions: () => ({
            title: `Layout首页`,
        }),
    },
    ...NavigationPages,

    EmptyNetworkPage: {
        screen: EmptyNetworkPage,
        navigationOptions: () => ({
            title: `EmptyNetworkPage`,
        }),
    },

    TextHomePage: {
        screen: TextHomePage,
        navigationOptions: () => ({
            title: `Text首页`,
        }),
    },

    ...ButtonPages,

    ...ImagePages,
    ...ListPages,
    ...UploadPages,

    ...PickerAllHomePages,
    ...ModalPages,

    ...WebViewPages,
};
