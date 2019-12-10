import React, { Component } from 'react';
import {
    Animated, View, ViewPropTypes,
} from 'react-native';
import PropTypes from "prop-types";
const viewPropTypes = ViewPropTypes || View.propTypes;

import CJBaseBottomPicker from '../base/CJBaseBottomPicker';
import CJPickerView from '../PickerView/CJPickerView';

/**
 * 地区选择器的选择样式
 */
export var CJAreaPickShowType = {
    ProvinceCityArea: 0,/** 显示 省份-城市-地区 */
    ProvinceCity: 1,    /** 显示 省份-城市 */
}

export default class CJAreaPickerView extends CJBaseBottomPicker {
    static propTypes = {
        areaPickShowType: PropTypes.number,         //地区选择器的选择样式(默认yyyyMMdd,即只显示年月日)
        selectedValues: PropTypes.array.isRequired,
    };

    static defaultProps = {
        areaPickShowType: CJAreaPickShowType.ProvinceCityArea,

        removeSubviews: false,
        selectedValues: ['北京', '北京', '东城区'],
        areaJson: null,

        toolbarHeight: 44,

        confirmText: '确定',
        confirmTextStyle: {
            fontSize: 17,
            color: '#2F7DE1',
        },

        cancelText: '取消',
        cancelTextStyle: {
            fontSize: 17,
            color: '#2F7DE1',
        },

        promptValueText: '请选择城市',
        selectedValueText: '请选择城市',
        valueTextStyle: {
            fontSize: 17,
            color: '#000000',
        },
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
            areaData: this.getAreaData(),
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

    getAreaData() {
        let area = this.props.areaJson;
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }
            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    formatPickerData() {
        let province = [];
        let city = [];
        let county = [];
        let firstCity = null;
        let firstCountry = null;
        let areaData = this.getAreaData();
        areaData.map((pitem) => {
            for (let pname in pitem) {
                province.push(pname)
                if (pname == this.props.selectedValues[0]) {
                    pitem[pname].map(citem => {
                        for (let cname in citem) {
                            if (firstCity == null) {
                                firstCity = cname;
                            }
                            city.push(cname);
                            if (cname == this.props.selectedValues[1]) {
                                county = citem[cname];
                                if (firstCountry == null) {
                                    firstCountry = citem[cname][0];
                                }
                            }
                        }
                    });
                }
            }
        });

        if (county.indexOf(this.props.selectedValues[2]) == -1) {
            this.props.selectedValues[2] = firstCountry;
        }

        if (county.length == 0 && firstCity != null) {
            this.props.selectedValues[1] = firstCity;
            return this.formatPickerData();
        }



        return {
            pickerData: [province, city, county],
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
                        this.props.selectedValues[pickerId] = toValue;
                        this.setState({ ...this.formatPickerData(this.props.selectedValues) });
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