/**
 * TSTableHomeBasePage.js
 *
 * @Description: 用来测试的集合基类
 *
 * @author      chaoqian.li
 * @date        2019-12-18 17:45:13
 */
import React, {Component} from 'react';
import { CJTSCollectionHomeBasePage, CJTSCollectionHomeWithRightBasePage } from "cjrn-demo-base";

export default class TSCollectionHomeBasePage extends CJTSCollectionHomeWithRightBasePage {
    navigationBarRightButtonPageName() {
        return 'TSThemePage';
    }
}
