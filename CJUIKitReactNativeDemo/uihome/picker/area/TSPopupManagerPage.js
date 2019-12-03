//TSPopupManagerPage.js
import React, { Component } from 'react';
import {
    LKDemoChooseBasePage,
    LKToast,
    LKAreaPicker,
} from "../../../lkcui/lkcui";

export default class TSPopupManagerPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        let itemModels = [];
        for (let i = 0; i < 100; i++) {
            let itemModel = new Map();
            itemModel.mainTitle = "标题" + i;
            itemModel.actionBlock = () => {
                let selectedResultString = "你点击了标题" + itemModel.mainTitle;
                LKToast.showMessage(selectedResultString);
            }

            itemModels.push(itemModel);
        }

        this.state = {
            itemModels: itemModels,

            sectionDataModels: [
                { key: "弹窗管理",
                    data: [
                        {
                            title: "弹出长列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                // this.popupManager.showWithItems(this.state.itemModels);
                                this.lastValueAreaPicker.showWithLastAreaSelectedValues((selectedValues)=>{
                                    let string = selectedValues.join('-');
                                    LKToast.showMessage(string);
                                });
                            },
                        },
                        {
                            title: "弹出多选的列表actionSheet",
                            clickButtonHandle: (moduleModel) => {
                                this.designativeValueAreaPicker.showWithAreaSelectedValues(['香港', '香港', '九龙城区'], (selectedValues)=>{
                                    let string = selectedValues.join('-');
                                    LKToast.showMessage(string);
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
            <LKAreaPicker
                toolbarValueText={'意向城市'}
                onPickerCancel={() => { }}
                onPickerConfirm={(selectedValues) => {
                    LKToast.showMessage(selectedValues);
                }}
                ref={ref => this.lastValueAreaPicker = ref}
            />
        )
    }
}
