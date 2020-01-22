/**
 * TSAlertPage.js
 *
 * @Description: TSAlertPage
 *
 * @author      chaoqian.li
 * @date        2019/07/21 1:29 下午
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {CJTSNavigationFactory, CJTSTableHomeBasePage, CJTSTableHomeWithRightBasePage} from "cjrn-demo-base";
import {
    CQAlertUtil,
    CQToastUtil,
} from "cjrn-theme-uikit";

import {
    CJIKnowAlertInstance,
    CJCancelOKAlertInstance,
} from './CJAlertInstance';


export default class TSAlertPage extends CJTSTableHomeBasePage {
    static navigationOptions = ({navigation}) => {
        return CJTSNavigationFactory.backPageNavigationOptions({navigation}, `Alert`)
    };

    constructor(props) {
        super(props);

        let string = '添加的图片数量超过限制';
        let longString = '';
        for (let i = 0; i < 0; i++) {
            longString += i + string + ';';
        }

        this.state = {
            sectionDataModels: [
                { key: "AlertUtil(信息展示)",
                    data: [
                        {
                            title: "我知道了！",
                            clickButtonHandle: (moduleModel) => {
                                CQAlertUtil.showIKnowAlert('添加的图片数量超过限制', longString, ()=>{
                                    CQToastUtil.showMessage('我知道了');
                                });
                            },
                        },
                        {
                            title: "确认删除图片？",
                            clickButtonHandle: (moduleModel) => {
                                CQAlertUtil.showCancelOKAlert('提示', '确定删除选中图片', ()=>{
                                    CQToastUtil.showMessage('取消删除');
                                }, ()=>{
                                    CQToastUtil.showMessage('确定删除');
                                });
                            },
                        },
                    ]
                },
                { key: "AlertUtil(文本输入)",
                    data: [
                        {
                            title: "弹出输入基本的文本的的AlertView(无文本)",
                            clickButtonHandle: (moduleModel) => {
                                CQAlertUtil.showNormalTextInputAlert('手动输入SN码', '请输入SN码', null, (temperatureString) => {

                                });
                            },
                        },
                        {
                            title: "弹出输入基本的文本的的AlertView(有文本)",
                            clickButtonHandle: (moduleModel) => {
                                CQAlertUtil.showNormalTextInputAlert('手动输入SN码', '请输入SN码','dffe', (temperatureString) => {

                                });
                            },
                        },
                        // {
                        //     title: "弹出输入温度的AlertView",
                        //     clickButtonHandle: (moduleModel) => {
                        //         CQAlertUtil.showTemperatureAlert('填写温度', '00.0', '27', (temperatureString) => {
                        //
                        //         });
                        //     },
                        // },
                    ]
                },
                { key: "AlertUtil(信息展示列表)",
                    data: [
                        {
                            title: "列表信息展示(单个)",
                            clickButtonHandle: (moduleModel) => {
                                let keyValues = [
                                    {
                                        'key': '23位码',
                                        'value': '09876543211234567890987'
                                    },
                                ];

                                CQAlertUtil.showCancelOKListMessageAlert('请确认扫描结果', keyValues, ()=>{
                                    CQToastUtil.showMessage('确认');
                                });
                            },
                        },
                        {
                            title: "列表信息展示(多个)",
                            clickButtonHandle: (moduleModel) => {
                                let keyValues = [
                                    {
                                        'key': '23位码',
                                        'value': '09876543211234567890987'
                                    },
                                    {
                                        'key': 'SN码',
                                        'value': '0987654321234567890'
                                    },
                                ];

                                CQAlertUtil.showCancelOKListMessageAlert('请确认扫描结果', keyValues, ()=>{
                                    CQToastUtil.showMessage('确认');
                                });
                            },
                        },
                    ]
                },
                { key: "AlertUtil(文本输入列表)",
                    data: [
                        {
                            title: "列表文本输入(单个)",
                            clickButtonHandle: (moduleModel) => {
                                let keyValues = [
                                    {
                                        'key': 'SN码',
                                        'placeholder': '请输入SN码',
                                        'value': null,
                                    },
                                ];

                                CQAlertUtil.showCancelOKListInputAlert('请确认扫描结果', keyValues, ()=>{
                                    CQToastUtil.showMessage('确认');
                                });
                            },
                        },
                        {
                            title: "列表文本输入(多个)",
                            clickButtonHandle: (moduleModel) => {
                                let keyValues = [
                                    {
                                        'key': 'SN码',
                                        'placeholder': '请输入SN码',
                                        'value': null,
                                    },
                                    {
                                        'key': 'MAC码',
                                        'placeholder': '请输入MAC码',
                                        'value': null,
                                    },
                                ];

                                CQAlertUtil.showCancelOKListInputAlert('请确认扫描结果', keyValues, ()=>{
                                    CQToastUtil.showMessage('确认');
                                });
                            },
                        },
                    ]
                },
                { key: "AlertInstance",
                    data: [
                        {
                            title: "我知道了！",
                            clickButtonHandle: (moduleModel) => {
                                this.iKnowAlert.show();
                            },
                        },
                        {
                            title: "确认删除图片？",
                            clickButtonHandle: (moduleModel) => {
                                this.cancelOKAlert.show();
                            },
                        },
                    ]
                },
            ],
        }
    }


    renderChooseComponents() {
        let chooseComponents = [];
        chooseComponents.push(this.getAlert1());
        chooseComponents.push(this.getAlert2());
        return chooseComponents;
    }


    // '我知道了' AlertView
    getAlert1(){
        return (
            <CJIKnowAlertInstance ref={ref => this.iKnowAlert = ref}
                                      key={'iKnowAlert'}
                                      message={'添加的图片数量超过限制'}
                                      iKnowTitle={'我知道了'}
                                      iKnowHandle={() => {
                                          CQToastUtil.showMessage("你点击了我知道了");
                                      }}
            />
        )
    }

    // '取消'+'确定' AlertView
    getAlert2() {
        return (
            <CJCancelOKAlertInstance ref={ref => this.cancelOKAlert = ref}
                                         key={'cancelOKAlert'}
                                         title={'提示'}
                                         message={'添加的图片数量超过限制'}
                                         cancelHandle={() => {
                                             CQToastUtil.showMessage("你点击了取消");
                                         }}
                                         okHandle={() => {
                                             CQToastUtil.showMessage("你点击了确认");
                                         }}
            />
        )
    }
}

