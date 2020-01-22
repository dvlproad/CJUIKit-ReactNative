import React, { Component } from 'react';
import {
    CJSegmentedPageView
} from 'cjrn-base-uikit'

/**
 * tab页面滑动切换视图
 */
export default class CQSegmentedPageView extends CJSegmentedPageView {

    static defaultProps = {
        ...CJSegmentedPageView.defaultProps,

        index: 0,
        titleViewHeight: 50,
        titleStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 14,
            normalColor: '#333333',
            selectedColor: '#192B93',
            fontWeight: 'normal',
            selectedFontWeight: 'bold',
        },
        slideLineStyle: {
            color: '#192B93',
            height: 3,
            width: 30,
        }
    };

}
