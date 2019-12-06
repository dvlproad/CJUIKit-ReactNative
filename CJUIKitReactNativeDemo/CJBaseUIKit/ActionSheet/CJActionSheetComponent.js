/**
 * CJActionSheetComponent.js
 *
 * @Description: 【单选】ActionSheet中含①顶部标题、②内容区域列表、③底部取消部分的整体视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-17 23:03:27
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes} from "react-native";
import {CJActionSheetTableCell} from './CJActionSheetTableView';

const viewPropTypes = ViewPropTypes || View.propTypes;
let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;

export default class CJActionSheetComponent extends Component {
    static propTypes = {
        blankBGColor: PropTypes.string,
        actionSheetStyle: viewPropTypes.style,

        showHeader: PropTypes.bool,
        headerTitle: PropTypes.string,  // 顶部标题

        onCoverPress: PropTypes.func,   // 点击阴影区域
        cancelHandle: PropTypes.func,   // 取消操作
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    static defaultProps = {
        blankBGColor: 'rgba(40,40,40,0.4)',
        actionSheetStyle: {
            // borderTopLeftRadius: 0,
            // borderTopRightRadius: 0,
        },

        showHeader: false,
        headerTitle: '',
    };

    render() {
        return (
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.blankBGColor}}
                onPress={this.props.onCoverPress}
                activeOpacity={0.9}>
                <View style={[{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff'}, this.props.actionSheetStyle]}>
                    {this.props.showHeader ? <CJActionSheetHeader actionTitle={this.props.headerTitle} /> : null}
                    {this.props.children}
                    <View style={{borderTopWidth: 10, borderTopColor: '#F1EFF0'}}></View>
                    <CJActionSheetTableCell actionName={'取消'}
                                            showBottomLine={false}
                                            onPress={this.props.cancelHandle}
                    />
                    <Text style={{backgroundColor: '#fff', height: screenBottomHeight}}
                    />

                </View>
            </TouchableOpacity>
        )
    }
}

class CJActionSheetHeader extends Component {
    static propTypes = {
        actionTitle: PropTypes.string,
    };

    static defaultProps = {
        actionTitle: '请选择',
    };

    render() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
            }}>
                <Text style={styles.titleText}>
                    {this.props.actionTitle}
                </Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    titleText: {
        height: 44,
        fontSize: 14,
        textAlign: 'center',
        lineHeight:44,
        color: '#aaa'
    },
    actionText: {
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
        color: '#333333'
    }

});
