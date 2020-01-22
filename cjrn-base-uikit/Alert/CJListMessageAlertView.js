/**
 * CJListMessageAlertView.js
 *
 * @Description: 内容为信息列表的弹窗AlertView
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-17 11:34:51
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
} from 'react-native';
import PropTypes from "prop-types";

import CJBaseFlatListAlertView from './components/CJBaseFlatListAlertView';
import { CJTheme }  from '../Theme/CJTheme';
import { CJAlertIKnowButton, CJAlertClosedCancelOKButtons }  from './components/CJAlertButtons';

/**
 * 信息展示列表 弹窗基类
 */
class CJBaseListMessageAlertView extends CJBaseFlatListAlertView {
    static defaultProps = {
        title: null,
        keyValues: [],
        listMinimumLineSpacing: 10,
    };

    renderCollectionCell(item, index, defaultCollectCellStyle) {
        return (
            <View
                style={[
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                    },
                    defaultCollectCellStyle
                ]}
            >
                <Text
                    style={{
                        height: 22,
                        fontSize: 16,
                        textAlign: 'center',
                        lineHeight:22,
                        fontSize: 13,
                    }}
                >
                    {item.key}
                </Text>
                <Text
                    style={{
                        height: 22,
                        fontSize: 16,
                        textAlign: 'center',
                        lineHeight:22,
                        fontSize: 13,
                    }}
                >
                    {item.value}
                </Text>
            </View>
        )
    }
}

/**
 * '取消' + '确定' AlertView
 */
export class CJCancelOKListMessageAlertView extends CJBaseListMessageAlertView {
    static propTypes = {
        cancelTitle: PropTypes.string,
        cancelHandle: PropTypes.func,

        okTitle: PropTypes.string,
        okHandle: PropTypes.func,
    };


    static defaultProps = {
        ...CJBaseListMessageAlertView.defaultProps,
        title: null,
        message: null,

        cancelTitle: '取消',
        cancelHandle: () => { },

        okTitle: '确定',
        okHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }


    renderButtons() {
        return (
            <CJAlertClosedCancelOKButtons
                cancelTitle={this.props.cancelTitle}
                cancelHandle={this.props.cancelHandle}
                okTitle={this.props.okTitle}
                okHandle={this.props.okHandle}
            />
        )
    }
}

/**
 * '我知道了' AlertView
 */
export class CJIKnowListMessageAlertView extends CJBaseListMessageAlertView {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,

        iKnowTitle: PropTypes.string,
        iKnowHandle: PropTypes.func,
    };


    static defaultProps = {
        ...CJBaseListMessageAlertView.defaultProps,

        title: null,
        message: null,

        iKnowTitle: '我知道了',
        iKnowHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }


    renderButtons() {
        return (
            <CJAlertIKnowButton
                iKnowTitle={this.props.iKnowTitle}
                iKnowHandle={this.props.iKnowHandle}
            />
        )
    }
}
