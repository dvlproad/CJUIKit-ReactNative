/**
 * CQTextButton.js
 *
 * @Description: CQTextButton
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019/06/21 10:46:56
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {
    CJTextButton,
    CJThemeNormalSelectedButton,
    CJThemeBGButton,
    CJThemeBorderButton,
} from "cjrn-base-uikit";
import { CQTheme, CQThemeType } from '../Theme/CQTheme';

export default class CQTextButton extends CJTextButton {

}

export class CQThemeBGButton extends CJThemeBGButton {

}

export class CQThemeBorderButton extends CJThemeBorderButton {

}


export class CQThemeNormalSelectedButton extends CJThemeNormalSelectedButton {
    static defaultProps = {
        ...CJTextButton.defaultProps,

        selected: false,
        disabled: false,

        fontSize: 17,

        // 提交
        normalTitle: "提交",
        onPress: () => { },

        // 修改
        selectedTitle: "修改",
        onSelectedPress: () => { },
    };
}

