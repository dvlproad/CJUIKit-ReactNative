/**
 * CJBaseUIKit.js
 *
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-05-09 10:30:47
 * @modify date 2019-05-09 10:30:47
 * @desc [CJBaseUIKit]
 */

'use strict';

// theme
import { CJTheme, CJThemeType } from  './Theme/CJTheme';

// Toast
import CJToast from "./toast/CJToast";

// Alert
import CJAlertAnimation from "./Alert/CJAlertAnimation";

// AlertView
import { CJIKnowMessageAlertView, CJCancelOKMessageAlertView } from './Alert/CJMessageAlertView';
import { CJNormalTextInputAlertView, CJTemperatureInputAlertView } from './Alert/CJTextInputAlertView';
import { CJIKnowListMessageAlertView, CJCancelOKListMessageAlertView } from './Alert/CJListMessageAlertView';
import { CJIKnowListInputAlertView, CJCancelOKListInputAlertView } from './Alert/CJListTextInputAlertView';

// ActionSheet
import CJActionSheet from "./ActionSheet/CJActionSheet";
import CJMultipleChooseActionSheet from "./ActionSheet/CJMultipleChooseActionSheet";

// text 文本
import { CJCenterText } from "./text/CJText";

// textInput 文本输入框
import CJTemperatureTextInput from "./textInput/CJTemperatureTextInput";

// image 图片
import CJLoadingImage from "./image/CJLoadingImage";
import CJActionLoadingImage  from "./image/CJActionLoadingImage";
import { CJImageUploadType } from "./image/utils/CJImageUtil";

// button 按钮
import CJTextButton, {
    CJThemeNormalSelectedButton,
    CJThemeBGButton,
    CJThemeBorderButton
} from "./button/CJTextButton";
import CJImageButton from "./button/CJImageButton";
import CJTextImageButton from "./button/CJTextImageButton";
import CJImageTextButton from "./button/CJImageTextButton";

// navigation 导航栏(含路由)
import CJNavigationUtil from "./navigation/CJNavigationUtil";

// TableView 列表视图
import CJSectionTableView from "./TableView/CJSectionTableView";

// CollectionView 集合视图
import CJCollectionView from "./collectionView/CJCollectionView";
import CJCollectionCell from "./collectionView/CJCollectionCell";
import CJImageLookCollectionView from "./collectionView/CJImageLookCollectionView";
import CJImageActionCollectionView from "./collectionView/CJImageActionCollectionView";
import CJCycleScrollView from  "./collectionView/CJCycleScrollView";

// toolbar
import CJBottomToolbar from './base/CJBottomToolbar';

// PickerView 一般的选择器
import CJNormalPickerView from "./NormalPicker/CJNormalPickerView";

// datePicker 日期选择器
import { CJDatePickShowType } from "./datePicker/CJDatePickerUtil";
import CJDatePickerView, { CJDatePickerCreateTimeType } from "./datePicker/CJDatePickerView";
import CJPickerAnimate from "./datePicker/CJPickerAnimate";
import CJPickerContainer from "./datePicker/CJPickerContiner";

// areaPicker 地区选择器
import { CJAreaPickShowType } from "./areaPicker/CJAreaPickerView";
import CJAreaPicker from "./areaPicker/CJAreaPicker";

// SegmentedPageView
import CJSegmentedPageView from './SegmentedPageView/CJSegmentedPageView';

// Toolbar
import CJOverlayView from './toolbar/CJOverlayView';
import CJToolbarView from './toolbar/CJToolbarView';


var BaseUIKit = {
    // theme
    CJTheme,
    CJThemeType,

    // Toast
    CJToast,

    // Alert
    CJAlertAnimation,

    // AlertView,
    CJIKnowMessageAlertView,
    CJCancelOKMessageAlertView,
    CJNormalTextInputAlertView,
    CJTemperatureInputAlertView,
    // 内容为列表的 AlertView
    CJIKnowListMessageAlertView,
    CJCancelOKListMessageAlertView,
    CJIKnowListInputAlertView,
    CJCancelOKListInputAlertView,

    // ActionSheet
    CJActionSheet,
    CJMultipleChooseActionSheet,

    // text 文本
    CJCenterText,

    // textInput 文本输入框
    CJTemperatureTextInput,

    // button 按钮
    CJTextButton,
    CJThemeNormalSelectedButton,
    CJThemeBGButton,
    CJThemeBorderButton,
    CJImageButton,
    CJTextImageButton,
    CJImageTextButton,

    // image 图片
    CJLoadingImage,
    CJImageUploadType,
    CJActionLoadingImage,

    // navigation 导航栏(含路由)
    // CJNavigationFactory, //(不要引用该类，即请将该类实现复制一遍在具体APP中再自己相应修改一下即可)
    CJNavigationUtil,

    // TableView 列表视图
    CJSectionTableView,

    // CollectionView 集合视图
    CJCollectionView,
    CJCollectionCell,
    CJImageLookCollectionView,
    CJImageActionCollectionView,
    CJCycleScrollView,

    // toolbar
    CJBottomToolbar,

    // pickerView 正常选择器
    CJNormalPickerView,

    // datePicker 日期选择器
    CJDatePickShowType,         // 日期器的选择样式
    CJDatePickerCreateTimeType, // 日期选择器创建的时机
    CJDatePickerView,
    CJPickerAnimate,
    CJPickerContainer,

    // areaPicker 地区选择器
    CJAreaPickShowType,
    CJAreaPicker,

    // SegmentedPageView
    CJSegmentedPageView,

    // Toolbar
    CJOverlayView,
    CJToolbarView,
};

module.exports = BaseUIKit;
