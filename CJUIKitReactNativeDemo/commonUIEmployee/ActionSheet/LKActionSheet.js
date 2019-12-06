// LKActionSheet.js
import React, { Component } from 'react';
import { CJActionSheet } from "../../CJBaseUIKit/CJBaseUIKit";

export default class LKActionSheet extends CJActionSheet {
    static defaultProps = {
        showHeader: false,
        headerTitle: null,

        showSeparateLine: true,
        bottomLineColor: '#eee',

        blankBGColor: 'rgba(40,40,40,0.4)',
        actionSheetStyle: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },

        itemModels: [
            {
                mainTitle: "拍摄",
            },
        ],
        clickItemHandle: (itemModel, index) => { },

        onCoverPress: () => { },
        cancelHandle: () => { },
    };
}
