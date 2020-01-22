/**
 * TSImageHomePage.js
 *
 * @Description: 演示图片相关组件的首页
 *
 * @author      chaoqian.li
 * @date        2019-12-31 16:12:10
 */
import React, { Component } from 'react';
import { CJTSTableHomeBasePage, CJTSNavigationFactory } from "cjrn-demo-base";

export default class TSImageHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `按钮`)
    };

    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                {
                    key: "Loading",
                    data: [
                        {
                            title: "测试加载动画",
                            nextPageName: "LoadingImage1LoadingShowPage1"
                        },
                        {
                            title: "测试本地图片上传成功后，图片组件的加载效果",
                            nextPageName: "LoadingImage3WhenUploadPage"
                        },
                        {
                            title: "测试加载错误图片，会不会卡死",
                            nextPageName: "TSErrorImageLoadingPage"
                        },
                    ]
                },
                {
                    key: "Loading + Action",
                    data: [
                        {
                            title: "用于图片列表上传的可增删的图片按钮",
                            nextPageName: "TSActionLoadingImagePage"
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
import TSActionLoadingImagePage from "./TSActionLoadingImagePage";

import LoadingImage1LoadingShowPage1, {Title_LoadingImagePage1} from "./LoadingImage1LoadingShowPage1";
import LoadingImage3WhenUploadPage, {Title_LoadingImagePage2} from "./LoadingImage3WhenUploadPage";
import TSErrorImageLoadingPage, {Title_LoadingImagePage3} from "./TSErrorImageLoadingPage";

export const ImageChildPages = {
    LoadingImage1LoadingShowPage1: {
        screen: LoadingImage1LoadingShowPage1,
        navigationOptions: () => ({
            title: Title_LoadingImagePage1,
        }),
    },
    LoadingImage3WhenUploadPage: {
        screen: LoadingImage3WhenUploadPage,
    },
    TSErrorImageLoadingPage: {
        screen: TSErrorImageLoadingPage,
    },

    TSActionLoadingImagePage: {
        screen: TSActionLoadingImagePage,
    }
}
