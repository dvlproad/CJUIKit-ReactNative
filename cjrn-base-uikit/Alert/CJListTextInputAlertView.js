/**
 * CJListTextInputAlertView.js
 *
 * @Description: 内容为文本输入列表的弹窗AlertView
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
    ScrollView,
    Dimensions,
    FlatList,
} from 'react-native';
import PropTypes from "prop-types";

import CJBaseFlatListAlertView from './components/CJBaseFlatListAlertView';
import { CJTheme }  from '../Theme/CJTheme';
import { CJAlertIKnowButton, CJAlertClosedCancelOKButtons }  from './components/CJAlertButtons';
import { CJAlertNormalTextInput } from './components/CJAlertTextInput';

/**
 * 内容为文本输入列表的弹窗
 */
class CJBaseListInputAlertView extends CJBaseFlatListAlertView {
    static defaultProps = {
        title: null,
        keyValues: [],
        listMinimumLineSpacing: 15,
    };

    renderCollectionCell(item, index, defaultCollectCellStyle) {
        return (
            <View
                style={[
                    {
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent',
                    },
                    defaultCollectCellStyle
                ]}
            >
                <Text
                    style={{
                        height: 22,
                        fontSize: 16,
                        textAlign: 'left',
                        lineHeight:22,
                        fontSize: 13,
                    }}
                >
                    {item.key}
                </Text>
                <CJAlertNormalTextInput
                    style={{
                        marginTop: 6,
                    }}

                    placeholder={item.placeholder}
                    value={item.value}
                    onChangeText={(text) => {
                        this.state.currentText = text;
                    }}
                />
            </View>
        )
    }
}


/**
 * '取消' + '确定' AlertView
 */
export class CJCancelOKListInputAlertView extends CJBaseListInputAlertView {
    static propTypes = {
        cancelTitle: PropTypes.string,
        cancelHandle: PropTypes.func,

        okTitle: PropTypes.string,
        okHandle: PropTypes.func,
    };


    static defaultProps = {
        ...CJBaseListInputAlertView.defaultProps,
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
export class CJIKnowListInputAlertView extends CJBaseListInputAlertView {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,

        iKnowTitle: PropTypes.string,
        iKnowHandle: PropTypes.func,
    };


    static defaultProps = {
        ...CJBaseListInputAlertView.defaultProps,
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
