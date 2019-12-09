// LKTextButton.js
import React, { Component } from 'react';
import { CJTextButton } from 'cjrn-base-uikit';

export default class LKTextButton extends CJTextButton {

}


export class LKBlueBGButton extends LKTextButton {
    static defaultProps = {
        normalTitle: "normalTitle",
        normalTitleColor: "#FFFFFF",
        fontSize: 17,
        onPress: () => { },
        disabled: false,
        normalBGColor: 'rgba(23, 41, 145, 1)',
        disabledBGColor: 'rgba(23, 41, 145, 0.4)',
    };
}


export class LKEditSubmitButton extends LKTextButton {
    static defaultProps = {
        selected: false,
        disabled: false,

        fontSize: 17,

        // 提交
        normalTitle: "提交",
        normalBorderWidth: 0,

        normalTitleColor: "#FFFFFF",
        normalBGColor: 'rgba(23, 41, 145, 1)',
        normalBorderColor: null,

        normalDisabledTitleColor: '#FFFFFF4C',
        normalDisabledBGColor: 'rgba(23, 41, 145, 0.4)',
        normalDisabledBorderColor: null,

        onPress: () => { },

        // 修改
        selectedTitle: "修改",
        selectedBorderWidth: 1,

        selectedTitleColor: 'rgba(23, 41, 145, 1)',
        selectedBGColor: "#FFFFFF",
        selectedBorderColor: 'rgba(23, 41, 145, 1)',

        selectedDisabledTitleColor: 'rgba(23, 41, 145, 0.4)',
        selectedDisabledBGColor: "#FFFFFF",
        selectedDisabledBorderColor: 'rgba(23, 41, 145, 0.4)',

        onSelectedPress: () => { },
    };
}

