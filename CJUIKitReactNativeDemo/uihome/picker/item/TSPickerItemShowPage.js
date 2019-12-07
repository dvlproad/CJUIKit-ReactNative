/**
 * TSPickerItemShowPage.js
 *
 * @Description: 测试PickerView弹出时候的各种情况
 *
 * @author      chaoqian.li
 * @date        2019-12-04 03:05:08
 */
import React, { Component } from 'react';
import {
    LKDemoChooseBasePage,
} from "../../../commonUIDemo/commonUIDemo";

import {
    LKNormalPicker,
    LKToast,
} from "../../../lkcui/lkcui";

export default class TSPickerItemShowPage extends LKDemoChooseBasePage {
    constructor(props) {
        super(props);

        this.state = {
            dealIndex: 0,

            sectionDataModels: [
                {
                    key: "弹出时选中的值",
                    data: [
                        {
                            title: "每次均为上次选中时间",
                            detailText: null,
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 0;
                                this.normalPicker.show();
                            },
                        },
                        // {
                        //     title: "每次均为指定《香港-香港-九龙城区》",
                        //     detailText: '香港-香港-九龙城区',
                        //     clickButtonHandle: (moduleModel) => {
                        //         this.state.dealIndex = 1;
                        //         this.designativeValueAreaPicker.showWithAreaSelectedValues(['香港', '香港', '九龙城区']);
                        //     },
                        // },
                    ]
                },
            ],
        }
    }


    renderChooseComponents() {
        let chooseComponents = [];
        chooseComponents.push(this.getPickerView1());
        return chooseComponents;
    }

    getPickerView1() {
        let component1 = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'];
        let component2 = ['item10', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'item19'];
        return (
            <LKNormalPicker
                ref={ref => this.normalPicker = ref}
                key={'normalPicker'}
                pickerData={[component1, component2]}
                selectedValues={['item6', 'item12']}

                onPickerSelected={(toValue) => {
                    // console.warn(toValue)
                }}
            />
        )
    }
}
