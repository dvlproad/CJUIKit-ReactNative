/**
 * CQDatePicker.js
 *
 * @Description: CQDatePicker
 *
 * @author      chaoqian.li
 * @date        2020-01-09 14:55:51
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    CJDatePickerView,
    CJDatePickShowType,
    CJDatePickerCreateTimeType,
    CJPickerAnimate,
} from 'cjrn-base-uikit';

import CQDateUtil from "./utils/CQDateUtil";

export var CQDatePickShowType = CJDatePickShowType;
export var CQDatePickerCreateTimeType = CJDatePickerCreateTimeType;

export default class CQDatePicker extends Component {

    static propTypes = {
        datePickShowType: PropTypes.number,         //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        datePickerCreateTimeType: PropTypes.number, //日期选择器创建的时机
        selectedDateString: PropTypes.string.isRequired, //初始化创建后第一次选择的日期
        minValidDateString: PropTypes.string,            //最小可选择的有效日期数组(太小，会滚动到这个最小)
        maxValidDateString: PropTypes.string,            //最大可选择的有效日期数组(太大，会滚动到这个最大)

        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,
        onPickerValueChange: PropTypes.func,
        unit: PropTypes.array,
        noCover:PropTypes.bool,
        onCoverPress: PropTypes.func,

        toolbarHeight: PropTypes.number,

        confirmText: PropTypes.string,
        confirmTextStyle: PropTypes.object,

        cancelText: PropTypes.string,
        cancelTextStyle: PropTypes.object,

        promptValueText: PropTypes.string,
        selectedValueText: PropTypes.string.isRequired,
        valueTextStyle: PropTypes.object,
        showValueText: PropTypes.bool,           // 是否显示文本
        shouldFixedValueText: PropTypes.bool,    // 是否固定文本(默认false，即会根据选择的值显示)
        formatDateStringFromSelectedValue: PropTypes.func,
    };

    static defaultProps = {
        datePickShowType: CQDatePickShowType.yyyyMMdd,
        datePickerCreateTimeType: CJDatePickerCreateTimeType.Free,
        formatDateStringFromSelectedValue: (selectedValues) => { },
        unit: ['年', '月', '日', '时', '分', '秒'],
        selectedDateString: null,
        minValidDateString: null,
        maxValidDateString: null,
        startYear: 1990,
        endYear: new Date().getFullYear(),
        promptValueText: '请选择日期',
        selectedValueText: '请选择日期',
        showValueText: true,        // 是否显示文本
        shouldFixedValueText: false,      // 是否固定文本(默认false，即会根据选择的值显示)
        itemHeight: 40,
        itemTextColor: 0x00000078,
        itemSelectedColor: 0x000000ff,
        noCover:false,
        onPickerCancel: ()=> { },
        onPickerConfirm: (selectedValues) => { },
        onPickerValueChange: (selectedValues) => { },
        onCoverPress: () => { },

        toolbarHeight: 44,
        removeSubviews: false,

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

        valueTextStyle: {
            fontSize: 17,
            color: '#000000',
        },
    };

    constructor(props) {
        super(props);

        let selectedValues = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
        if (props.selectedDateString) {
            selectedValues = CQDateUtil.getValuesFromString(props.selectedDateString, props.datePickShowType);
        }

        let minValidValues = [-1, -1, -1, -1, -1, -1];
        if (props.minValidDateString != null) {
            minValidValues = CQDateUtil.getValuesFromString(props.minValidDateString, props.datePickShowType);
        }

        let maxValidValues = [-1, -1, -1, -1, -1, -1];
        if (props.maxValidDateString != null) {
            maxValidValues = CQDateUtil.getValuesFromString(props.maxValidDateString, props.datePickShowType);
        }
        this.state = {
            selectedValues:selectedValues,
            minValidValues:minValidValues,
            maxValidValues:maxValidValues,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps) {
            let nextSelectedDateString = nextProps.selectedDateString;
            let nextMinValidDateString = nextProps.minValidDateString;
            let nextMaxValidDateString = nextProps.maxValidDateString;
            let {selectedDateString, minValidDateString, maxValidDateString } = this.props;

            if (nextSelectedDateString != null) {
                nextState.selectedValues = CQDateUtil.getValuesFromString(nextSelectedDateString, nextProps.datePickShowType);
            } else {
                if (nextState.selectedValues === null) {
                    nextState.selectedValues = [-1, -1, -1, -1, -1, -1];
                }
            }

            if (nextMinValidDateString != null) {
                nextState.minValidValues = CQDateUtil.getValuesFromString(nextMinValidDateString, nextProps.datePickShowType);
            } else {
                if (nextState.minValidValues === null) {
                    nextState.minValidValues = [-1, -1, -1, -1, -1, -1];
                }
            }

            if (nextMaxValidDateString != null) {
                nextState.maxValidValues = CQDateUtil.getValuesFromString(nextMaxValidDateString, nextProps.datePickShowType);
            } else {
                if (nextState.maxValidValues === null) {
                    nextState.maxValidValues = [-1, -1, -1, -1, -1, -1];
                }
            }

        }
        return true;
    }


    show() {
        this.animateView.show();
    }

    /**
     * 指定显示日期
     * @param dateString 2012-12-12 或者 12:12 或者12:12:12 结合datePickShowType
     */
    showWithDateString(dateString) {
        let selectedValues = CQDateUtil.getValuesFromString(dateString, this.props.datePickShowType);
        this.setState({
            selectedValues:selectedValues
        });
        this.animateView.show();
    }

    /**
     * 指定显示日期,无背景
     * @param dateString
     */
    showNoCoverWithDateString(dateString){
        let selectedValues = CQDateUtil.getValuesFromString(dateString, this.props.datePickShowType);
        this.setState({
            selectedValues:selectedValues
        });
        this.animateView.showNoCover();
    }

    showNoCover(){
        this.animateView.showNoCover();
    }

    dismiss() {
        this.animateView.dismiss();
    }

    render() {
        return (
            <CJPickerAnimate ref={ref => this.animateView = ref}
                 component={(
                     <CJDatePickerView
                         key={'datePicker2'}
                         unit={this.props.unit}
                         datePickShowType={this.props.datePickShowType}
                         selectedValues={this.state.selectedValues}
                         minValidValues={this.state.minValidValues}
                         maxValidValues={this.state.maxValidValues}
                         onCoverPress={this.props.onCoverPress}
                         toolbarHeight={this.props.toolbarHeight}
                         confirmText={this.props.confirmText}
                         confirmTextStyle={this.props.confirmTextStyle}
                         cancelText={this.props.cancelText}
                         cancelTextStyle={this.props.cancelTextStyle}
                         promptValueText={this.props.promptValueText}
                         selectedValueText={this.props.selectedValueText}
                         valueTextStyle={this.props.valueTextStyle}
                         showValueText={this.props.showValueText}
                         shouldFixedValueText={this.props.shouldFixedValueText}
                         formatDateStringFromSelectedValue={this.props.formatDateStringFromSelectedValue}
                         datePickerCreateTimeType={this.props.datePickerCreateTimeType}
                         onPickerValueChange={(dateValues, datePickShowType) => {
                             let dateString = CQDateUtil.getFormatDateString(dateValues, datePickShowType);
                             this.props.onPickerValueChange&&this.props.onPickerValueChange(dateString);
                         }}
                         onPickerConfirm={(dateValues, datePickShowType)=>{
                             let dateString = CQDateUtil.getFormatDateString(dateValues, datePickShowType);
                             this.dismiss();
                             this.props.onPickerConfirm&&this.props.onPickerConfirm(dateString);
                         }}
                         onPickerCancel={ () => {
                             this.dismiss();
                             this.props.onPickerCancel&&this.props.onPickerCancel();
                         }}
                     />
                 )}
                 dismissAction={()=>{

                 }}
            />
        )
    }

}
