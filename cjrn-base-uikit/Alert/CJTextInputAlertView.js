/**
 * CJTextInputAlertView.js
 *
 * @Description: 各种输入的对话框(含①提示输入温度的AlertView)
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-13 12:44:56
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import { CJTheme }  from '../Theme/CJTheme';
import { CJAlertIKnowButton, CJAlertClosedCancelOKButtons }  from './components/CJAlertButtons';
import { CJAlertNormalTextInput, CJAlertTemperatureTextInput } from './components/CJAlertTextInput';

/**
 * 提示输入的AlertView基类(始终为'取消'+'确认'按钮)
 */
class CJBaseTextInputAlertView extends Component {
    static propTypes = {
        title: PropTypes.string,
        placeholder: PropTypes.string,
        inputText: PropTypes.string,
    };


    static defaultProps = {
        title: null,
        placeholder: null,
        inputText: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            currentText: props.inputText,
        }
    }


    renderInputComponent() {
        return null;
    }

    renderButtons() {
        return (
            <CJAlertClosedCancelOKButtons
                style={CJTheme.style.alertButtonsStyle}
                cancelHandle={this.props.cancelHandle}
                okHandle={() => {
                    this.props.okHandle && this.props.okHandle(this.state.currentText);
                }}
            />
        );
    }

    render() {
        let allAlertMarginVertical = CJTheme.style.alertMarginVertical;

        let alertMarginVerticals = [];
        let titleVerticalIndex = 0;
        let messageVerticalIndex = 0;
        let buttonsVerticalIndex = 0;

        alertMarginVerticals = allAlertMarginVertical.title_message_buttons;
        titleVerticalIndex = 0;
        messageVerticalIndex = 1;
        buttonsVerticalIndex = 2;

        let marginTop = alertMarginVerticals[buttonsVerticalIndex];
        let marginBottom = alertMarginVerticals[buttonsVerticalIndex+1]


        let alertTitleComponent = null;
        if (this.props.title) {
            alertTitleComponent = (
                <Text
                    style={[
                        {
                            marginTop: alertMarginVerticals[titleVerticalIndex],
                            textAlign: 'center',
                        },
                        CJTheme.style.alertTitleStyle,
                    ]}
                >
                    {this.props.title}
                </Text>
            )
        }


        let alertTextInputComponent = (
            <View
                style={[
                    {
                        marginTop: alertMarginVerticals[messageVerticalIndex],
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    },
                    CJTheme.style.alertInputStyle,
                ]}
            >
                {this.renderInputComponent()}
            </View>
        );

        return (
            <View
                style={[
                    {flexDirection: 'column', justifyContent: 'center'},
                    CJTheme.style.alertStyle,
                    this.props.style
                ]}
            >
                {alertTitleComponent}
                {alertTextInputComponent}
                <View style={{ marginTop: marginTop, marginBottom: marginBottom}}>
                    {this.renderButtons()}
                </View>
            </View>
        )
    }
}

/**
 * 提示输入正常文本的AlertView
 */
export class CJNormalTextInputAlertView extends CJBaseTextInputAlertView {
    constructor(props) {
        super(props);
        this.state = {
            currentText: props.inputText,
        }
    }

    renderInputComponent() {
        return (
            <CJAlertNormalTextInput
                placeholder={this.props.placeholder}
                value={this.props.inputText}
                onChangeText={(text) => {
                    this.state.currentText = text;
                }}
            />
        );
    }
}

/**
 * 提示输入温度的AlertView
 */
export class CJTemperatureInputAlertView extends CJBaseTextInputAlertView {
    constructor(props) {
        super(props);
        this.state = {
            currentText: props.inputText,
        }
    }

    renderInputComponent() {
        return (
            <View style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <CJAlertTemperatureTextInput
                    value={this.props.inputText}
                    onChangeText={(text) => {
                        this.state.currentText = text;
                }}/>
                <Text style={{
                    fontSize: 13,
                    color: '#B2B2B2',
                    padding: 8
                }}>℃</Text>
            </View>
        );
    }
}
