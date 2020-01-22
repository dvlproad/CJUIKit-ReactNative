/**
 * TSAreaPickerShowPage.js
 *
 * @Description: 测试areaPicker弹出时候的各种情况
 *
 * @author      chaoqian.li
 * @date        2019-12-04 03:05:08
 */
import React, { Component } from 'react';
import TSTableHomeBasePage from '../../base/TSTableHomeBasePage';


import {
    CQAreaPicker,
    CQToastUtil,
} from "cjrn-theme-uikit";

import { 
    CJPickerAnimate 
} from "cjrn-base-uikit";

export default class TSAreaPickerShowPage extends TSTableHomeBasePage {
    constructor(props) {
        super(props);

        this.state = {
            dealIndex: 0,

            sectionDataModels: [
                {
                    key: "弹出时选中的值",
                    data: [
                        {
                            title: "每次均为上次选中地区",
                            detailText: null,
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 0;
                                this.animatePicker1.show();
                                this.lastValueAreaPicker.show();
                            },
                        },
                        {
                            title: "每次均为指定《香港-香港-九龙城区》",
                            detailText: '香港-香港-九龙城区',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                this.animatePicker2.show();
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
            <CJPickerAnimate key = {'animatePicker1'} ref={ref => this.animatePicker1 = ref}
                 component={(
                     <CQAreaPicker
                         toolbarValueText={'意向城市'}
                         onPickerCancel={() => { this.animatePicker1.dismiss(); }}
                         onPickerConfirm={(selectedValues) => {
                             this.animatePicker1.dismiss();
                             let areaString = selectedValues.join('-');
                             this.updateIndexPathWithDetailText(0, this.state.dealIndex, areaString);
                         }}
                         ref={ref => this.lastValueAreaPicker = ref}
                     />
                 )}
                 dismissAction={()=>{

                 }}
            />

        )
    }

    getDatePicker2(){
        return (
            <CJPickerAnimate key = {'animatePicker2'} ref={ref => this.animatePicker2 = ref}
                 component={(
                     <CQAreaPicker
                         toolbarValueText={'请选择地区'}
                         onPickerCancel={() => {  this.animatePicker2.dismiss();}}
                         onPickerConfirm={(selectedValues) => {
                             this.animatePicker2.dismiss();
                             let areaString = selectedValues.join('-');
                             this.updateIndexPathWithDetailText(0, this.state.dealIndex, areaString);
                         }}
                         ref={ref => this.designativeValueAreaPicker = ref}
                     />
                 )}
                 dismissAction={()=>{

                 }}
            />
        )
    }
}
