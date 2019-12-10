//TSActionSheetPage.js
import React, { Component } from 'react';
import { LKDemoChooseBasePage } from "cjrn-demo-base";
import {
    LKActionSheet,
    LKMultipleChooseActionSheet,
    LKToast,
} from "../../lkcui/lkcui";

export default class TSActionSheetPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "单选ActionSheet",
                    data: [
                        {
                            title: "数据少时候，会短",
                            clickButtonHandle: (moduleModel) => {
                                this.photoCameraActionSheet.show();
                            },
                        },
                        {
                            title: "数据长时候，会长，其能滚动",
                            clickButtonHandle: (moduleModel) => {
                                this.longListActionSheet.show();
                            },
                        },
                    ]
                },
                { key: "多选的ActionSheet",
                    data: [
                        {
                            title: "弹出多选的列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.multipleChooseActionSheet.show();
                            },
                        },
                    ]
                },
            ],
        }
    }



    renderChooseComponents() {
        let chooseComponents = [];
        chooseComponents.push(this.getActionSheet1());
        chooseComponents.push(this.getActionSheet2());
        chooseComponents.push(this.getActionSheet3());
        return chooseComponents;
    }


    // 单选ActionSheet
    getActionSheet1(){
        return (
            <LKActionSheet ref={ref => this.photoCameraActionSheet = ref}
                           key={'photoCameraActionSheet'}
                           itemModels={[
                               {
                                   mainTitle: "拍摄",
                               },
                               {
                                   mainTitle: "从手机相册选择",
                               },
                           ]}
                           onCoverPress={() => {
                               LKToast.showMessage("你点击了背景");
                           }}
                           cancelHandle={() => {
                               LKToast.showMessage("你点击了取消");
                           }}
                           clickItemHandle={(itemModel, index) => {
                               if (index == 0) {
                                   LKToast.showMessage("你点击了'拍摄'");
                               } else {
                                   LKToast.showMessage("你点击了'从手机相册选择'");
                               }
                           }}
            />
        )
    }

    getActionSheet2() {
        let longListItemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            longListItemModels.push(itemModel);
        }

        return (
            <LKActionSheet ref={ref => this.longListActionSheet = ref}
                           key={'longListActionSheet'}
                           itemModels={longListItemModels}
                           cancelHandle={() => {
                               LKToast.showMessage("你点击了取消");
                           }}
                           clickItemHandle={(itemModel, index) => {
                               LKToast.showMessage(index + ':你点击了' + itemModel.mainTitle);
                           }}
            />
        )
    }

    getActionSheet3() {
        return (
            <LKMultipleChooseActionSheet ref={ref => this.multipleChooseActionSheet = ref}
                                         key={'multipleChooseActionSheet'}
                                         showHeader={true}
                                         headerTitle={'4G网络运营商'}
                                         itemModels={[
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
                                         ]}
                                         confirmHandle={(selectedItemModels)=>{
                                             let selectedItemTitles = [];
                                             for (let i = 0; i < selectedItemModels.length; i++) {
                                                 let selectedItemModel = selectedItemModels[i];
                                                 selectedItemTitles.push(selectedItemModel.mainTitle);
                                             }
                                             let selectedResultString = selectedItemTitles.join('/');
                                             LKToast.showMessage(selectedResultString);
                                         }}
            />
        )
    }
}
