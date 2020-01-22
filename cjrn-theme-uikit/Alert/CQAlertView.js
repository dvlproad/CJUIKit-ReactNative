/**
 * CQAlertView.js
 *
 * @Description: CQAlertView
 *
 * @author      chaoqian.li
 * @date        2019-12-17 15:05:05
 */
import React, { Component } from 'react';
import {
    CJIKnowMessageAlertView,
    CJCancelOKMessageAlertView,
    CJNormalTextInputAlertView,
    CJTemperatureInputAlertView,
    // 内容为列表的 AlertView
    // CJIKnowListMessageAlertView,
    CJCancelOKListMessageAlertView,
    // CJIKnowListInputAlertView,
    CJCancelOKListInputAlertView,
} from "cjrn-base-uikit";
import { CQTheme, CQThemeType } from '../Theme/CQTheme';
import { CQPAlertIKnowButton, CQPAlertSpacedCancelOKButtons } from './components/CQPAlertButtons';

/**
 * '我知道了' 弹窗
 */
export class CQIKnowAlertView extends CJIKnowMessageAlertView {
    renderButtons() {
        if (CQTheme.themeType == CQThemeType.Partner) {
            return (
                <CQPAlertIKnowButton
                    iKnowTitle={this.props.iKnowTitle}
                    iKnowHandle={this.props.iKnowHandle}
                />
            )
        } else {
            return super.renderButtons();
        }
    }
}

/**
 * '取消'+'确认' 弹窗
 */
export class CQCancelOKAlertView extends CJCancelOKMessageAlertView {
    renderButtons() {
        if (CQTheme.themeType == CQThemeType.Partner) {
            return (
                <CQPAlertSpacedCancelOKButtons
                    cancelTitle={this.props.cancelTitle}
                    cancelHandle={this.props.cancelHandle}
                    okTitle={this.props.okTitle}
                    okHandle={this.props.okHandle}
                />
            )
        } else {
            return super.renderButtons();
        }
    }
}

/**
 * 正常文本 输入弹窗
 */
export class CQNormalTextInputAlertView extends CJNormalTextInputAlertView {
    renderButtons() {
        if (CQTheme.themeType == CQThemeType.Partner) {
            return (
                <CQPAlertSpacedCancelOKButtons
                    cancelTitle={this.props.cancelTitle}
                    cancelHandle={this.props.cancelHandle}
                    okTitle={this.props.okTitle}
                    okHandle={() => {
                        this.props.okHandle && this.props.okHandle(this.state.currentText);
                    }}
                />
            )
        } else {
            return super.renderButtons();
        }
    }
}


/**
 * 温度 输入弹窗
 */
export class CQTemperatureAlertView extends CJTemperatureInputAlertView {
    renderButtons() {
        if (CQTheme.themeType == CQThemeType.Partner) {
            return (
                <CQPAlertSpacedCancelOKButtons
                    cancelTitle={this.props.cancelTitle}
                    cancelHandle={this.props.cancelHandle}
                    okTitle={this.props.okTitle}
                    okHandle={() => {
                        this.props.okHandle && this.props.okHandle(this.state.currentText);
                    }}
                />
            )
        } else {
            return super.renderButtons();
        }
    }
}


/**
 * 列表 信息弹窗
 */
export class CQCancelOKListMessageAlertView extends CJCancelOKListMessageAlertView {
    renderButtons() {
        if (CQTheme.themeType == CQThemeType.Partner) {
            return (
                <CQPAlertSpacedCancelOKButtons
                    cancelTitle={this.props.cancelTitle}
                    cancelHandle={this.props.cancelHandle}
                    okTitle={this.props.okTitle}
                    okHandle={this.props.okHandle}
                />
            )
        } else {
            return super.renderButtons();
        }
    }
}


/**
 * 列表 信息弹窗
 */
export class CQCancelOKListInputAlertView extends CJCancelOKListInputAlertView {
    renderButtons() {
        if (CQTheme.themeType == CQThemeType.Partner) {
            return (
                <CQPAlertSpacedCancelOKButtons
                    cancelTitle={this.props.cancelTitle}
                    cancelHandle={this.props.cancelHandle}
                    okTitle={this.props.okTitle}
                    okHandle={this.props.okHandle}
                />
            )
        } else {
            return super.renderButtons();
        }
    }
}
