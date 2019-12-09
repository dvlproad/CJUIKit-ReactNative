// LKMultipleChooseActionSheet.js
import React, { Component } from 'react';
import { CJMultipleChooseActionSheet } from 'cjrn-base-uikit';

export default class LKMultipleChooseActionSheet extends CJMultipleChooseActionSheet {
    static defaultProps = {
        showHeader: false,
        headerTitle: null,

        itemModels: [
            {
                mainTitle: "电信",
                selected: true,
            },
        ],

        onCoverPress: () => {},
        confirmHandle: (selectedItemModels)=>{},
    };

    /**
     * 显示多个选择项的Sheet
     */
    show() {
        super.show();
    }

    /**
     * 隐藏选择Sheet
     */
    hide() {
        super.hide();
    }
}
