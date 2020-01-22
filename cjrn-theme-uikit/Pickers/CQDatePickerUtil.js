/**
 * CQDatePickerUtil.js
 *
 * @Description: CQDatePickerUtil
 *
 * @author      chaoqian.li
 * @date        2020-01-09 14:51:55
 */
import React from 'react';
import {
    CQDatePickerView,
    CQDatePickShowType,
    CJPickerContainer,
    CJDatePickerCreateTimeType
} from 'cjrn-base-uikit';

import CQDateUtil from "./utils/CQDateUtil";
import Overlay from "teaset/components/Overlay/Overlay";

export default class CQDatePickerUtil {

    /**
     * 普通选择日期，没有值范围限制
     * @param selectedDateString 设置当前选中日期，字符串类型  格式：2020-12-30
     * @param onPickerConfirm   (dateString)=>{}
     * @param onPickerCancel    ()=>{}
     */
    static show_yyyyMMdd(selectedDateString, onPickerConfirm, onPickerCancel) {
        this.show_yyyyMMdd_MaxMin(selectedDateString, null, null, onPickerConfirm, onPickerCancel);
    }

    /**
     * 选择日期，支持设置上下限
     * @param selectedDateString 设置当前选中日期，字符串类型  格式：2020-12-30
     * @param minValidDateString 设置最小日期，字符串类型  格式：2000-01-01
     * @param maxValidDateString 设置最大日期，字符串类型  格式：2030-12-30
     * @param onPickerConfirm   (dateString)=>{}
     * @param onPickerCancel    ()=>{}
     */
    static show_yyyyMMdd_MaxMin(selectedDateString, minValidDateString, maxValidDateString, onPickerConfirm, onPickerCancel) {
        this.show(CQDatePickShowType.yyyyMMdd,['年', '月', '日'], selectedDateString, minValidDateString,
            maxValidDateString, onPickerConfirm, onPickerCancel);
    }

    /**
     * 普通选择时间(小时:分钟)
     * @param selectedDateString
     * @param onPickerConfirm   (dateString)=>{}
     * @param onPickerCancel    ()=>{}
     */
    static show_HHmm(selectedDateString, onPickerConfirm, onPickerCancel) {
        this.show_HHmm_MaxMin(selectedDateString, null, null, onPickerConfirm, onPickerCancel);
    }

    /**
     * 选择时间(小时:分钟)，支持设置上下限
     * @param selectedDateString 设置当前选中时间，字符串类型  格式：12:30
     * @param minValidDateString 设置最小时间，字符串类型  格式：02:30
     * @param maxValidDateString 设置最大时间，字符串类型  格式：22:30
     * @param onPickerConfirm   (dateString)=>{}
     * @param onPickerCancel    ()=>{}
     */
    static show_HHmm_MaxMin(selectedDateString, minValidDateString, maxValidDateString, onPickerConfirm, onPickerCancel) {
        this.show(CQDatePickShowType.HHmm, ['时', '分'], selectedDateString, minValidDateString, maxValidDateString, onPickerConfirm, onPickerCancel)
    }

    /**
     *
     * @param datePickShowType
     * @param unit
     * @param selectedDateString
     * @param minValidDateString
     * @param maxValidDateString
     * @param onPickerConfirm
     * @param onPickerCancel
     * @param onPickerValueChange
     * @param showCallback
     * @param hideCallback
     * @param toolbarHeight
     * @param confirmText
     * @param confirmTextStyle
     * @param cancelText
     * @param cancelTextStyle
     * @param promptValueText
     * @param selectedValueText
     * @param valueTextStyle
     * @param showValueText
     * @param shouldFixedValueText
     */
    static show(datePickShowType, unit, selectedDateString, minValidDateString, maxValidDateString,
                onPickerConfirm, onPickerCancel, onPickerValueChange, showCallback, hideCallback,
                toolbarHeight, confirmText, confirmTextStyle, cancelText, cancelTextStyle,
                promptValueText, selectedValueText, valueTextStyle, showValueText, shouldFixedValueText) {

        let selectedValues = CQDateUtil.getValuesFromString(selectedDateString, datePickShowType);

        let minValidValues = [-1, -1, -1, -1, -1, -1];
        if (minValidDateString != null) {
            minValidValues = CQDateUtil.getValuesFromString(minValidDateString, datePickShowType);
        }

        let maxValidValues = [-1, -1, -1, -1, -1, -1];
        if (maxValidDateString != null) {
            maxValidValues = CQDateUtil.getValuesFromString(maxValidDateString, datePickShowType);
        }

        let element = (
            <CQDatePickerView
                key={'datePicker2'}
                datePickShowType={datePickShowType}
                selectedValues={selectedValues}
                minValidValues={minValidValues}
                maxValidValues={maxValidValues}
                datePickerCreateTimeType = {CJDatePickerCreateTimeType.SuperViewAppear}
                onPickerValueChange={(dateValues, datePickShowType) => {
                    let dateString = CQDateUtil.getFormatDateString(dateValues, datePickShowType);
                    onPickerValueChange&&onPickerValueChange(dateString);
                }}
                onPickerConfirm={(dateValues, datePickShowType)=>{
                    let dateString = CQDateUtil.getFormatDateString(dateValues, datePickShowType);
                    // this.hide(hideCallback);
                    this.lkrn_employee_datePickerView.close();
                    onPickerConfirm&&onPickerConfirm(dateString);
                }}
                onPickerCancel={()=>{
                    // this.hide(hideCallback);
                    this.lkrn_employee_datePickerView.close();
                    onPickerCancel&&onPickerCancel()
                }}
                unit={unit}
                toolbarHeight={toolbarHeight}
                confirmText={confirmText}
                confirmTextStyle={confirmTextStyle}
                cancelText={cancelText}
                cancelTextStyle={cancelTextStyle}
                promptValueText={promptValueText}
                selectedValueText={selectedValueText}
                valueTextStyle={valueTextStyle}
                showValueText={showValueText}
                shouldFixedValueText={shouldFixedValueText}
            />
        );

        let view = (
            <Overlay.PullView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.lkrn_employee_datePickerView = v)}>
                {element}
            </Overlay.PullView>
        );

        Overlay.show(view);
        // CJPickerContainer.add(element, showCallback, hideCallback);
    }

    static hide(hideCallback) {
        CJPickerContainer.hide(hideCallback);
    }

    static remove() {
        CJPickerContainer.remove()
    }
}
