//TSPopupManagerPage.js
import React, { Component } from 'react';
import {
    LKDemoChooseBasePage,
} from "cjrn-demo-base";
import {
    LKToast,
} from "../../lkcui/lkcui";
import { TSPopupManager } from "./TSPopupManager";

export default class TSPopupManagerPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        // 单选数据
        let singleChooseItemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            singleChooseItemModels.push(itemModel);
        }

        // 多选数据
        let mutipleChooseItemModels = [
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
                { key: "弹窗管理",
                    data: [
                        {
                            title: "弹出长列表的单选actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.popupManager.showSingleActionSheetWithItemsModels(singleChooseItemModels, (itemModel, index) => {
                                    let selectedResultString = "你点击了标题" + itemModel.mainTitle;
                                    LKToast.showMessage(selectedResultString);
                                });
                            },
                        },
                        {
                            title: "弹出多选的列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.popupManager.showMutipleChooseWithItems(mutipleChooseItemModels, (selectedItemModels)=>{
                                    let selectedItemTitles = [];
                                    for (let i = 0; i < selectedItemModels.length; i++) {
                                        let selectedItemModel = selectedItemModels[i];
                                        selectedItemTitles.push(selectedItemModel.mainTitle);
                                    }
                                    let selectedResultString = selectedItemTitles.join('/');
                                    LKToast.showMessage(selectedResultString);
                                });
                            },
                        },
                    ]
                },
            ],
        }
    }


    renderChooseComponents() {
        return (
            <TSPopupManager ref={ref => this.popupManager = ref}
            />
        )
    }
}
