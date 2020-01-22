import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    CJIKnowMessageAlertView,
    CJCancelOKMessageAlertView,
    CJNormalTextInputAlertView,
    CJTemperatureInputAlertView,
    CJAlertAnimation,
}  from 'cjrn-base-uikit';

export class CJIKnowAlertInstance extends CJAlertAnimation {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,

        iKnowTitle: PropTypes.string,
        iKnowHandle: PropTypes.func,
    };


    static defaultProps = {
        title: null,
        message: null,

        iKnowTitle: '我知道了',
        iKnowHandle: () => { },
    };

    renderAlertView() {
        return (
            <CJIKnowMessageAlertView
                title={this.props.title}
                message={this.props.message}
                iKnowTitle={this.props.iKnowTitle}
                iKnowHandle={()=>{
                    this.hideWithAction(this.props.iKnowHandle);
                }}
            />
        )
    }
}

export class CJCancelOKAlertInstance extends CJAlertAnimation {
    static propTypes = {
        cancelTitle: PropTypes.string,
        cancelHandle: PropTypes.func,

        okTitle: PropTypes.string,
        okHandle: PropTypes.func,
    };


    static defaultProps = {
        title: null,
        message: null,

        cancelTitle: '取消',
        cancelHandle: () => { },

        okTitle: '确定',
        okHandle: () => { },
    };


    renderAlertView() {
        return (
            <CJCancelOKMessageAlertView
                title={this.props.title}
                message={this.props.message}
                cancelTitle={this.props.cancelTitle}
                cancelHandle={()=>{
                    this.hideWithAction(this.props.cancelHandle);
                }}
                okTitle={this.props.okTitle}
                okHandle={()=>{
                    this.hideWithAction(this.props.okHandle);
                }}
            />
        )
    }
}

