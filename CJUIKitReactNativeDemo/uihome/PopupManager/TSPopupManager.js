
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// ActionSheet
import {
    CQToastUtil,
    CQActionSheetUtil,
    CQMultipleChooseActionSheet,
} from "cjrn-theme-uikit";


export var CQPopupType = {
    ActionSheet: 0,                 /** 单选的ActionSheet */
    MultipleChooseActionSheet: 1,   /** 多选的ActionSheet */
};

export class TSPopupManager extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }


    // /**
    //  * 显示弹窗
    //  */
    // showWithPopupType(popupType) {
    //     switch (popupType) {
    //         case CQPopupType.ActionSheet: {
    //             this.singleActionSheet.show();
    //             break;
    //         }
    //         case CQPopupType.ActionSheet: {
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
        CQActionSheetUtil.showItemModels(itemModels, clickItemHandle);
    }

    /**
     * 显示多选ActionSheet
     *
     * @param itemModels    数据模型数组(包含'标题'mainTitle)
     */
    showMutipleChooseWithItems(itemModels, confirmHandle) {
        CQActionSheetUtil.showMultipleWithHeaderTitleAndItemModels('4G网络运营商', itemModels, confirmHandle);
    }



    render() {
        return (
            <View>

            </View>
        )
    }
}
