/**
 * TSDatePickerShowPage.js
 *
 * @Description: 测试datePicker弹出时候的各种情况
 *
 * @author      chaoqian.li
 * @date        2019-12-04 01:08:16
 */
import React, { Component } from 'react';
import TSTableHomeBasePage from '../../base/TSTableHomeBasePage';

import {
    CQDatePicker,
    CQToastUtil,
} from "cjrn-theme-uikit";

export default class TSDatePickerShowPage extends TSTableHomeBasePage {
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
                            detailText: '2019-06-06',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 0;
                                this.datePicker1.show();
                            },
                        },
                        {
                            title: "每次均为指定2000-02-29",
                            detailText: '2000-02-29',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                this.datePicker2.showWithDateString('2000-02-29');
                            },
                        },
                    ]
                },
                {
                    key: "弹出时所带的蒙层",
                    data: [
                        {
                            title: "带蒙层",
                            detailText: null,
                            clickButtonHandle: (moduleModel) => {
                                this.datePicker3.show();
                            },
                        },
                        {
                            title: "不带蒙层",
                            detailText: null,
                            clickButtonHandle: (moduleModel) => {
                                this.datePicker3.showNoCover();
                            },
                        },
                    ]
                },
                {
                    key: "自定义工具栏的日期选择器",
                    data: [
                        {
                            title: "左键自定义为'重置'",
                            detailText: null,
                            clickButtonHandle: (moduleModel) => {
                                this.customToolbarDatePicker.show();
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
        chooseComponents.push(this.getDatePicker3());
        chooseComponents.push(this.getDatePicker4());
        return chooseComponents;
    }

    getDatePicker1(){
        return (
            <CQDatePicker ref={ref => this.datePicker1 = ref}
                          key={'datePicker1'}
                          selectedValues={['2019', '6', '6']}   // 不能有多余的0，如6月不能写06，而是写6
                          onPickerConfirm={(dateString)=>{
                              this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                          }}
            />
        )
    }

    getDatePicker2(){
        return (
            <CQDatePicker ref={ref => this.datePicker2 = ref}
                          key={'datePicker2'}
                          selectedValues={['2000', '2', '29']}
                          onPickerConfirm={(dateString)=>{
                              this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                          }}
            />
        )
    }

    getDatePicker3(){
        return (
            <CQDatePicker ref={ref => this.datePicker3 = ref}
                          key={'datePicker3'}
                          selectedValues={['2000', '2', '29']}
                          onPickerConfirm={(dateString)=>{
                              CQToastUtil.showMessage('我只是测试蒙层使用的datePicker')
                          }}
            />
        )
    }

    getDatePicker4(){
        return (
            <CQDatePicker ref={ref => this.customToolbarDatePicker = ref}
                          key={'customToolbarDatePicker'}
                          selectedValues={['2000', '2', '29']}
                          cancelText={'重置'}
                          cancelTextSize={17}
                          cancelTextColor={'#172991'}

                          onCoverPress={()=>{
                              CQToastUtil.showMessage('点击空白区域');
                          }}
                          onPickerConfirm={(dateString)=>{
                              CQToastUtil.showMessage('我只是测试蒙层使用的datePicker')
                          }}
            />
        )
    }
}
