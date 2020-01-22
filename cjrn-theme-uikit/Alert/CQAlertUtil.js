/**
 * CQAlertUtil.js
 *
 * @Description: 弹窗显示工具
 *
 * @author      chaoqian.li
 * @date        2019-12-17 14:59:38
 */
import React, { Component } from 'react';
import { Overlay } from 'teaset';
import CQToastUtil from '../Toast/CQToastUtil';
import {
    CQIKnowAlertView,
    CQCancelOKAlertView,
    CQNormalTextInputAlertView,
    CQTemperatureAlertView,

    // 内容为列表的 AlertView
    CQCancelOKListMessageAlertView,
    CQCancelOKListInputAlertView,
} from './CQAlertView';

export default class CQAlertUtil {
    /**
     * 显示 '我知道了' AlertView
     * @param title         弹窗标题(可为null)
     * @param message       弹窗信息(可为null)
     * @param iKnowHandle   按钮点击事件  ()=>{}
     */
    static showIKnowAlert(title, message, iKnowHandle) {
        let view = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.lkrn_employee_iKnowAlert = v)}>
                <CQIKnowAlertView
                    title={title}
                    message={message}
                    iKnowTitle={'我知道了'}
                    iKnowHandle={()=>{
                        iKnowHandle && iKnowHandle();
                        this.lkrn_employee_iKnowAlert.close();
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(view);
    }


    /**
     * 显示 '取消' + '确定' AlertView
     * @param title             弹窗标题(可为null)
     * @param message           弹窗信息(可为null)
     * @param cancelHandle      取消按钮点击事件  ()=>{}
     * @param okHandle          确认点击事件  ()=>{}
     */
    static showCancelOKAlert(title, message, cancelHandle, okHandle) {
        let view = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.lkrn_employee_CancelOKAlert = v)}>
                <CQCancelOKAlertView
                    title={title}
                    message={message}
                    cancelTitle={'取消'}
                    cancelHandle={()=>{
                        cancelHandle && cancelHandle();
                        this.lkrn_employee_CancelOKAlert.close();
                    }}
                    okTitle={'确认'}
                    okHandle={()=>{
                        okHandle && okHandle();
                        this.lkrn_employee_CancelOKAlert.close();
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(view);
    }

    /**
     * 显示文本输入 AlertView
     * @param title
     * @param inputPlaceholder
     * @param inputText
     * @param okHandle
     */
    static showNormalTextInputAlert(title, inputPlaceholder, inputText, okHandle) {
        let view = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.normalTextInputAlert = v)}>
                <CQNormalTextInputAlertView
                    title={title}
                    placeholder={inputPlaceholder}
                    inputText={inputText}
                    cancelHandle={() => {
                        this.normalTextInputAlert.close();
                    }}
                    okHandle={(currentText) => {
                        if (okHandle) {
                            okHandle(currentText);
                        }
                        this.normalTextInputAlert.close();
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(view);
    }


    /**
     * 显示温度 AlertView
     * @param title
     * @param inputPlaceholder
     * @param currentTemperatureString
     * @param okHandle
     */
    static showTemperatureAlert(title, inputPlaceholder, currentTemperatureString, okHandle) {
        let tempInput = currentTemperatureString || currentTemperatureString === 0 ? currentTemperatureString + '' : '';
        let view = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.temperatureAlert = v)}>
                <CQTemperatureAlertView
                    title={title}
                    placeholder={inputPlaceholder}
                    inputText={tempInput}
                    cancelHandle={() => {
                        this.temperatureAlert.close();
                    }}
                    okHandle={(temperatureString) => {
                        let re = /^(\-)*(\d{1,2})(\.\d)*$/;
                        if (!re.test(temperatureString)) {
                            CQToastUtil.showMessage('请输入正确格式的温度数据' + temperatureString);
                            return;
                        }
                        if (okHandle) {
                            okHandle(temperatureString);
                        }
                        this.temperatureAlert.close();
                    }}

                />
            </Overlay.PopView>
        );
        Overlay.show(view);
    }


    /**
     * 显示 内容为信息列表的 弹窗
     * @param title     弹窗标题
     * @param keyValues [{'key': '23位码', 'value': '09876543211234567890987'}, {'key': 'SN码', 'value': '0987654321234567890'},]
     * @param okHandle  确认事件
     */
    static showCancelOKListMessageAlert(title, keyValues, okHandle) {
        let view = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.normalTextInputAlert = v)}>
                <CQCancelOKListMessageAlertView
                    title={title}
                    keyValues={keyValues}
                    cancelHandle={() => {
                        this.normalTextInputAlert.close();
                    }}
                    okHandle={() => {
                        okHandle && okHandle();
                        this.normalTextInputAlert.close();

                        let keyValues = [{'key': '23位码', 'value': '09876543211234567890987'}, {'key': 'SN码', 'value': '0987654321234567890'},];
                    }}


                />
            </Overlay.PopView>
        );
        Overlay.show(view);
    }


    /**
     * 显示 内容为文本输入的 弹窗
     * @param title     弹窗的标题
     * @param keyValues [{'key': 'SN码', 'placeholder': '请输入SN码', 'value': null}, {'key': 'MAC码', 'placeholder': '请输入MAC码', 'value': null,},]
     * @param okHandle  确认事件
     */
    static showCancelOKListInputAlert(title, keyValues, okHandle) {
        let view = (
            <Overlay.PopView
                style={{alignItems: 'center', justifyContent: 'center'}}
                ref={v => (this.normalTextInputAlert = v)}>
                <CQCancelOKListInputAlertView
                    title={title}
                    keyValues={keyValues}
                    cancelHandle={() => {
                        this.normalTextInputAlert.close();
                    }}
                    okHandle={() => {
                        okHandle && okHandle();
                        this.normalTextInputAlert.close();
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(view);
    }
}

