
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// ActionSheet
import {
    LKToast,
    LKActionSheet,
    LKMultipleChooseActionSheet,
} from "../../lkcui/lkcui";


export var LKPopupType = {
    ActionSheet: 0,                 /** 单选的ActionSheet */
    MultipleChooseActionSheet: 1,   /** 多选的ActionSheet */
};

export class TSPopupManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingComponent: null,

            singleActionSheetItemModels: [],
            singleActionSheetClickItemHandle: (itemModel, index) => { },

            multipleActionSheetItemModels: [],
            multipleActionSheetConfirmHandle: (selectedItemModels) => { },
        }
    }


    // /**
    //  * 显示弹窗
    //  */
    // showWithPopupType(popupType) {
    //     switch (popupType) {
    //         case LKPopupType.ActionSheet: {
    //             this.singleActionSheet.show();
    //             break;
    //         }
    //         case LKPopupType.ActionSheet: {
    //             this.multipleActionSheet.show();
    //             break;
    //         }
    //     }
    // }


    /**
     * 显示单选ActionSheet
     *
     * @param itemModels    数据模型数组(包含'标题'mainTitle)
     */
    showSingleActionSheetWithItemsModels(itemModels, clickItemHandle) {
        this.setState({
            singleActionSheetItemModels: itemModels,
            singleActionSheetClickItemHandle: clickItemHandle,
        }, () =>{
            this.singleActionSheet.show();
        });
    }

    /**
     * 显示多选ActionSheet
     *
     * @param itemModels    数据模型数组(包含'标题'mainTitle)
     */
    showMutipleChooseWithItems(itemModels, confirmHandle) {
        this.setState({
            multipleActionSheetItemModels: itemModels,
            multipleActionSheetConfirmHandle: confirmHandle,
        }, () =>{
            this.multipleActionSheet.show();
        });
    }



    render() {
        return (
            <View>
                <LKActionSheet ref={ref => this.singleActionSheet = ref}
                               itemModels={this.state.singleActionSheetItemModels}
                               onCoverPress={() => {
                                   LKToast.showMessage("你点击了背景");
                               }}
                               cancelHandle={() => {
                                   LKToast.showMessage("你点击了取消");
                               }}
                               clickItemHandle={this.state.singleActionSheetClickItemHandle}
                />
                <LKMultipleChooseActionSheet ref={ref => this.multipleActionSheet = ref}
                                             headerTitle={'4G网络运营商'}
                                             itemModels={this.state.multipleActionSheetItemModels}
                                             confirmHandle={(selectedItemModels)=>{
                                                 if (this.state.multipleActionSheetConfirmHandle) {
                                                     this.state.multipleActionSheetConfirmHandle(selectedItemModels);
                                                 }
                                             }}
                />
            </View>
        )
    }
}
