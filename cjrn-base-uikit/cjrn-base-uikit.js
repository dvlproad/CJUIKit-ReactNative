/**
 * cjrn-base-uikit.js
 *
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-05-09 10:30:47
 * @modify date 2019-05-09 10:30:47
 * @desc [cjrn-base-uikit]
 */

'use strict';

// Toast
import CJToast from "./toast/CJToast";

// ActionSheet
import { CJActionSheet } from "./ActionSheet/CJActionSheet";
import { CJMultipleChooseActionSheet } from "./ActionSheet/CJMultipleChooseActionSheet";

// text 文本
import CJCenterText from "./text/CJText";

// image 图片
import CJLoadingImage, { CJImageUploadType } from "./image/CJLoadingImage";

// button 按钮
import CJTextButton from "./button/CJTextButton";
import CJImageButton from "./button/CJImageButton";
import CJTextImageButton from "./button/CJTextImageButton";
import CJImageTextButton from "./button/CJImageTextButton";

// navigation 导航栏(含路由)
// import CJNavigationFactory from "./navigation/CJNavigationFactory";
import CJNavigationUtil from "./navigation/CJNavigationUtil";

// TableView 列表视图
import CJSectionTableView from "./TableView/CJSectionTableView";

// CollectionView 集合视图
import CJCollectionView from "./collectionView/CJCollectionView";
import CJCollectionCell from "./collectionView/CJCollectionCell";
import CJImageLookCollectionView from "./collectionView/CJImageLookCollectionView";
import CJImageActionCollectionView from "./collectionView/CJImageActionCollectionView";

// toolbar
import CJBottomToolbar from './base/CJBottomToolbar';

// PickerView 一般的选择器
import CJNormalPickerView from "./NormalPicker/CJNormalPickerView";

// datePicker 日期选择器
import {CJDatePickShowType} from "./datePicker/CJDatePickerUtil";
import CJDatePicker, {CJDatePickerCreateTimeType} from "./datePicker/CJDatePicker";

// areaPicker 地区选择器
import {CJAreaPickShowType} from "./areaPicker/CJAreaPickerView";
import CJAreaPicker from "./areaPicker/CJAreaPicker";


var cjrnbaseuikit = {
  // Toast
  CJToast,

  // ActionSheet
  CJActionSheet,
  CJMultipleChooseActionSheet,

  // text 文本
  CJCenterText,

  // button 按钮
  CJTextButton,
  CJImageButton,
  CJTextImageButton,
  CJImageTextButton,

  // image 图片
  CJImageUploadType,
  CJLoadingImage,

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

  // toolbar
  CJBottomToolbar,

  // pickerView 正常选择器
  CJNormalPickerView,

  // datePicker 日期选择器
  CJDatePickShowType,         // 日期器的选择样式
  CJDatePickerCreateTimeType, // 日期选择器创建的时机
  CJDatePicker,

  // areaPicker 地区选择器
  CJAreaPickShowType,
  CJAreaPicker,
};

module.exports = cjrnbaseuikit;
