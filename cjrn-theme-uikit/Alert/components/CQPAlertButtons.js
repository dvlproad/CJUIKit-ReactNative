/**
 * CQPAlertButtons.js
 *
 * @Description: CQPAlertButtons
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
import { CJTextButton } from "cjrn-base-uikit";
import { CQTheme } from '../../Theme/CQTheme';

/**
 * 有间隔的'取消'+'确定' Button
 */
export class CQPAlertSpacedCancelOKButtons extends React.Component {
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
        this.state = {}
    }


    render() {
        let buttonHeight = CQTheme.style.alertButtonsStyle.height;
        let buttonBorderRadius = buttonHeight/2;
        return (
            <View
                style={[
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    },
                    CQTheme.style.alertButtonsStyle,
                    this.props.style,
                ]}
            >
                <CJTextButton
                    style={{
                        flex: 1,
                        height: '100%',
                        marginLeft: 40,
                        borderRadius: buttonBorderRadius,
                    }}
                    textStyle={CQTheme.style.alertButtonTextStyle}
                    normalTitle={this.props.cancelTitle}
                    normalTitleColor={CQTheme.style.themeColor}
                    normalBGColor={'#ffffff'}
                    normalBorderWidth={0.5}
                    normalBorderColor={CQTheme.style.themeColor}
                    onPress={() => {
                        this.props.cancelHandle && this.props.cancelHandle();
                    }}
                />
                <CJTextButton
                    style={{
                        flex: 1,
                        height: '100%',
                        marginLeft: 20,
                        marginRight: 40,
                        borderRadius: buttonBorderRadius,
                    }}
                    textStyle={CQTheme.style.alertButtonTextStyle}
                    normalTitle={this.props.okTitle}
                    normalTitleColor={"#ffffff"}
                    normalBGColor={CQTheme.style.themeColor}
                    normalBorderWidth={0}
                    onPress={() => {
                        this.props.okHandle && this.props.okHandle();
                    }}
                />
            </View>
        )
    }
}


/**
 * '我知道了' Button
 */
export class CQPAlertIKnowButton extends React.Component {
    static propTypes = {
        iKnowTitle: PropTypes.string,
        iKnowHandle: PropTypes.func,
    };


    static defaultProps = {
        iKnowTitle: '我知道了',
        iKnowHandle: () => {
        },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let buttonHeight = CQTheme.style.alertButtonsStyle.height;
        let buttonBorderRadius = buttonHeight/2;
        return (
            <View
                style={[
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    },
                    CQTheme.style.alertButtonsStyle,
                    this.props.style,
                ]}
            >
                <CJTextButton
                    style={[
                        {
                            flex: 1,
                            height: '100%',
                            marginLeft: 80,
                            marginRight: 80,
                            borderRadius: buttonBorderRadius,
                        }
                    ]}
                    textStyle={CQTheme.style.alertButtonTextStyle}
                    normalTitle={this.props.iKnowTitle}
                    normalTitleColor={"#ffffff"}
                    normalBGColor={CQTheme.style.themeColor}
                    normalBorderWidth={0}
                    onPress={() => {
                        this.props.iKnowHandle && this.props.iKnowHandle();
                    }}
                />
            </View>
        )
    }
}
