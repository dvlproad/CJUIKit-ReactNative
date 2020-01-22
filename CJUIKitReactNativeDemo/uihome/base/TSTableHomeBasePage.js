/**
 * TSTableHomeBasePage.js
 *
 * @Description: 用来测试的列表基类
 *
 * @author      chaoqian.li
 * @date        2019-12-18 17:45:13
 */
import React, {Component} from 'react';
import { CJTSTableHomeBasePage, CJTSTableHomeWithRightBasePage } from "cjrn-demo-base";

export default class TSTableHomeBasePage extends CJTSTableHomeBasePage {
    navigationBarRightButtonPageName() {
        return 'TSThemePage';
    }
}
