//UIHomePage.js
import React, { Component } from 'react';
import {
    CJTSDefaultImages,
    CJTSTableHomeBasePage,
    CJTSRoute,
} from "cjrn-demo-base";

import {Button} from "react-native";

export default class UIHomePage extends CJTSTableHomeBasePage {
    static navigationOptions = ({navigation}) => {
        let navigationOptions = {
            title: '首页',
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerRight: (
                <Button
                    title={'切换风格'}
                    onPress={()=>{
                        navigation.state.params.navigationBarRightButtonAction();
                    }}
                />
            ),
        };

        return navigationOptions;
    };

    componentWillMount() {
        this.props.navigation.setParams({
            navigationBarRightButtonAction: this.navigationBarRightButtonAction,
        })
    }


    navigationBarRightButtonAction = () => {
        let pageName = this.navigationBarRightButtonPageName();
        CJTSRoute.push(this.props.navigation, pageName, {});
    };


    navigationBarRightButtonPageName() {
        return 'TSThemePage';
    }


    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "组件",
                    data: [
                        { title: "Button(按钮)", nextPageName: "TSButtonHomePage" },
                        { title: "Image(图片)", nextPageName: "TSImageHomePage" },
                        // { title: "ToolBar(工具器)", nextPageName: "ToolBarHomePage" },
                    ]
                },
                { key: "弹窗/蒙层",
                    data: [
                        { title: "Toast", nextPageName: "TSToastPage" },
                        { title: "Alert", nextPageName: "TSAlertPage" },
                        { title: "ActionSheet", nextPageName: "TSActionSheetPage" },
                    ]
                },
                { key: "选择器",
                    data: [
                        // { title: "Picker(选择器)", nextPageName: "TSPickerAllHomePage" },
                        { title: "DatePicker(日期选择)", nextPageName: "PickerDateHomePage" },
                        { title: "AreaPicker(地区选择)", nextPageName: "TSPickerAreaHomePage" },
                        { title: "ItemPicker(事项选择(单选、多选))", nextPageName: "TSPickerItemHomePage" },
                    ]
                },
                { key: "弹窗管理",
                    data: [
                        { title: "PopupManager(弹窗管理)", nextPageName: "TSPopupManagerPage" },
                    ]
                },
                { key: "列表",
                    data: [
                        // { title: "Table(列表视图)", nextPageName: "ListHomePage" },
                        // { title: "Collection(集合视图)", nextPageName: "CollectionHomePage" },
                        { title: "TSImagesLookListPage(图片展示列表)", nextPageName: "TSImagesLookListPage" },
                        { title: "TSImagesChooseListPage(图片选择列表)", nextPageName: "TSImagesChooseListPage" },
                        { title: "TSModulesEntryListPage(模块功能入口列表)", nextPageName: "TSModulesEntryListPage" },
                        { title: "TSCycleCollectionPage(轮播图)", nextPageName: "TSCycleCollectionPage" },
                    ]
                },
                { key: "其他",
                    data: [
                        { title: "TSSegmentedPage(界面分段选择器)", nextPageName: "TSSegmentedPage" },
                        { title: "TSMenuPage(下拉菜单选择页)", nextPageName: "TSMenuPage" },
                        { title: "TSExcelHomePage(Excel)", nextPageName: "TSExcelHomePage" },
                    ]
                },
                { key: "效果",
                    data: [
                        { title: "Refresh(下拉刷新)", nextPageName: "TSRefreshHomePage" },
                    ]
                },
                { key: "通过继承基类实现页面",
                    data: [
                        { title: "TSDescriptionListPage(介绍列表)", nextPageName: "TSDescriptionListPage" },
                    ]
                },
            ],
        }
    }
}



//UIPages

// theme
import TSThemePage from './theme/TSThemePage';

// button 按钮
import TSButtonHomePage, { ButtonChildPages } from "./button/TSButtonHomePage";

