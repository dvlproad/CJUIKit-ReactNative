/**
 * CJActionSheetheet.js
 *
 * @Description: 【单选】的ActionSheet
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-18 01:07:17
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {Modal, Dimensions, Platform, ViewPropTypes, View} from 'react-native';
import PropTypes from 'prop-types';
import { CJTheme } from "../Theme/CJTheme";
import CJActionSheetComponent  from "./CJActionSheetComponent";
import CJActionSheetTableView from './CJActionSheetTableView';

const viewPropTypes = ViewPropTypes || View.propTypes;
let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export default class CJActionSheet extends Component {
    static propTypes = {
        showHeader: PropTypes.bool,
        headerTitle: PropTypes.string,      //头部

        showSeparateLine: PropTypes.bool,   // 是否显示分隔线

        itemModels: PropTypes.array,
        clickItemHandle: PropTypes.func,

        onCoverPress: PropTypes.func,
        cancelHandle: PropTypes.func,
    };

    static defaultProps = {
        showHeader: false,
        headerTitle: '',

        showSeparateLine: true,

        itemModels: [
            {
                mainTitle: "拍摄",
            },
        ],
        clickItemHandle: (itemModel, index) => { },

        onCoverPress: () => { },
        cancelHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = { }
    }


    render() {
        let listMaxHeight = actionSheetMaxHeight-100;

        return (
            <CJActionSheetComponent showHeader={this.props.showHeader}
                                        headerTitle={this.props.headerTitle}
                                        blankBGColor={CJTheme.style.blankBGColor}
                                        actionSheetStyle={CJTheme.style.actionSheetStyle}
                                        onCoverPress={this.props.onCoverPress}
                                        cancelHandle={this.props.cancelHandle}
            >
                <CJActionSheetTableView actionCellHeight={50}
                                            showSeparateLine={this.props.showSeparateLine}
                                            bottomLineColor={CJTheme.style.separateLineColor}
                                            listMaxHeight={listMaxHeight}
                                            itemModels={this.props.itemModels}
                                            itemOnPress={(itemModel, index)=>{
                                                this.props.clickItemHandle && this.props.clickItemHandle(itemModel, index);
                                            }}
                />
            </CJActionSheetComponent>
        )
    }
}
