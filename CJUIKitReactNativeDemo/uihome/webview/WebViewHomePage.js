//WebViewHomePage.js
import {
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class WebViewHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "WebView",
                    data: [
                        { title: "WebViewPage1", page: "WebViewPage1" },
                        { title: "WebViewPage2", page: "WebViewPage2" },
                        { title: "WebViewJSBridgePage", page: "WebViewJSBridgePage" },
                    ]
                },
            ],
        }
    }
}

//WebViewPages

import WebViewPage1 from "./WebViewPage1";
import WebViewPage2 from "./WebViewPage2";
import WebViewJSBridgePage from "./WebViewJSBridgePage";


export const WebViewRoutePage = 'WebViewHomePage';
export const WebViewPages = {
    WebViewHomePage: {
        screen: WebViewHomePage,
        navigationOptions: () => ({
            title: `WebViewHomePage`,
        }),
    },
    WebViewPage1: {
        screen: WebViewPage1,
        navigationOptions: () => ({
            title: `WebViewPage1`,
        }),
    },
    WebViewPage2: {
        screen: WebViewPage2,
        navigationOptions: () => ({
            title: `WebViewPage2`,
        }),
    },
    WebViewJSBridgePage: {
        screen: WebViewJSBridgePage,
        navigationOptions: () => ({
            title: `WebViewJSBridgePage`,
        }),
    },
};
