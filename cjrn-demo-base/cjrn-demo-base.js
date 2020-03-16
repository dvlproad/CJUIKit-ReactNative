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

// theme
import {CJTSTheme} from "./Theme/CJTSTheme";

// default
import { CJTSDefaultImages } from "./Default/CJTSDefault";

// demo base Page的基类
import CJTSScrollHomeBasePage from "./Demo/CJTSScrollHomeBasePage";
import CJTSTableHomeBasePage from "./Demo/CJTSTableHomeBasePage";
import CJTSCollectionHomeBasePage from "./Demo/CJTSCollectionHomeBasePage";

// 带右键的 demo base Page的基类
import CJTSRightActionBasePage from "./Demo/CJTSRightActionBasePage";
import CJTSTableHomeWithRightBasePage from "./Demo/CJTSTableHomeWithRightBasePage";
import CJTSCollectionHomeWithRightBasePage from './Demo/CJTSCollectionHomeWithRightBasePage';


// Navigation
import CJTSNavigationFactory from "./Navigation/CJTSNavigationFactory";
import CJTSRoute from "./Navigation/CJTSRoute";

var CJTSBase = {
    // theme
    CJTSTheme,

    // default
    CJTSDefaultImages,

    // demo base Page的基类
    CJTSScrollHomeBasePage,
    CJTSTableHomeBasePage,
    CJTSCollectionHomeBasePage,
    // 带右键的 demo base Page的基类
    CJTSRightActionBasePage,
    CJTSTableHomeWithRightBasePage,
    CJTSCollectionHomeWithRightBasePage,

    // Navigation
    CJTSNavigationFactory,
    CJTSRoute,
};

module.exports = CJTSBase;
