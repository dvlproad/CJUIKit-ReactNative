/**
 * cjrn-demo-base.js
 *
 * @Description: cjrn-demo-base
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-03 11:38:31
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

'use strict';

// default
import { LKDemoImages } from "./Default/LKDemoDefault";

// demo base Page的基类
import LKDemoScrollHomeComponent from "./Demo/LKDemoScrollHomeComponent";
import LKDemoTableHomeComponent from "./Demo/LKDemoTableHomeComponent";
import LKDemoCollectionHomeComponent from "./Demo/LKDemoCollectionHomeComponent";
import LKDemoChooseBasePage from "./Demo/LKDemoChooseBasePage";

// Navigation
import LKDemoNavigationFactory from "./Navigation/LKDemoNavigationFactory";

var LKCommonUIDemo = {
    // default
    LKDemoImages,

    // demo base Page的基类
    LKDemoScrollHomeComponent,
    LKDemoTableHomeComponent,
    LKDemoCollectionHomeComponent,
    LKDemoChooseBasePage,

    // Navigation
    LKDemoNavigationFactory,
};

module.exports = LKCommonUIDemo;
