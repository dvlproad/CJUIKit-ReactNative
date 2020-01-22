// CQToast.js
import React, { Component } from 'react';
import { CJToast } from "cjrn-base-uikit";

export default class CQToastUtil {
    /**
     * 弹出显示信息
     *
     * @param message   信息内容
     */
    static showMessage(message) {
        CJToast.showMessage(message);
    }
}
