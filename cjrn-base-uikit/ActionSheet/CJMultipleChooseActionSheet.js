/**
 * CJMultipleChooseActionSheetheet.js
 *
 * @Description: 【多选】的ActionSheet
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-18 01:07:58
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

import React, { Component } from 'react';
import { Modal, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { CJTheme } from "../Theme/CJTheme";
import CJMultipleChooseActionSheetComponent  from "./CJMultipleChooseActionSheetComponent";
import CJMultipleChooseActionSheetTableView from './CJMultipleChooseActionSheetTableView';

let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export default class CJMultipleChooseActionSheet extends Component {
    static propTypes = {
        showHeader: PropTypes.bool,
        headerTitle: PropTypes.string,      //头部

        itemModels: PropTypes.array,

        onCoverPress: PropTypes.func,
        confirmHandle: PropTypes.func,
    };

    static defaultProps = {
        showHeader: false,
        headerTitle: '',

        itemModels: [
            {
                mainTitle: "电信",
                selected: true,
            },
        ],

        onCoverPress: () => {},
        confirmHandle: (selectedItemModels)=>{},
    };

    constructor(props) {
        super(props);

        this.state = { };
        this.updateItemModels(props.itemModels);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.itemModels !== nextProps.itemModels) { // PopupManager的时候需要使用，因为该出的itemModels的会各不一样的可能。
            this.updateItemModels(nextProps.itemModels);
        }
    }

    /**
     * 更新ActionSheet的数据源（不会去重绘视图）
     * @param itemModels
     */
    updateItemModels(itemModels){
        let selectedItemModels = [];
        for (let i = 0; i < itemModels.length; i++) {
            let itemModel = itemModels[i];
            if (itemModel.selected) {
                selectedItemModels.push(itemModel);
            }
        }

        this.state.selectedItemModels =  selectedItemModels;
    }


    render() {
        let listMaxHeight = actionSheetMaxHeight-100;

        let visible = this.state && this.state.visible;
        return (
            <CJMultipleChooseActionSheetComponent
                blankBGColor={CJTheme.style.blankBGColor}
                actionSheetStyle={CJTheme.style.actionSheetStyle}
                showHeader={this.props.showHeader}
                headerTitle={this.props.headerTitle}
                onCoverPress={this.props.onCoverPress}
                confirmHandle={() => {
                    this.props.confirmHandle && this.props.confirmHandle(this.state.selectedItemModels);
                }}
            >
                <CJMultipleChooseActionSheetTableView actionCellHeight={50}
                                                          listMaxHeight={listMaxHeight}
                                                          itemModels={this.props.itemModels}
                                                          clickItemCompleteBlock={(selectedItemModels)=>{
                                                              this.state.selectedItemModels = selectedItemModels;
                                                          }}
                />
            </CJMultipleChooseActionSheetComponent>
        )
    }
}