// image 图片
import TSImageHomePage, { ImageChildPages } from "./image/TSImageHomePage";

// toolbar 工具条
import ToolBarHomePage from "./toolbar/ToolBarHomePage";

// 弹窗
import TSToastPage from "./toast/TSToastPage";
import TSAlertPage from "./alert/TSAlertPage";
import TSActionSheetPage from "./actionsheet/TSActionSheetPage";
import TSPopupManagerPage from "./PopupManager/TSPopupManagerPage";

// 列表
import CollectionHomePage, { CollectionChildPages } from "./collection/CollectionHomePage";

// 选择器 Picker
import TSPickerAllHomePage, { PickerChildHomePages } from "./picker/TSPickerAllHomePage";


// 其他
import TSExcelHomePage from './excel/TSExcelHomePage';
import TSSegmentedPage from '../uihome/helloworld/TSSegmentedPage';
import TSMenuPage from '../uihome/helloworld/TSMenuPage';

// 刷新refresh
import TSRefreshHomePage from './refresh/TSRefreshHomePage';


export const UIRoutePage = 'UIHomePage';
// export const UIRoutePage = 'CollectionHomePage';
// export const UIRoutePage = 'TSDatePickerShowPage';
export const UIPages = {
    UIHomePage: {
        screen: UIHomePage,
        navigationOptions: () => ({
            title: `UI首页`,
        }),
    },

    TSThemePage: {
        screen: TSThemePage,
        navigationOptions: () => ({
            title: `TSThemePage`,
        }),
    },

    // Button 按钮
    TSButtonHomePage: {
        screen: TSButtonHomePage,
        navigationOptions: () => ({
            title: `TSButtonHomePage`,
        }),
    },
    ...ButtonChildPages,

    // Image 图片
    TSImageHomePage: {
        screen: TSImageHomePage,
        navigationOptions: () => ({
            title: `TSImageHomePage`,
        }),
    },
    ...ImageChildPages,

    // toolbar 工具条
    ToolBarHomePage: {
        screen: ToolBarHomePage,
        navigationOptions: () => ({
            title: `ToolBarHomePage`,
        }),
    },

    // 弹窗
    TSToastPage: {
        screen: TSToastPage,
        navigationOptions: () => ({
            title: `Toast首页`,
        }),
    },
    TSAlertPage: {
        screen: TSAlertPage,
        navigationOptions: () => ({
            title: `Alert首页`,
        }),
    },
    TSActionSheetPage: {
        screen: TSActionSheetPage,
        navigationOptions: () => ({
            title: `ActionSheet首页`,
        }),
    },

    // 弹窗管理
    TSPopupManagerPage: {
        screen: TSPopupManagerPage,
        navigationOptions: () => ({
            title: `弹窗管理`,
        }),
    },

    // 列表
    CollectionHomePage: {
        screen: CollectionHomePage,
        navigationOptions: () => ({
            title: `CollectionHomePage`,
        }),
    },
    ...CollectionChildPages,


    // 选择器 Picker
    TSPickerAllHomePage: {
        screen: TSPickerAllHomePage,
        navigationOptions: () => ({
            title: `TSPickerAllHomePage`,
        }),
    },
    ...PickerChildHomePages,





    // 其他
    TSExcelHomePage: {
        screen: TSExcelHomePage,
        navigationOptions: () => ({
            title: `TSExcelHomePage`,
		}),
	},
    TSSegmentedPage: {
        screen: TSSegmentedPage,
        navigationOptions: () => ({
            title: `TSSegmentedPage`,
        }),
    },
    TSMenuPage: {
        screen: TSMenuPage,
        navigationOptions: () => ({
            title: `TSMenuPage`,
        }),
    },


    // 刷新 refresh
    TSRefreshHomePage: {
        screen: TSRefreshHomePage,
        navigationOptions: () => ({
            title: `TSRefreshHomePage`,
        }),
    },
};
