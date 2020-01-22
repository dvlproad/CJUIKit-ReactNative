/**
 * TSPickerItemShowPage.js
 *
 * @Description: 测试PickerView弹出时候的各种情况
 *
 * @author      chaoqian.li
 * @date        2019-12-04 03:05:08
 */
import React, { Component } from 'react';
import TSTableHomeBasePage from '../../base/TSTableHomeBasePage';

import {
    CQItemsPicker,
    CQToastUtil,
} from "cjrn-theme-uikit";

export default class TSPickerItemShowPage extends TSTableHomeBasePage {
    constructor(props) {
        super(props);

        this.state = {
            dealIndex: 0,

            sectionDataModels: [
                {
                    key: "弹出时选中的值",
                    data: [
                        {
                            title: "每次均为上次选中的事项",
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
        let component1 = [];
        for (let i = 0; i < 100; i++) {
            component1.push(i);
        }

        let component2 = [];
        for (let i = 0; i < 9; i++) {
            component2.push(i);
        }
        return (
            <CQItemsPicker
                ref={ref => this.normalPicker = ref}
                key={'normalPicker'}
                toolbarValueText={'体重选择'}
                pickerData={[component1, component2]}
                selectedValues={['60', '2']}

                onPickerSelected={(toValue) => {
                    // console.warn(toValue)
                }}
            />
        )
    }
}
