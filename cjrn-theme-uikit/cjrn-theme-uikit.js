// cjrn-theme-uikit.js

'use strict';

// theme
import { CQTheme } from './Theme/CQTheme';

// navigation 导航栏(含路由)
import CQNavigationBarUtil from "./Navigation/CQNavigationBarUtil";
import CQRouteUtil from "./Navigation/CQRouteUtil";

// Toast
import CQToastUtil from "./Toast/CQToastUtil";

// Alert
import CQAlertUtil from "./Alert/CQAlertUtil";

// ActionSheet
import CQActionSheetUtil from "./ActionSheet/CQActionSheetUtil";

// Button
import CQImageButton from "./Button/CQImageButton";
import CQTextButton, { CQThemeBGButton, CQThemeBorderButton, CQThemeNormalSelectedButton } from "./Button/CQTextButton";
import { 
    CQBottomOneButton,
    CQBottomTwoButtons,
    CQBottomThreeButtons,
} from "./Button/CQBottomTextButton";

// Image
// import { CJImageUploadType as CQImageUploadType } from "cjrn-base-uikit";
import { CQLoadingImage, CQImageUploadType, CQActionLoadingImage } from "./Image/CQImage";

// Text
import { CQCenterText } from "./Text/CQText";

// textInput 文本输入框
import { CQTemperatureTextInput } from "./TextInput/CQTextInput";

// List
import CQImagesLookList from "./List/CQImagesLookList";
import CQImagesChooseList from "./List/CQImagesChooseList";
import CQModulesEntryList from "./List/CQModulesEntryList";
import CQDescriptionList from "./List/CQDescriptionList";
import CQCycleScrollView from "./List/CQCycleScrollView";

// toolbar
import { CQBottomToolbar } from './Toolbar/CQToolbar';

// 正常选择
import CQItemsPicker from "./Pickers/CQItemsPicker";

// 日期选择
// import {
//   CQDatePickShowType as CQDatePickShowType,
//   CJDatePickerCreateTimeType as CJDatePickerCreateTimeType
// } from "cjrn-base-uikit";

// import { CQDatePickShowType as CQDatePickShowType } from "cjrn-base-uikit";
// import { CJDatePickerCreateTimeType as CJDatePickerCreateTimeType } from "cjrn-base-uikit";

import CQDatePickerUtil from "./Pickers/CQDatePickerUtil";
import CQDatePicker, { CQDatePickShowType, CQDatePickerCreateTimeType } from "./Pickers/CQDatePicker";


// 地区选择
import CQAreaPicker from "./Pickers/CQAreaPicker";

// SegmentedPageView
import CQSegmentedPageView from './SegmentedPageView/CQSegmentedPageView';


let ThemeUIKit = {
    // theme
    CQTheme,

    // navigation 导航栏(含路由)
    CQNavigationBarUtil,
    CQRouteUtil,

    // Toast
    CQToastUtil,

    // Alert
    CQAlertUtil,

    // ActionSheet
    CQActionSheetUtil,

    // button
    CQImageButton,
    CQTextButton,
    CQThemeBGButton,
    CQThemeBorderButton,
    CQThemeNormalSelectedButton,
    // bottomButton
    CQBottomOneButton,
    CQBottomTwoButtons,
    CQBottomThreeButtons,

    // image 图片
    CQLoadingImage,
    CQImageUploadType,
    CQActionLoadingImage,

    // text
    CQCenterText,

    // textInput 文本输入框
    CQTemperatureTextInput,

    // collection
    CQImagesLookList,
    CQImagesChooseList,
    CQModulesEntryList,
    CQDescriptionList,
    CQCycleScrollView,

    // toolbar
    CQBottomToolbar,

    // 正常选择
    CQItemsPicker,

    // 日期选择
    CQDatePickerUtil,
    CQDatePickShowType,
    CQDatePickerCreateTimeType,
    CQDatePicker,


    // 地区选择
    CQAreaPicker,

    // SegmentedPageView
    CQSegmentedPageView,
};

module.exports = ThemeUIKit;
