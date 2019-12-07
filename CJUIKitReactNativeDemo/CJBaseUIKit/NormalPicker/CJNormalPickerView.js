import React, { Component } from 'react';
import {
    Animated,
} from 'react-native';
import PropTypes from "prop-types";
import CJBaseBottomPicker from '../base/CJBaseBottomPicker';
import CJPickerView from '../PickerView/CJPickerView';


export default class CJNormalPickerView extends CJBaseBottomPicker {
    static propTypes = {
        selectedValues: PropTypes.array.isRequired,
    };

    static defaultProps = {
        removeSubviews: false,
        selectedValues: ['北京', '东城区'],
        pickerData: [],

        toolbarHeight: 44,

        confirmText: '确定',
        confirmTextSize: 17,
        confirmTextColor: '#2F7DE1',

        cancelText: '取消',
        cancelTextSize: 17,
        cancelTextColor: '#2F7DE1',

        promptValueText: '请选择城市',
        selectedValueText: '请选择城市',
        valueTextSize: 17,
        valueTextColor: '#000000',
        showValueText: true,            // 是否显示文本
        shouldFixedValueText: false,    // 是否固定文本(默认false，即会根据选择的值显示)

        itemHeight: 40,
        itemTextColor: 0x33333378,
        itemSelectedColor: 0x333333ff,

        onPickerCancel: null,
        onPickerConfirm: (selectedValues) => {},
    }

    constructor(props) {
        super(props);
        this.state = {
            pickerData: this.getPickerData(),
            path: new Animated.Value(0),
            ...this.formatPickerData(props.selectedValues)
        };
    }

    /**
     * 更新默认选中的地区
     * @param areaString    地区字符串(形如'province-city-area',如'香港-香港-中西区')
     */
    updateDefaultSelectedAreaString(areaString) {
        let selectedValues = areaString.split("-");
        this.updateDefaultSelectedValues(selectedValues);
    }

    /**
     * 更新默认选中的值
     * @param selectedValues
     */
    updateDefaultSelectedValues(selectedValues) {
        // let data = this.getDateList();
        // this.state.pickerData = data.pickerData;
        // this.state.selectedIndex = data.selectedIndex;

        this.props.selectedValues = selectedValues;   // 不知道为什么此行设置无效，而在CJDatePickerView中设置却有效
        let selectedValueLength = selectedValues.length;
        for (let i = 0; i < selectedValueLength; i++) {
            this.props.selectedValues[i] = selectedValues[i];
        }

        let data = this.formatPickerData();

        let pickerData = data.pickerData;
        // let selectedIndex = data.selectedIndex;
        this.setState({
            selectedValues: selectedValues,
            pickerData: pickerData,
            // selectedIndex: selectedIndex,
        })
    }

    getPickerData() {
        let pickerData = this.props.pickerData;
        return pickerData;
    }

    formatPickerData() {
        let pickerData = this.getPickerData();

        // let componentPickerData1 = pickerData[0];
        // this.props.selectedValues[0] = componentPickerData1[0];

        return {
            pickerData: pickerData,
            visible: true
        };
    }

    getSelectedValueText() {
        let string = this.props.selectedValues.join('-');
        return string;
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            let selectedIndex = 0;
            let length = item.length;
            for (let i = 0; i < length; i++) {
                if (item[i] == this.props.selectedValues[pickerId]) {
                    selectedIndex = i;
                    break;
                }
            }
            if (item && length > 0) {
                return <CJPickerView
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    key={'picker' + pickerId}
                    list={item}
                    onPickerSelected={(toValue) => {
                        // this.props.selectedValues[pickerId] = toValue;
                        // this.setState({ ...this.formatPickerData(this.props.selectedValues) });
                    }}
                    selectedIndex={selectedIndex}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight} />
            } else {
                return null;
            }
        });
    }
}
