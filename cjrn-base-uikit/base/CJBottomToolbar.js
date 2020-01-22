import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    View,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native';

import PropTypes from "prop-types";
// const viewPropTypes = ViewPropTypes || View.propTypes;

let screenWidth = Dimensions.get('window').width;

export default class CJBottomToolbar extends Component {
    static propTypes = {
        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,

        toolbarHeight: PropTypes.number,

        confirmText: PropTypes.string,
        confirmTextStyle: PropTypes.object,

        cancelText: PropTypes.string,
        cancelTextStyle: PropTypes.object,

        valueText: PropTypes.string,
        valueTextStyle: PropTypes.object,
    };

    static defaultProps = {
        onPickerCancel: () => {},
        onPickerConfirm: () => {},

        toolbarHeight: 40,

        confirmText: '完成',
        confirmTextStyle: {
            fontSize: 17,
            color: '#172991',
        },

        cancelText: '取消',
        cancelTextStyle: {
            fontSize: 17,
            color: '#B2B2B2',
        },

        valueText: '请选择日期/地区',
        valueTextStyle: {
            fontSize: 17,
            color: '#000000',
        },
    };

    constructor(props) {
        super(props);
    }


    render() {
        let toolbarHeight = this.props.toolbarHeight;
        let cancelTextWidth = 60;
        let valueTextWidth = 210;
        let confirmTextWidth = 60;

        return (
            <View
                style={[
                    {
                        width: screenWidth,
                        height: toolbarHeight,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    },
                    this.props.style
                ]}
            >
                <TouchableOpacity
                    onPress={this.props.onPickerCancel}
                    style={{ width: cancelTextWidth, height: toolbarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[{ fontSize: 17, fontWeight: '400', color: '#B2B2B2' }, this.props.cancelTextStyle]}>
                        {this.props.cancelText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                    }}
                    style={{ width: valueTextWidth, height: toolbarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={[{ fontSize: 17, fontWeight: '400', color: '#000000' }, this.props.valueTextStyle]}
                        allowFontScaling={true}
                    >
                        {this.props.valueText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.props.onPickerConfirm}
                    style={{ width: confirmTextWidth, height: toolbarHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[{ fontSize: 17, fontWeight: '400', color: '#172991' }, this.props.confirmTextStyle]}>
                        {this.props.confirmText}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
