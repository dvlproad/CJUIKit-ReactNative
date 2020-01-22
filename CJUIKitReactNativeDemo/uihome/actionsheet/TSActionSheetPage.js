//TSActionSheetPage.js
import React, { Component } from 'react';
import {CJTSNavigationFactory, CJTSTableHomeBasePage, CJTSTableHomeWithRightBasePage} from "cjrn-demo-base";
import {
    CQActionSheetUtil,
    CQToastUtil,
} from "cjrn-theme-uikit";

export default class TSActionSheetPage extends CJTSTableHomeBasePage {
    static navigationOptions = ({navigation}) => {
        return CJTSNavigationFactory.backPageNavigationOptions({navigation}, `ActionSheet`)
    };

    constructor(props) {
        super(props);

        let titles = [];
        for (let i = 0; i < 100; i++) {
            titles.push("标题" + i);
        }

        let itemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            itemModels.push(itemModel);
        }

        let mutipleItemModels = [
            {
                mainTitle: "电信",
                selected: false,
            },
            {
                mainTitle: "移动",
                selected: true,
            },
            {
                mainTitle: "联通",
                selected: true,
            },
        ];


        this.state = {
            sectionDataModels: [
                {
                    key: "ActionSheetUtil(单选直接弹出)",
                    data: [
                        {
                            title: "弹出 数据少时候，会短",
                            clickButtonHandle: (moduleModel) => {
                                CQActionSheetUtil.showDefaultPhotoCameraActionSheet(() => {
                                    CQToastUtil.showMessage("你点击了'拍摄'");
                                }, () => {
                                    CQToastUtil.showMessage("你点击了'从手机相册选择'");
                                });
                            },
                        },
                        {
                            title: "弹出 数据长时候，会长，其能滚动(选项只有主标题)'",
                            clickButtonHandle: (moduleModel) => {
                                CQActionSheetUtil.showTitles(titles, (selectedTitle, index) => {
                                    CQToastUtil.showMessage(index + ':你点击了' + selectedTitle);
                                });
                            },
                        },
                        {
                            title: "弹出 数据长时候，会长，其能滚动(选项有主标题和副标题)'",
                            clickButtonHandle: (moduleModel) => {
                                CQActionSheetUtil.showItemModels(itemModels, (itemModel, index) => {
                                    CQToastUtil.showMessage(index + ':你点击了' + itemModel.mainTitle);
                                });
                            },
                        },
                    ]
                },
                {
                    key: "ActionSheetUtil(多选)",
                    data: [
                        {
                            title: "弹出多选的列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                CQActionSheetUtil.showMultipleWithHeaderTitleAndItemModels('4G网络运营商', mutipleItemModels, (selectedItemModels) => {
                                    let selectedItemTitles = [];
                                    for (let i = 0; i < selectedItemModels.length; i++) {
                                        let selectedItemModel = selectedItemModels[i];
                                        selectedItemTitles.push(selectedItemModel.mainTitle);
                                    }
                                    let selectedResultString = selectedItemTitles.join('/');
                                    CQToastUtil.showMessage(selectedResultString);
                                })
                            },
                        },
                    ]
                },
            ],
        }
    }
}
