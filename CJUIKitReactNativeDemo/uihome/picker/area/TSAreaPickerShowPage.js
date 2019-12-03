/**
 * TSAreaPickerShowPage.js
 *
 * @Description: 测试areaPicker弹出时候的各种情况
 *
 * @author      chaoqian.li
 * @date        2019-12-04 03:05:08
 */
import React, { Component } from 'react';
import {
    LKDemoChooseBasePage,
} from "../../../commonUIDemo/commonUIDemo";

import {
    LKAreaPicker,
    LKDatePicker,
    LKToast,
} from "../../../lkcui/lkcui";
import CJAreaPickerView from "../../../CJBaseUIKit/areaPicker/CJAreaPickerView";
import AreaJson from "./area";

export default class TSAreaPickerShowPage extends LKDemoChooseBasePage {
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
                                this.lastValueAreaPicker.show();
                            },
                        },
                        {
                            title: "每次均为指定《香港-香港-九龙城区》",
                            detailText: '香港-香港-九龙城区',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                this.designativeValueAreaPicker.showWithAreaSelectedValues(['香港', '香港', '九龙城区']);
                            },
                        },
                    ]
                },
            ],
        }
    }


    renderChooseComponents() {
        let chooseComponents = [];
        chooseComponents.push(this.getDatePicker1());
        chooseComponents.push(this.getDatePicker2());
        return chooseComponents;
    }

    getDatePicker1(){
        return (
            <LKAreaPicker
                toolbarValueText={'意向城市'}
                onPickerCancel={() => { }}
                onPickerConfirm={(selectedValues) => {
                    let areaString = selectedValues.join('-');
                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, areaString);
                }}
                ref={ref => this.lastValueAreaPicker = ref}
            />
        )
    }

    getDatePicker2(){
        return (
            <LKAreaPicker
                toolbarValueText={'请选择地区'}
                onPickerCancel={() => { }}
                onPickerConfirm={(selectedValues) => {
                    let areaString = selectedValues.join('-');
                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, areaString);
                }}
                ref={ref => this.designativeValueAreaPicker = ref}
            />
        )
    }
}
