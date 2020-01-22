/**
 * TSDatePickerMaxMinPage.js
 *
 * @Description: 测试datePicker设定最大日期最小日期
 *
 * @author      chaoqian.li
 * @date        2019-12-04 01:08:16
 */
import React, { Component } from 'react';
import {
    CJTSTableHomeBasePage,
} from "cjrn-demo-base";

import {
    CQDatePickShowType,
    CQDatePickerUtil,
    CQDatePicker,
    CQDatePickerCreateTimeType
}from "cjrn-theme-uikit";

export default class TSDatePickerMaxMinPage extends CJTSTableHomeBasePage {
    constructor(props) {
        super(props);

        this.state = {
            selectedDateString:"2000-01-01",
            minValidDateString: null,
            maxValidDateString: null,
            datePickShowType: CQDatePickShowType.yyyyMMdd,
            unit: ['年', '月', '日', '时', '分', '秒'],
            dealIndex: 0,
            sectionDataModels: [
                {
                    key: "设置可选日期范围",
                    data: [
                        {
                            title: "无限制",
                            detailText: '2010-11-23',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 0;
                                CQDatePickerUtil.show_yyyyMMdd('2010-11-23', (dateString) => {
                                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                                },() => {
                                    alert('取消,隐藏')
                                });
                            },
                        },
                        {
                            title: "限制2005-12-02到2011-09-18",
                            detailText: '2010-11-23',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 1;
                                CQDatePickerUtil.show_yyyyMMdd_MaxMin('2010-11-23', '2005-12-02', '2011-09-18', (dateString) => {
                                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                                },() => {
                                    alert('取消,隐藏')
                                });
                            },
                        },
                        {
                            title: "完整能力版本",
                            detailText: '2010-11-23 12:23:43',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 2;
                                CQDatePickerUtil.show(CQDatePickShowType.yyyyMMddHHmmss,
                                    ['年', '月', '日','时', '分', '秒'],
                                    '2010-11-23 12:23:43',
                                    '2005-12-02 12:23:43',
                                    '2011-09-18 12:23:43',
                                    (dateString) => {
                                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                                },() => {
                                    alert('取消,隐藏')
                                },(dateString) => {
                                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                                },()=>{
                                        alert('展示出来了');
                                },()=>{

                                },60,'是',{color:'greed'},'否',
                                    {color:'red'},'这个是固定标题','请选择详细时间',
                                    {color:'red'},{color:'blue'},true);
                            },
                        },
                        {
                            title: "时间HH:mm",
                            detailText: '12:22',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 3;
                                CQDatePickerUtil.show_HHmm('12:30', (dateString) => {
                                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                                },() => {
                                    alert('取消,隐藏')
                                });
                            },
                        },
                        {
                            title: "时间HH:mm限制",
                            detailText: '12:22',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 4;
                                CQDatePickerUtil.show_HHmm_MaxMin('12:30', '2:30','22:30',(dateString) => {
                                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                                },() => {
                                    alert('取消,隐藏')
                                });
                            },
                        },
                        {
                            title: "datePicker ref方式, 无限制上下限",
                            detailText: '2100-12-30',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 5;
                                this.setState({
                                    selectedDateString:"2000-01-01",
                                    minValidDateString: null,
                                    maxValidDateString: null,
                                    datePickShowType: CQDatePickShowType.yyyyMMdd,
                                },()=>{
                                    this.datePicker.show();
                                });
                            }
                        },
                        {
                            title: "datePicker ref方式",
                            detailText: '2100-12-30',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 6;
                                this.datePicker.show();
                                this.setState({
                                    selectedDateString:"2003-05-21",
                                    minValidDateString: "1999-03-20",
                                    maxValidDateString: "2010-08-12",
                                    datePickShowType: CQDatePickShowType.yyyyMMdd,
                                    unit: ['年', '月', '日', '时', '分', '秒'],
                                },()=>{
                                    this.datePicker.show();
                                });
                            }
                        },
                        {
                            title: "datePicker ref方式:HHmm",
                            detailText: '10:30',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 7;
                                this.datePicker.show();
                                this.setState({
                                    unit: ['时', '分'],
                                    selectedDateString:"10:30",
                                    minValidDateString: "08:30",
                                    maxValidDateString: "22:30",
                                    datePickShowType: CQDatePickShowType.HHmm,
                                },()=>{
                                    this.datePicker.show();
                                });
                            }
                        },
                        {
                            title: "datePicker ref方式:HHmmss",
                            detailText: '10:30:30',
                            clickButtonHandle: (moduleModel) => {
                                this.state.dealIndex = 8;
                                this.datePicker.showNoCover();
                                this.setState({
                                    unit: ['时', '分','秒'],
                                    selectedDateString:"10:30:30",
                                    minValidDateString: "08:30:20",
                                    maxValidDateString: "22:30:15",
                                    datePickShowType: CQDatePickShowType.HHmmss,
                                },()=>{
                                    this.datePicker.showNoCover();
                                });
                            }
                        }
                    ]
                },
            ],
        }
    }

    renderChooseComponents() {
        const target = { a: 1 };
        const array = [1,2,3,4,"a"];
        const source1 = { b: 2, haha:array };

        const array2 = [1,2,3,98,"odihaha"];
        const source2 = { b: 9, e:{adad:29,jdja: 65}, haha:array2 };

        Object.assign(source1, source2);
        Object.assign(target,source1,source2);
        console.log(source1);

        let chooseComponents = [];

        chooseComponents.push(this.getDatePicker2());
        return chooseComponents;
    }


    getDatePicker2(){
        return (
            <CQDatePicker
                key={'datePicker2'}
                ref={ref => this.datePicker = ref}
                datePickShowType={this.state.datePickShowType}
                datePickerCreateTimeType={CQDatePickerCreateTimeType.Free}
                selectedDateString={this.state.selectedDateString}
                minValidDateString={this.state.minValidDateString}
                maxValidDateString={this.state.maxValidDateString}
                unit={this.state.unit}
                onPickerValueChange={(dateString)=>{
                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                }}
                onPickerConfirm={(dateString)=>{
                    this.datePicker.dismiss();
                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                }}
                onPickerCancel={(dateString)=>{
                    this.datePicker.dismiss();
                    this.updateIndexPathWithDetailText(0, this.state.dealIndex, dateString);
                }}
            />
        )
    }

}
