/**
 * commonUIDemo.js
 *
 * @Description: commonUIDemo
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-03 11:38:31
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

'use strict';

// demo base Page的基类
import LKDemoScrollHomeComponent from "./Demo/LKDemoScrollHomeComponent";
import LKDemoTableHomeComponent from "./Demo/LKDemoTableHomeComponent";
import LKDemoCollectionHomeComponent from "./Demo/LKDemoCollectionHomeComponent";
import LKDemoChooseBasePage from "./Demo/LKDemoChooseBasePage";



var LKCommonUIDemo = {
    // demo base Page的基类
    LKDemoScrollHomeComponent,
    LKDemoTableHomeComponent,
    LKDemoCollectionHomeComponent,
    LKDemoChooseBasePage,
};

module.exports = LKCommonUIDemo;
