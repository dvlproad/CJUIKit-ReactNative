import React from 'react';

import {Dimensions, Platform, View} from 'react-native';

import PropTypes from "prop-types";
import CJDateUtil from "./CJDateUtil";

import CJPickerWheelView from '../PickerView/CJPickerWheelView';
import {CJDatePickerUtil, CJDatePickShowType} from './CJDatePickerUtil';
import CJBottomToolbar from '../base/CJBottomToolbar';
import CJBaseComponent from "../PickerView/CJBaseComponent";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;

/** 日期选择器创建的时机 */
export var CJDatePickerCreateTimeType = {
    Free: 0,                //当空闲的时候偷偷执行
    BeCall: 1,              //当需要调用日期选择的时候才去创建(防止进入页面时候卡顿)
    SuperViewAppear: 2,     //当其所视图显示的时候就创建(会造成初次卡顿)
};

export default class CJDatePickerView extends CJBaseComponent {
    static propTypes = {
        datePickShowType: PropTypes.number,         //日期器的选择样式(默认yyyyMMdd,即只显示年月日)
        datePickerCreateTimeType: PropTypes.number, //日期选择器创建的时机
        selectedValues: PropTypes.array.isRequired, //初始化创建后第一次选择的日期
        minValidValues: PropTypes.array,            //最小可选择的有效日期数组(太小，会滚动到这个最小)
        maxValidValues: PropTypes.array,            //最大可选择的有效日期数组(太大，会滚动到这个最大)

        onPickerCancel: PropTypes.func,
        onPickerConfirm: PropTypes.func,
        onPickerValueChange: PropTypes.func,

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
        datePickShowType: CJDatePickShowType.yyyyMMdd,
        datePickerCreateTimeType: CJDatePickerCreateTimeType.Free,
        formatDateStringFromSelectedValue: (selectedValues) => { },
        unit: ['年', '月', '日', '时', '分', '秒'],
        selectedValues: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
        minValidValues: ['-1', '-1', '-1', '-1', '-1', '-1'],
        maxValidValues: ['-1', '-1', '-1', '-1', '-1', '-1'],
        startYear: 1990,
        endYear: new Date().getFullYear(),
        promptValueText: '请选择日期',
        selectedValueText: '请选择日期',
        showValueText: true,        // 是否显示文本
        shouldFixedValueText: false,      // 是否固定文本(默认false，即会根据选择的值显示)

        itemHeight: 40,
        itemTextColor: 0x00000078,
        itemSelectedColor: 0x000000ff,
        onPickerCancel: (selectedValues) => { },
        onPickerConfirm: (selectedValues) => { },
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
        this.state = this.getDateList(props, false);
        this.state.hasCreate = (this.props.datePickerCreateTimeType === CJDatePickerCreateTimeType.SuperViewAppear);
        if (props.datePickShowType === CJDatePickShowType.HHmm ||
            props.datePickShowType === CJDatePickShowType.HHmmss ) {
            let date = new Date()
            this.props.selectedValues = [date.getHours(), date.getMinutes(), date.getSeconds()];
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps) {
            let { startYear, endYear, datePickShowType,
                selectedValues, minValidValues, maxValidValues } =  nextProps;
            let odlStartYear = this.props.startYear;
            let oldEndYear = this.props.endYear;
            let oldDatePickShowType = this.props.datePickShowType;
            let oldSelectedValues = this.props.selectedValues;
            let oldMinValidValues = this.props.minValidValues;
            let oldMaxValidValues = this.props.maxValidValues;

            let needUpdateStateValues =
                startYear !== odlStartYear ||
                endYear !== oldEndYear ||
                datePickShowType !== oldDatePickShowType ||
                JSON.stringify(selectedValues)  !== JSON.stringify(oldSelectedValues)  ||
                JSON.stringify(minValidValues) !== JSON.stringify(oldMinValidValues) ||
                JSON.stringify(maxValidValues) !== JSON.stringify(oldMaxValidValues);

            if (needUpdateStateValues) { //关联state变化的属性变化更新state
                //此处需要一个一个取值，赋值才会生效，具体原因未知
                let {pickerData,
                    selectedIndexes,
                    minSelectedIndexes,
                    maxSelectedIndexes,
                    minValidValues,
                    maxValidValues} = this.getDateList(nextProps,true);

                nextState.pickerData = pickerData;
                nextState.selectedIndexes = selectedIndexes;
                nextState.minSelectedIndexes = minSelectedIndexes;
                nextState.maxSelectedIndexes = maxSelectedIndexes;
                nextState.minValidValues = minValidValues;
                nextState.maxValidValues = maxValidValues;
            }
        }
        return true;
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            console.log("把一个定时器的引用挂在this上");
        }, 500);
    }

    render() {
        if (!this.state.hasCreate && this.props.datePickerCreateTimeType === CJDatePickerCreateTimeType.Free) {
            this.timer = setTimeout(() => {
                this.setState({
                    hasCreate: true,
                })
            }, 500);
        }

        if (this.state.hasCreate) {
            return this.createDatePicker();
        } else {
            return null;
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    /**
     * 创建弹出日期选择控制器
     * @returns {CJDatePickerView}
     */
    createDatePicker() {
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
                    {this.renderPickerWheel()}
                </View>
                <CJBottomToolbar
                    style={{
                        height: toolbarHeight,
                        position: 'absolute',
                        top: 0
                    }}

                    onPickerCancel={() => {
                        this.props.onPickerCancel && this.props.onPickerCancel(this.props.selectedValues);
                    }}
                    onPickerConfirm={() => {
                        this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValues,this.props.datePickShowType);
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
        );
    }

    renderPickerWheel() {
        if (this.state.pickerData) {
            let itemWidth = Dimensions.get('window').width / this.state.pickerData.length;
            return this.state.pickerData.map((item, pickerId) => {
                if (item) {
                    return <CJPickerWheelView
                        key={'picker' + pickerId}
                        itemTextColor={this.props.itemTextColor}
                        itemSelectedColor={this.props.itemSelectedColor}
                        list={item}
                        onPickerSelected={(toValue) => {
                            // 当前选中的值及时更新到 selectedValues中，后续根据这个值验证超限
                            // 等待优化
                            this.props.selectedValues[pickerId] = CJDatePickerUtil.removeUnit(toValue, this.props.unit[pickerId]); //去除选择时候的单位
                            this.setState({ ...this.getDateList(this.props,true) });
                        }}
                        selectedIndex={this.state.selectedIndexes[pickerId]}
                        minSelectedIndex={this.state.minSelectedIndexes[pickerId]}
                        maxSelectedIndex={this.state.maxSelectedIndexes[pickerId]}
                        fontSize={this.getSize(14)}
                        itemWidth={itemWidth}
                        itemHeight={this.props.itemHeight} />
                }
            });
        }
    }

    /**
     * 获取toolbar上的文本
     * @returns {null}
     */
    getSelectedValueText() {
        return this.props.formatDateStringFromSelectedValue(this.props.selectedValues);
    }



    /**
     * 更新默认选中的值
     * @param selectedValues
     */
    updateDefaultSelectedValues(selectedValues) {

        this.props.selectedValues = selectedValues;
        let data = this.getDateList();

        let pickerData = data.pickerData;
        let selectedIndexes = data.selectedIndexes;
        this.setState({
            selectedValues: selectedValues,
            pickerData: pickerData,
            selectedIndexes: selectedIndexes,
            forceUpdate: false
        })
    }

    /**
     * 当前面列的值达到限制，导致后面列的值超限，需要校正选中的值
     * 当界面更新的时候才会发生这个情况,才需要校正
     * 若在constructor 中调用则会发生死循环
     * @param props
     * @param selectedIndexes
     * @param pickerData
     */
    correctingSelectedValue(props, selectedIndexes, pickerData) {
        let selectedValues = [];
        for (let i = 0; i < selectedIndexes.length; i++ ) {
            let selectedIndex = selectedIndexes[i];
            selectedValues.push(CJDatePickerUtil.removeUnit(pickerData[i][selectedIndex], props.unit[i]));
        }
        props.onPickerValueChange && props.onPickerValueChange(selectedValues,this.props.datePickShowType);
    }

    /**
     * 处理最大最小 index 数组
     * @param sourceValues 年月日数据源
     * @param unit 单位数组 [年，月，日]
     * @param minSelectedIndexes
     * @param maxSelectedIndexes
     * @param defaultMinValue
     * @param defaultMaxValue
     * @param valueRow 列
     */
    dealMaxMinSelectedIndexes(props, sourceValues, unit, minSelectedIndexes, maxSelectedIndexes, defaultMinValue, defaultMaxValue, valueRow) {
        //最小
        let minSelectedValue = defaultMinValue;
        if (props.minValidValues) {
            minSelectedValue = props.minValidValues[valueRow];
        }

        let minMonthSelectedIndex = sourceValues.indexOf(minSelectedValue + unit[valueRow]);
        if (minMonthSelectedIndex === -1) {
            minMonthSelectedIndex = 0
        }
        minSelectedIndexes.push(minMonthSelectedIndex);

        //最大
        let maxSelectedValue = defaultMaxValue;
        if (props.maxValidValues) {
            maxSelectedValue = props.maxValidValues[valueRow];
        }
        let maxMonthSelectedIndex = sourceValues.indexOf(maxSelectedValue + unit[valueRow]);
        if (maxMonthSelectedIndex === -1) {
            maxMonthSelectedIndex = sourceValues.length
        }
        maxSelectedIndexes.push(maxMonthSelectedIndex)
    }

    /**
     * 前面的数字大于最小或者小于最大，后面的（月份，日期）就不需要相应的限制了
     * @param selectedIndexes
     * @param minSelectedIndexes
     * @param maxSelectedIndexes
     */
    validateIndexRegion(selectedIndexes, minSelectedIndexes, maxSelectedIndexes) {
        let isGreater = false;
        let isLess = false;
        for (let i = 0; i < selectedIndexes.length; i++ ) {
            let selectedIndex = selectedIndexes[i];
            if (isGreater) {
                minSelectedIndexes[i] = -1;
            } else {//最小值有限制
                if (selectedIndex < minSelectedIndexes[i]) {
                    selectedIndexes[i] = minSelectedIndexes[i]
                }
            }

            if (isLess) {
                maxSelectedIndexes[i] = -1;
            } else {//最大值有限制
                if (selectedIndex > maxSelectedIndexes[i]) {
                    selectedIndexes[i] = maxSelectedIndexes[i]
                }
            }

            let minSelectedIndex = minSelectedIndexes[i];
            if (selectedIndex > minSelectedIndex) {
                isGreater = true
            }

            let maxSelectedIndex = maxSelectedIndexes[i];
            if (selectedIndex < maxSelectedIndex) {
                isLess = true
            }
        }
    }

    /**
     * 获取开始何结束年份
     */
    getYearDate(isStart, year) {
        let month = '1';
        let day = "1";
        if (!isStart) {
            month = '12';
            day = '31'
        }
        return year.toString() + month + day
    }
    /**
     * 转化成日期，YYYYMMdd / YYYYMMddHHmm / YYYYMMddHHmmss
     * @param validateValues
     * @returns {null|string}
     */
    getValidDateYYMMDDHHmmss(validateValues) {
        if (validateValues.length < 2) {
            return null;
        }

        let string = '';
        for (let i = 0; i < validateValues.length; i++) {
            let fixNumber = 2;
            if (i === 0) {//年
                fixNumber = 4
            }
            string += this.getFixedDateString(validateValues[i],fixNumber)
        }
        return string
    }

    getFixedDateString(number, fixedNum) {
        return (Array(fixedNum).join(0) + number).slice(-fixedNum);
    }

    /**
     * 更新日期列表
     * @returns {{pickerData: Array, forceUpdate: *, selectedIndex: Array}}
     */
    getDateList(props, isUpdate) {
        let selectedValues = props.selectedValues;
        if (selectedValues.length < 2) {
            selectedValues = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
        }

        let unit = props.unit;
        let years = [];
        let months = [];
        let days = [];

        let startYear = props.startYear;
        let endYear = props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + unit[0]);
        }
        let selectedYear = selectedValues[0];

        let startDateStr = this.getYearDate(true, startYear);//开始年份的日期如：20120101
        let endDateStr = this.getYearDate(false, endYear);//结束年份的日期如：20120101

        let maxValidValues = props.maxValidValues;
        if (maxValidValues) {//限定最大值 和 日历结束时间比较
            let maxValidDateStr = this.getValidDateYYMMDDHHmmss(maxValidValues);
            if (CJDateUtil.compareSecondyyyyMMddDateStringLater(endDateStr, maxValidDateStr)) {
                maxValidValues = [endYear, 12, 31 ]
            }
        }

        let minValidValues = props.minValidValues;
        if (minValidValues) {//限定最小值 和 日历开始时间比较
            let minValidDateStr = this.getValidDateYYMMDDHHmmss(minValidValues);
            //最小日期值 比 开始日期 小 则 最小日期 = 开始日期
            if (CJDateUtil.compareSecondyyyyMMddDateStringLater(minValidDateStr, startDateStr)) {
                minValidValues = [startYear, 1, 1]
            }
        }

        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }

        let pickerData = [];
        let selectedIndexes = [];
        let minSelectedIndexes = [];
        let maxSelectedIndexes = [];

        let datePickShowType = props.datePickShowType;
        if (datePickShowType === CJDatePickShowType.yyyyMM ||
            datePickShowType === CJDatePickShowType.yyyyMMdd ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmmss) {
            pickerData.push(years);

            let yearSelectedIndex = years.indexOf(selectedYear + unit[0]) === -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]);
            selectedIndexes.push(yearSelectedIndex);
            this.dealMaxMinSelectedIndexes(props, years, unit, minSelectedIndexes, maxSelectedIndexes,0, years.length - 1,0);
        }

        let selectedMonth = CJDatePickerUtil.removeUnit(months[0], unit[1]);
        // 月
        if (datePickShowType === CJDatePickShowType.yyyyMM ||
            datePickShowType === CJDatePickShowType.yyyyMMdd ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmmss) {
            pickerData.push(months);
            //当前选中
            if (props.selectedValues) {
                selectedMonth = props.selectedValues[1];
            }
            let monthSelectedIndex = months.indexOf(selectedMonth + unit[1]);
            if (monthSelectedIndex === -1) {
                monthSelectedIndex = 0
            }
            selectedIndexes.push(monthSelectedIndex);
            this.dealMaxMinSelectedIndexes(props, months, unit, minSelectedIndexes, maxSelectedIndexes,0, months.length,1);
        }

        // 日
        if (datePickShowType === CJDatePickShowType.yyyyMMdd ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmmss) {
            pickerData.push(days);

            //日 数据源
            let d = new Date(selectedYear, selectedMonth, 0);
            let dayCount = d.getDate();
            for (let i = 1; i <= dayCount; i++) {
                days.push(i + unit[2]);
            }

            let selectedDay = CJDatePickerUtil.removeUnit(days[0], unit[2]);
            if (props.selectedValues) {
                selectedDay = props.selectedValues[2];
            }

            let daySelectedIndex = days.indexOf(selectedDay + unit[2]);
            if (daySelectedIndex === -1) {
                daySelectedIndex = days.length - 1;
            }
            selectedIndexes.push(daySelectedIndex);
            this.dealMaxMinSelectedIndexes(props, days, unit, minSelectedIndexes, maxSelectedIndexes,0, dayCount,2);
        }

        // 时
        if (datePickShowType === CJDatePickShowType.yyyyMMddHHmm ||
            datePickShowType === CJDatePickShowType.yyyyMMddHHmmss ||
            datePickShowType === CJDatePickShowType.HHmm ||
            datePickShowType === CJDatePickShowType.HHmmss ) {
            let hourIndex = 3;
            if (datePickShowType === CJDatePickShowType.HHmm ||
                datePickShowType === CJDatePickShowType.HHmmss ) {
                hourIndex = 0;
            }
            let hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push(i + unit[hourIndex]);
            }
            pickerData.push(hours);

            //当前选中
            let hourSelectedIndex = new Date().getHours();

            if (props.selectedValues) {
                let selectedHour = props.selectedValues[hourIndex];
                let hourSelectedIndexTemp = hours.indexOf(selectedHour + unit[hourIndex]);
                if (hourSelectedIndexTemp !== -1) {
                    hourSelectedIndex = hourSelectedIndexTemp
                }
            }
            selectedIndexes.push(hourSelectedIndex);
            this.dealMaxMinSelectedIndexes(props, hours, unit, minSelectedIndexes, maxSelectedIndexes,0, 23, hourIndex);

            // 分
            let minuteIndex = 4;
            if (datePickShowType === CJDatePickShowType.HHmm ||
                datePickShowType === CJDatePickShowType.HHmmss ) {
                minuteIndex = 1;
            }
            let minutes = [];
            for (let i = 0; i < 60; i++) {
                minutes.push(i + unit[minuteIndex]);
            }
            pickerData.push(minutes);

            let minuteSelectedIndex = new Date().getMinutes();

            if (props.selectedValues) {
                let selectedMinute = props.selectedValues[minuteIndex];
                let minuteSelectedIndexTemp = minutes.indexOf(selectedMinute + unit[minuteIndex]);
                if (minuteSelectedIndexTemp !== -1) {
                    minuteSelectedIndex = minuteSelectedIndexTemp
                }
            }
            selectedIndexes.push(minuteSelectedIndex);

            this.dealMaxMinSelectedIndexes(props, minutes, unit, minSelectedIndexes, maxSelectedIndexes,0, 59, minuteIndex);

            // 秒
            if (datePickShowType === CJDatePickShowType.yyyyMMddHHmmss ||
                datePickShowType === CJDatePickShowType.HHmmss) {
                let secondIndex = 5;
                if (datePickShowType === CJDatePickShowType.HHmmss ) {
                    secondIndex = 2;
                }
                let seconds = [];
                for (let i = 0; i <= 59; i++) {
                    seconds.push(i + unit[secondIndex]);
                }
                pickerData.push(seconds);
                let secondSelectedIndex = new Date().getSeconds();

                if (props.selectedValues) {
                    let selectedSecond = props.selectedValues[secondIndex];
                    let secondSelectedIndexTemp = seconds.indexOf(selectedSecond + unit[secondIndex]);
                    if (secondSelectedIndexTemp !== -1) {
                        secondSelectedIndex = secondSelectedIndexTemp
                    }
                }
                selectedIndexes.push(secondSelectedIndex);
                this.dealMaxMinSelectedIndexes(props, seconds, unit, minSelectedIndexes, maxSelectedIndexes,0, 59, secondIndex);
            }

        }

        this.validateIndexRegion(selectedIndexes, minSelectedIndexes, maxSelectedIndexes);
        if (isUpdate) {
            this.correctingSelectedValue(props, selectedIndexes, pickerData);
        }

        return {
            pickerData: pickerData,
            selectedIndexes: selectedIndexes,
            minSelectedIndexes: minSelectedIndexes,
            maxSelectedIndexes: maxSelectedIndexes,
            minValidValues:minValidValues,
            maxValidValues:maxValidValues
        };
    }
}
