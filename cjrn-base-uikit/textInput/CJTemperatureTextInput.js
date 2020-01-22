/**
 * CJTemperatureTextInput.js
 *
 * @Description: 温度输入框
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-13 10:36:54
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import { Platform, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

export default class CJTemperatureTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value}
    }

    static propTypes = {
        value: PropTypes.string,
        onChangeText: PropTypes.func,
    };


    render() {
        let keyboardType = 'numeric';
        if (Platform.OS === 'ios') {
            keyboardType = 'numbers-and-punctuation';
        }
        return <TextInput
            style={{
                fontSize: 13,
                color: '#333333',
                flex: 1,
                paddingHorizontal: 8,
                backgroundColor: 'transparent',
            }}
            keyboardType={keyboardType}
            placeholder='00.0'
            placeholderTextColor='#B2B2B2'
            value={this.state.value}
            onChangeText={(text) => {
                text = CQTemperatureUtil.dealTemperatureText(text);
                this.setState({value: text + ''});
                if (this.props.onChangeText) {
                    this.props.onChangeText(text);
                }
            }}
        />;
    }
}


export class CQTemperatureUtil {
    /**
     * 处理文本框输入的温度值
     *
     * @param text
     * @returns {*}
     */
    static dealTemperatureText(text) {
        text = text.replace(/[^\-\d\.]/g, "");  //清除“数字”、“-”和“.”以外的字符
        text = text.replace(/(\d{2})\d/g, "$1"); //数字只能连续2个
        text = text.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        if (text.indexOf(".") === 0) {
            text = text.replace(/\./g, "");
        } else {
            text = text.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        }

        text = text.replace(/\-{2,}/g, "-"); //只保留第一个. 清除多余的
        if (text.indexOf("-") === 0) {
            if (text.indexOf(".") === 1) {
                text = text.replace(/\./g, "");
            }
            text = text.replace("-", "$#$").replace(/\-/g, "").replace("$#$", "-");
        } else {
            text = text.replace(/\-/g, "");
        }
        text = text.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入1个小数
        text = text.replace(/0(\d+)/g, "$1"); //0接数字显示数字

        return text;
    }
}
