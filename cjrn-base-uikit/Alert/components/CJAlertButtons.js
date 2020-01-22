/**
 * CJButtons.js
 *
 * @Description: CJButtons
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-13 11:35:35
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View } from "react-native";
import { CJTheme } from '../../Theme/CJTheme';
import CJTextButton from '../../button/CJTextButton';

/**
 * 紧邻的'取消'+'确定' Buttons
 */
export class CJAlertClosedCancelOKButtons extends React.Component {
    static propTypes = {
        cancelTitle: PropTypes.string,
        cancelHandle: PropTypes.func,

        okTitle: PropTypes.string,
        okHandle: PropTypes.func,
    };


    static defaultProps = {
        cancelTitle: '取消',
        cancelHandle: () => { },

        okTitle: '确定',
        okHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return (
            <View
                style={[
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    },
                    CJTheme.style.alertButtonsStyle,
                    this.props.style,
                ]}
            >
                <CJTextButton
                    style={{ flex: 1 }}
                    textStyle={CJTheme.style.alertButtonTextStyle}
                    normalTitle={this.props.cancelTitle}
                    normalTitleColor={CJTheme.style.themeColor}
                    normalBGColor={'transparent'}
                    onPress={() => {
                        this.props.cancelHandle && this.props.cancelHandle();
                    }}
                />
                <View
                    style={{
                        height: '100%',
                        width: 1,
                        backgroundColor: CJTheme.style.separateLineColor,
                    }}
                />
                <CJTextButton
                    style={{ flex: 1 }}
                    textStyle={CJTheme.style.alertButtonTextStyle}
                    normalTitle={this.props.okTitle}
                    normalTitleColor={CJTheme.style.themeColor}
                    normalBGColor={'transparent'}
                    onPress={() => {
                        this.props.okHandle && this.props.okHandle();
                    }}
                />
                <View
                    style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: CJTheme.style.separateLineColor,
                        position: 'absolute',
                        left: 0,
                        top: 0
                    }}
                />
            </View>
        )
    }
}

/**
 * '我知道了' Button
 */
export class CJAlertIKnowButton extends React.Component {
    static propTypes = {
        iKnowTitle: PropTypes.string,
        iKnowHandle: PropTypes.func,
    };


    static defaultProps = {
        iKnowTitle: '我知道了',
        iKnowHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View
                style={[
                    {
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    },
                    CJTheme.style.alertButtonsStyle,
                    this.props.style,
                ]}
            >
                <View
                    style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: CJTheme.style.separateLineColor,
                        left: 0,
                        top: 0
                    }}
                />
                <CJTextButton
                    style={{width: '100%'}}
                    textStyle={CJTheme.style.alertButtonTextStyle}
                    normalTitle={this.props.iKnowTitle}
                    normalTitleColor={CJTheme.style.themeColor}
                    normalBGColor={'transparent'}
                    onPress={() => {
                        this.props.iKnowHandle && this.props.iKnowHandle();
                    }}
                />
            </View>
        )
    }
}
