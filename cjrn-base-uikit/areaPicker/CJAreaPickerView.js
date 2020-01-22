import React from 'react';
import {Animated, Dimensions, Platform, View, ViewPropTypes,} from 'react-native';
import PropTypes from "prop-types";
import CJPickerWheelView from '../PickerView/CJPickerWheelView';
import CJBottomToolbar from "../base/CJBottomToolbar";
import CJBaseComponent from "../PickerView/CJBaseComponent";

const viewPropTypes = ViewPropTypes || View.propTypes;

/**
 * 地区选择器的选择样式
 */
export var CJAreaPickShowType = {
    ProvinceCityArea: 0,/** 显示 省份-城市-地区 */
    ProvinceCity: 1,    /** 显示 省份-城市 */
};

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;
let actionSheetTop = 120;
let actionSheetMaxHeight = screenHeight - actionSheetTop;   //整个完整的actionSheet的最大允许高度

export default class CJAreaPickerView extends CJBaseComponent {
    static propTypes = {
        areaPickShowType: PropTypes.number,         //地区选择器的选择样式(默认yyyyMMdd,即只显示年月日)
        selectedValues: PropTypes.array.isRequired,
        shouldCreateItRightNow: PropTypes.bool,  // 是否应该马上创建它(常用于日期选择器不是从底部弹出，而是自己控制位置的场景

        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,
        onCoverPress: PropTypes.func,

        toolbarHeight: PropTypes.number,

        confirmText: PropTypes.string,
        confirmTextStyle: viewPropTypes.style,

        cancelText: PropTypes.string,
        cancelTextStyle: viewPropTypes.style,

        promptValueText: PropTypes.string,
        selectedValueText: PropTypes.string.isRequired,
        valueTextStyle: viewPropTypes.style,
        showValueText: PropTypes.bool,           // 是否显示文本
        shouldFixedValueText: PropTypes.bool,    // 是否固定文本(默认false，即会根据选择的值显示)
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

    };

    constructor(props) {
        super(props);
        this.state = {
            selectedValues: props.selectedValues
        };
    }

    componentWillMount() {
        let {pickerData} = this.formatPickerData();
        this.state.pickerData = pickerData;
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
        this.state.selectedValues = selectedValues;
        let data = this.formatPickerData();
        let pickerData = data.pickerData;
        this.setState({
            selectedValues: selectedValues,
            pickerData: pickerData,
        })
    }

    /**
     * 获取地区数据源
     * @returns {[]}
     */
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
                province.push(pname);
                if (pname === this.state.selectedValues[0]) {
                    pitem[pname].map(citem => {
                        for (let cname in citem) {
                            if (firstCity == null) {
                                firstCity = cname;
                            }
                            city.push(cname);
                            if (cname === this.state.selectedValues[1]) {
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

        if (county.indexOf(this.state.selectedValues[2]) === -1) {
            this.state.selectedValues[2] = firstCountry;
        }

        if (county.length === 0 && firstCity != null) {
            this.state.selectedValues[1] = firstCity;
            return this.formatPickerData();
        }

        return {
            pickerData: [province, city, county],
            visible: true
        };
    }

    /**
     * 获取toolbar上的文本
     * @returns {null}
     */
    getSelectedValueText() {
        return this.state.selectedValues.join('-');
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            let selectedIndex = 0;
            let length = item.length;
            for (let i = 0; i < length; i++) {
                if (item[i] === this.state.selectedValues[pickerId]) {
                    selectedIndex = i;
                    break;
                }
            }
            if (item && length > 0) {
                return <CJPickerWheelView
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    key={'picker' + pickerId}
                    list={item}
                    onPickerSelected={(toValue) => {
                        this.state.selectedValues[pickerId] = toValue;
                        this.setState({ ...this.formatPickerData() });
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

    /**
     * 重写父类实现的方法
     * @returns {*}
     */
    render() {
        let valueText = '';
        if (this.props.showValueText) {
            if (this.props.shouldFixedValueText) {
                valueText = this.props.promptValueText;
            } else {
                valueText = this.getSelectedValueText();
            }
        }

        let toolbarHeight = this.getSize(this.props.toolbarHeight); // TODO: 外界没设toolbarHeight，为什么这里会没取默认值，
        if (isNaN(toolbarHeight)) {
            toolbarHeight = 44; // 此行不仅是设置一个最小值，还起到toolbarHeight undefine 时候的防止崩溃
        }
        let validContentViewHeight = this.props.itemHeight * 5 + this.getSize(15);

        return (
            <View
                style={{
                    height: toolbarHeight + validContentViewHeight + screenBottomHeight,
                    width: screenWidth,
                    backgroundColor: '#ffffff',
                }}>
                <View style={{
                    width: screenWidth,
                    height: validContentViewHeight,
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: screenBottomHeight,
                }}
                >
                    {this.renderPicker()}
                </View>
                <CJBottomToolbar
                    style={{
                        height: toolbarHeight,
                        position: 'absolute',
                        top: 0
                    }}

                    onPickerCancel={() => {
                       this.props.onPickerCancel && this.props.onPickerCancel(this.state.selectedValues);
                    }}
                    onPickerConfirm={() => {
                        this.props.onPickerConfirm && this.props.onPickerConfirm(this.state.selectedValues);
                    }}

                    toolbarHeight={toolbarHeight}

                    confirmText={this.props.confirmText}
                    confirmTextStyle={this.props.confirmTextStyle}

                    cancelText={this.props.cancelText}
                    cancelTextStyle={this.props.cancelTextStyle}

                    valueText={valueText}
                    valueTextStyle={this.props.valueTextStyle}
                />
            </View>
        )
    }
}
