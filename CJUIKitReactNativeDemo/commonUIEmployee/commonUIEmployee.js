// commonUIEmployee.js

'use strict';

// base Page的基类
import LKEntryHomeComponent from "./Base/LKEntryHomeComponent";
import LKImageLookHomeComponent from "./Base/LKImageLookHomeComponent";
import LKImageActionHomeComponent from "./Base/LKImageActionHomeComponent";
import LKDescriptionBasePage from "./Base/LKDescriptionBasePage";

// navigation 导航栏(含路由)
import LKNavigationFactory from "./Navigation/LKNavigationFactory";
import LuckinRoute from "./Navigation/LuckinRoute";

// Toast
import LKToast from "./Toast/LKToast";

// ActionSheet
import LKActionSheet from "./ActionSheet/LKActionSheet";
import LKMultipleChooseActionSheet from "./ActionSheet/LKMultipleChooseActionSheet";

// Button
import LKImageButton from "./Button/LKImageButton";
import LKTextButton, { LKBlueBGButton, LKEditSubmitButton } from "./Button/LKTextButton";
import { LKBlueBGBottomTextButton } from "./Button/LKBottomTextButton";

// Image
import { CJImageUploadType as LKImageUploadType } from "cjrn-base-uikit";

// Text
import { LKCenterText } from "./Text/LKText";

// CollectionView
import LKImageActionCollectionView from "./CollectionView/LKImageActionCollectionView";

// toolbar
import { LKBottomToolbar } from './Toolbar/LKToolbar';

// 正常选择
import LKNormalPicker from "./Pickers/LKNormalPicker";

// 日期选择
// import {
//   CJDatePickShowType as LKDatePickShowType,
//   CJDatePickerCreateTimeType as LKDatePickerCreateTimeType
// } from "cjrn-base-uikit";

// import { CJDatePickShowType as LKDatePickShowType } from "cjrn-base-uikit";
// import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "cjrn-base-uikit";

import LKDatePicker from "./Pickers/LKDatePicker";
import { CJDatePickShowType as LKDatePickShowType } from "cjrn-base-uikit";
import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "cjrn-base-uikit";

// 地区选择
import LKAreaPicker from "./Pickers/LKAreaPicker";


var LKCommonUI = {
    // navigation 导航栏(含路由)
    LKNavigationFactory,
    LuckinRoute,

    // Toast
    LKToast,

    // ActionSheet
    LKActionSheet,
    LKMultipleChooseActionSheet,

    // button
    LKImageButton,
    LKTextButton,
    LKBlueBGButton,
    LKEditSubmitButton,
    // bottomButton
    LKBlueBGBottomTextButton,

    // image 图片
    LKImageUploadType,

    // text 文本
    LKCenterText,

    // collection
    LKEntryHomeComponent,
    LKImageLookHomeComponent,
    LKImageActionCollectionView,
    LKImageActionHomeComponent,
    LKDescriptionBasePage,

    // toolbar
    LKBottomToolbar,

    // 正常选择
    LKNormalPicker,

    // 日期选择
    LKDatePickShowType,
    LKDatePickerCreateTimeType,
    LKDatePicker,


    // 地区选择
    LKAreaPicker,
};

module.exports = LKCommonUI;
