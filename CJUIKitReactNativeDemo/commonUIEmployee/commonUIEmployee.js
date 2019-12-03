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
import LKToast from "../CJBaseUIKit/toast/CJToast";

// ActionSheet
import { CJActionSheet as LKActionSheet } from "../CJBaseUIKit/ActionSheet/CJActionSheet";
import { CJMultipleChooseActionSheet as LKMultipleChooseActionSheet } from "../CJBaseUIKit/ActionSheet/CJMultipleChooseActionSheet";


import LKImageButton from "../CJBaseUIKit/button/CJImageButton";
import LKTextButton, { LKBlueBGButton, LKEditSubmitButton } from "./Button/LKTextButton";
import { LKBlueBGBottomTextButton } from "./Button/LKBottomTextButton";


// CollectionView
import LKImageActionCollectionView from "./CollectionView/LKImageActionCollectionView";



// 日期选择
// import {
//   CJDatePickShowType as LKDatePickShowType,
//   CJDatePickerCreateTimeType as LKDatePickerCreateTimeType
// } from "../CJBaseUIKit/CJBaseUIKit";

// import { CJDatePickShowType as LKDatePickShowType } from "../CJBaseUIKit/CJBaseUIKit";
// import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "../CJBaseUIKit/CJBaseUIKit";

import LKDatePicker from "./Pickers/LKDatePicker";
import { CJDatePickShowType as LKDatePickShowType } from "../CJBaseUIKit/datePicker/CJDatePickerUtil";
import { CJDatePickerCreateTimeType as LKDatePickerCreateTimeType } from "../CJBaseUIKit/datePicker/CJDatePicker";

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


    // collection
    LKEntryHomeComponent,
    LKImageLookHomeComponent,
    LKImageActionCollectionView,
    LKImageActionHomeComponent,
    LKDescriptionBasePage,

    // 日期选择
    LKDatePickShowType,
    LKDatePickerCreateTimeType,
    LKDatePicker,
    /**
     * <LKDatePicker ref={ref => this.datePicker = ref} />
     *
     * onPress={()=>{
                        this.datePicker.showAllEvent(
                            this.state.dateString2,
                            (dateString)=>{
                                this.setState({
                                    dateString2: dateString
                                })
                            },
                            ()=>{},
                            ()=>{},
                        )
                    }}
     */


    // 地区选择
    LKAreaPicker,
};

module.exports = LKCommonUI;
