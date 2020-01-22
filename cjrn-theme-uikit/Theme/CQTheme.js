/**
 * CQDefault.js
 *
 * @Description: APP的默认值管理
 *
 * @author      chaoqian.li
 * @date        2019-12-02 16:36:01
 */

import { CJTheme, CJThemeType } from 'cjrn-base-uikit';

/**
 * 主题类型
 *
 * @type {{Employee: number, Partner: number}}
 */
// export var CQThemeType = {
//     Default: 0,     /**< 默认 */
//     Employee: 1,    /**< 工作站 */
//     Partner: 2,     /**< 合伙人 */
// };

/*
为 主题类型ThemeType 添加其他主题Type
 */
Object.assign(CJThemeType, {Employee: 1});
Object.assign(CJThemeType, {Partner: 2});
export var CQThemeType = CJThemeType;



export const CQThemeEmployee = {
    themeType: CQThemeType.Employee,
    style: {
        themeColor: '#192B93',                  // 主题色：蓝
    }
};

let partnerThemeColor = '#2F7DE1FF';           // 主题色(enable)：蓝
let partnerThemeDisabledColor = '#2F7DE166';   // 主题色(disable)：蓝

export const CQThemePartner = {
    themeType: CQThemeType.Partner,
    style: {
        themeColor:         partnerThemeColor,          // 主题色(enable)：蓝
        themeDisabledColor: partnerThemeDisabledColor,  // 主题色(disable)：蓝
        separateLineColor: '#E5E5E5',               // 分割线(长用于紧凑alert中的按钮分隔)
        textMainColor: '#333333',                   // 文字的主要颜色
        placeholderTextColor: '#CCCCCC',

        // overlayer
        blankBGColor: 'rgba(40,40,40,0.4)',         // 浮层背景

        // button
        buttonBorderRadius: 16,
        buttonThemeNormalStyle: {
            normalTitle: "提交",
            normalBorderWidth: 0,

            normalTitleColor: "#FFFFFF",
            normalBGColor: partnerThemeColor,
            normalBorderColor: null,

            normalDisabledTitleColor: '#FFFFFF4C',
            normalDisabledBGColor: partnerThemeDisabledColor,
            normalDisabledBorderColor: null,
        },
        buttonThemeSelectedStyle: {
            // 修改
            selectedTitle: "修改",
            selectedBorderWidth: 1,

            selectedTitleColor: partnerThemeColor,
            selectedBGColor: "#FFFFFF",
            selectedBorderColor: partnerThemeColor,

            selectedDisabledTitleColor: partnerThemeDisabledColor,
            selectedDisabledBGColor: "#FFFFFF",
            selectedDisabledBorderColor: partnerThemeDisabledColor,
        },


        // textInput
        textInputStyle: {
            fontSize: 14,
            color: this.textMainColor,
            paddingHorizontal: 15,
            backgroundColor: 'white',
            height: 43,
        },
        
        // alert
        alertStyle: {
            backgroundColor: '#ffffff',
            width: 316,
            borderRadius: 12,
            overflow: 'hidden',
        },
        alertMarginVertical: {      // alert 竖直上的间距
            title_buttons: [30, 30, 20 , 0],
            title_message_buttons: [20, 10, 20, 20],
            message_buttons: [20, 20, 0, 0],
        },
        alertTitleStyle: {          // alert 标题
            marginHorizontal: 15,
            lineHeight: 21,
            fontSize: 15,
            color: '#333333',
        },
        alertMessageStyle: {        // alert 信息
            lineHeight: 19,
            fontSize: 13,
            color: '#333333',
        },
        alertInputStyle: {          // alert 输入区域
            backgroundColor: 'white',
            marginHorizontal: 15,
            height: 43,
        },
        alertButtonsStyle: {        // alert 按钮整体
            height: 32,
        },
        alertButtonTextStyle: {     // alert 按钮中的text设置
            fontSize: 15,
        },

        // actionSheet
        actionSheetStyle: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },

        // searchBar
        searchBarBorderRadius: 2,
    }
};




// export const CQThemeDefault = CJTheme.themes['default'];
// export const CQTheme = {
//     themes: {
//         default: CQThemeDefault,
//         Employee: CQThemeEmployee,
//         Partner: CQThemePartner,
//     },
//
//     set: function(theme) {
//         // Object.assign(this, theme);
//         Object.assign(CJTheme, theme);
//     },
// };

/*
为 Theme 添加其他 Theme
 */
Object.assign(CJTheme.themes, {Employee: CQThemeEmployee});
Object.assign(CJTheme.themes, {Partner: CQThemePartner});
export var CQTheme = CJTheme;

// CQTheme.set(ThemeDefault);
// CQTheme.set(ThemePartner);
CQTheme.set(CQTheme.themes['default']);
// CQTheme.set(CQTheme.themes['Partner']);
