/**
 * CQAreaPicker.js
 *
 * @Description: CQAreaPicker
 *
 * @author      chaoqian.li
 * @date        2020-01-09 14:53:12
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    CJAreaPicker,
    CJAreaPickShowType
} from 'cjrn-base-uikit';


export default class CQAreaPicker extends CJAreaPicker {
    static propTypes = {

    };

    static defaultProps = {
        areaPickShowType: CJAreaPickShowType.ProvinceCity,
        areaPickerCreateTimeType: CJAreaPickShowType.Free,

        toolbarHeight: 40,
        // dateString: '',
        //
        // onPickerConfirm: (dateString)=>{},
        // onPickerCancel: ()=>{},
        // onPickerSelect: (dateString)=>{},
        onCoverPress: ()=>{},

        showToolbarValueText: true,
        toolbarValueText: '意向城市',
        toolbarValueFixed: true,
    };

}
