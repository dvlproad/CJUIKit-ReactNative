/**
 * CQItemsPicker.js
 *
 * @Description: CQItemsPicker
 *
 * @author      chaoqian.li
 * @date        2020-01-09 15:02:56
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    CJNormalPickerView,
} from 'cjrn-base-uikit';

export default class CQItemsPicker extends CJNormalPickerView {
    static propTypes = {

    };

    static defaultProps = {

        toolbarHeight: 40,
        itemHeight: 40,
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
