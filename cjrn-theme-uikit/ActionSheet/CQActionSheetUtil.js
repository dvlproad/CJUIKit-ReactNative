/**
 * CQActionSheetUtil.js
 *
 * @Description: CQActionSheetUtil
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-31 17:47:24
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import { Overlay } from 'teaset';
import {
    CQActionSheet,
    CQMultipleChooseActionSheet
} from './CQActionSheet';

export default class CQActionSheetUtil {
    /**
     * 显示相册弹窗
     * @param cancelHandle
     * @param clickItemHandle
     */
    static showDefaultPhotoCameraActionSheet(takePhotoHandle, choosePhotoHandle) {
        let view = (
            <Overlay.PullView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.lkrn_employee_photoCameraActionSheet = v)}>
                <CQActionSheet
                    itemModels={[
                        {
                            mainTitle: "拍摄",
                        },
                        {
                            mainTitle: "从手机相册选择",
                        },
                    ]}
                    onCoverPress={() => {
                        this.lkrn_employee_photoCameraActionSheet.close();
                        // console.log("你点击了背景");
                    }}
                    cancelHandle={() => {
                        this.lkrn_employee_photoCameraActionSheet.close();
                        // console.log("你点击了取消");
                    }}
                    clickItemHandle={(itemModel, index) => {
                        this.lkrn_employee_photoCameraActionSheet.close();
                        if (index == 0) {
                            // console.log("你点击了'拍摄'");
                            takePhotoHandle && takePhotoHandle();
                        } else {
                            // console.log("你点击了'从手机相册选择'");
                            choosePhotoHandle && choosePhotoHandle();
                        }
                    }}
                />
            </Overlay.PullView>
        );
        Overlay.show(view);
    }


    /**
     * 显示长文本的列表
     *
     * @param itemTitles        ["拍摄", "从手机相册选择"]
     * @param clickTitleHandle  (title, index) => { }
     */
    static showTitles(itemTitles, clickTitleHandle) {
        let longListItemModels = [];

        let itemModelCount = itemTitles.length;
        for (let i = 0; i < itemModelCount; i++) {
            let itemTitle = itemTitles[i];

            let itemModel = new Map();
            itemModel.mainTitle = itemTitle;
            longListItemModels.push(itemModel);
        }

        this.showItemModels(longListItemModels,(itemModel, index) => {
            clickTitleHandle && clickTitleHandle(itemModel.mainTitle, index);
        });
    }


    /**
     * 显示长文本的列表
     *
     * @param itemTitles        [{mainTitle: "拍摄"}, {mainTitle: "从手机相册选择"}]
     * @param clickTitleHandle  (itemModel, index) => { }
     */
    static showItemModels(itemModels, clickTitleHandle) {
        let view = (
            <Overlay.PullView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.lkrn_employee_longListActionSheet = v)}>
                <CQActionSheet itemModels={itemModels}
                               cancelHandle={() => {
                                   this.lkrn_employee_longListActionSheet.close();
                               }}
                               clickItemHandle={(itemModel, index) => {
                                   this.lkrn_employee_longListActionSheet.close();
                                   clickTitleHandle && clickTitleHandle(itemModel, index);
                               }}
                />
            </Overlay.PullView>
        );
        Overlay.show(view);
    }


    /**
     * 显示多选的ActionSheet
     * 
     * @param headerTitle       '4G网络运营商'
     * @param itemModels        [{mainTitle: "电信",selected: false}, {mainTitle: "移动", selected: true}, { mainTitle: "联通", selected: true}]
     * @param confirmHandle     (selectedItemModels)=>{ }
     */
    static showMultipleWithHeaderTitleAndItemModels(headerTitle, itemModels, confirmHandle) {
        let view = (
            <Overlay.PullView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.lkrn_employee_multipleChooseActionSheet = v)}>
                <CQMultipleChooseActionSheet showHeader={true}
                                             headerTitle={headerTitle}
                                             itemModels={itemModels}
                                             confirmHandle={(selectedItemModels)=>{
                                                 // let selectedItemTitles = [];
                                                 // for (let i = 0; i < selectedItemModels.length; i++) {
                                                 //     let selectedItemModel = selectedItemModels[i];
                                                 //     selectedItemTitles.push(selectedItemModel.mainTitle);
                                                 // }
                                                 // let selectedResultString = selectedItemTitles.join('/');
                                                 // CQToastUtil.showMessage(selectedResultString);
                                                 this.lkrn_employee_multipleChooseActionSheet.close();
                                                 confirmHandle && confirmHandle(selectedItemModels);
                                             }}
                />
            </Overlay.PullView>
        );
        Overlay.show(view);
    }
}
