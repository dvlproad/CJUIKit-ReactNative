import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    CJNormalPickerView,
} from '../../CJBaseUIKit/CJBaseUIKit';

export default class LKNormalPicker extends CJNormalPickerView {
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
