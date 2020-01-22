/**
 * CQActionSheet.js
 *
 * @Description: CQActionSheet
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-20 18:04:48
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {
    CJActionSheet,
    CJMultipleChooseActionSheet,
} from "cjrn-base-uikit";

import { CQTheme } from "../Theme/CQTheme";
// import { CJTheme } from "cjrn-base-uikit";



export class CQActionSheet extends CJActionSheet {
    // static defaultProps = {
    //     // ...CJActionSheet.defaultProps,
    //
    //     showHeader: false,
    //     headerTitle: null,
    //
    //     showSeparateLine: true,
    //     bottomLineColor: '#eee',
    //
    //     itemModels: [
    //         {
    //             mainTitle: "拍摄",
    //         },
    //     ],
    //     clickItemHandle: (itemModel, index) => { },
    //
    //     onCoverPress: () => { },
    //     cancelHandle: () => { },
    // };
}


export class CQMultipleChooseActionSheet extends CJMultipleChooseActionSheet {
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
}

