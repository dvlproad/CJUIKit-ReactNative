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
import LKDemoChooseWithRightBasePage from './Demo/LKDemoChooseWithRightBasePage';
import LKDemoRightActionBasePage from "./Demo/LKDemoRightActionBasePage";

// Navigation
import LKDemoNavigationFactory from "./Navigation/LKDemoNavigationFactory";
import LKDemoRoute from "./Navigation/LKDemoRoute";

var LKCommonUIDemo = {
    // default
    LKDemoImages,

    // demo base Page的基类
    LKDemoScrollHomeComponent,
    LKDemoTableHomeComponent,
    LKDemoCollectionHomeComponent,
    LKDemoChooseBasePage,
    LKDemoChooseWithRightBasePage,
    LKDemoRightActionBasePage,

    // Navigation
    LKDemoNavigationFactory,
    LKDemoRoute,
};

module.exports = LKCommonUIDemo;
