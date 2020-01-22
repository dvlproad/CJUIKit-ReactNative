/**
 * CQCycleScrollView.js
 *
 * @Description: CQCycleScrollView
 *
 * @author      chaoqian.li
 * @date        2020/1/14 8:04 下午
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {
    CJCycleScrollView
} from 'cjrn-base-uikit';


export default class CQCycleScrollView extends CJCycleScrollView {
    static propTypes = {
        ...CJCycleScrollView.propTypes,
    };

    static defaultProps = {
        ...CJCycleScrollView.defaultProps,
    };

}
