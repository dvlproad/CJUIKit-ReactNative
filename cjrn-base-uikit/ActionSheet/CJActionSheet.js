/**
 * CJActionSheet.js
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
import CJActionSheetComponent  from "./CJActionSheetComponent";
import CJActionSheetTableView from './CJActionSheetTableView';

const viewPropTypes = ViewPropTypes || View.propTypes;
let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export class CJActionSheet extends Component {
    static propTypes = {
        showHeader: PropTypes.bool,
        headerTitle: PropTypes.string,      //头部

        showSeparateLine: PropTypes.bool,   // 是否显示分隔线
        bottomLineColor: PropTypes.string,  // 分割线的颜色

        blankBGColor: PropTypes.string,
        actionSheetStyle: viewPropTypes.style,

        itemModels: PropTypes.array,
        clickItemHandle: PropTypes.func,

        onCoverPress: PropTypes.func,
        cancelHandle: PropTypes.func,
    };

    static defaultProps = {
        showHeader: false,
        headerTitle: '',

        showSeparateLine: true,
        bottomLineColor: '#eee',

        blankBGColor: 'rgba(40,40,40,0.4)',
        actionSheetStyle: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },

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
        this.state = {

        }
    }

    /**
     * 显示多个选择项的Sheet
     */
    show() {
        this.setState({
            visible: true,
        })
    }

    /**
     * 隐藏选择Sheet
     */
    hide() {
        this.setState({
            visible: false,
        })
    }

    dealAction = (action) => {
        action && setTimeout(action, 200);
    }

    render() {
        let listMaxHeight = actionSheetMaxHeight-100;

        return (
            <CJActionSheetFactory visible={this.state.visible}
                                  animationType={'none'}
                                  showHeader={this.props.showHeader}
                                  headerTitle={this.props.headerTitle}
                                  blankBGColor={this.props.blankBGColor}
                                  actionSheetStyle={this.props.actionSheetStyle}
                                  onCoverPress={() => {
                                      this.hide();
                                      this.dealAction(this.props.onCoverPress);
                                  }}
                                  cancelHandle={() => {
                                      this.hide();
                                      this.dealAction(this.props.cancelHandle);
                                  }}
            >
                <CJActionSheetTableView actionCellHeight={50}
                                        showSeparateLine={this.props.showSeparateLine}
                                        bottomLineColor={this.props.bottomLineColor}
                                        listMaxHeight={listMaxHeight}
                                        itemModels={this.props.itemModels}
                                        itemOnPress={(itemModel, index)=>{
                                            this.hide();
                                            this.dealAction(this.props.clickItemHandle(itemModel, index));
                                        }}
                />
            </CJActionSheetFactory>
        )
    }
}



export class CJActionSheetFactory extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        animationType: PropTypes.string, //模态弹出效果

        blankBGColor: PropTypes.string,
        actionSheetStyle: viewPropTypes.style,

        showHeader: PropTypes.bool,
        headerTitle: PropTypes.string, //头部

        onCoverPress: PropTypes.func,
        cancelHandle: PropTypes.func, // 取消操作

        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        visible: false,
        animationType: 'slide',

        blankBGColor: 'rgba(40,40,40,0.4)',
        actionSheetStyle: {
            // borderTopLeftRadius: 0,
            // borderTopRightRadius: 0,
        },

        showHeader: false,
        headerTitle: '',
    };


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                   animationType={this.props.animationType}
                   transparent={true}
                   onRequestClose={() => { }}
            >
                <CJActionSheetComponent
                    showHeader={this.props.showHeader}
                    headerTitle={this.props.headerTitle}
                    blankBGColor={this.props.blankBGColor}
                    actionSheetStyle={this.props.actionSheetStyle}
                    onCoverPress={this.props.onCoverPress}
                    cancelHandle={this.props.cancelHandle}
                    children={this.props.children}
                />
            </Modal>
        );
    }
}
