/**
 * CQDefault.js
 *
 * @Description: APP的默认值管理
 *
 * @author      chaoqian.li
 * @date        2019-12-02 16:36:01
 */


/**
 * 主题类型
 *
 * @type {{Employee: number, Partner: number}}
 */
export var CJThemeType = {
    Default: 0,     /**< 默认 */
};

// var themeType = CJThemeType.Partner;
// export const CQDefault = {
//     themeType: themeType,
//     style: {
//         themeColor: themeType == CJThemeType.Partner ? '#2F7DE1' : '#192B93',                  // 主题色：蓝
//         buttonBorderRadius: themeType == CJThemeType.Partner ? 16 : 3,
//         // backgroundColor: '#F5F5F5',         // 背景色
//         // placeholderTextColor: '#CCCCCC',
//         // dartTextColor: '#333',
//         // lightTextColor: '#666',
//         // greenLabelColor: '#0CCD6C',
//         // yellowLabelColor: '#FFBF17',
//
//
//         actionsheetBorderRadius: themeType == CJThemeType.Partner ? 10 : 0,
//         searchBarBorderRadius: themeType == CJThemeType.Partner ? 2 : 2,
//     }
// };

let defaultThemeColor = '#192B93FF';           // 主题色(enable)：蓝
let defaultThemeDisabledColor = '#192B9366';   // 主题色(disable)：蓝

const CJThemeDefault = {
    themeType: CJThemeType.Default,
    style: {
        themeColor:         defaultThemeColor,          // 主题色(enable)：蓝
        themeDisabledColor: defaultThemeDisabledColor,  // 主题色(disable)：蓝
        separateLineColor: '#E5E5E5',               // 分割线(长用于紧凑alert中的按钮分隔)
        textMainColor: '#333333',                   // 文字的主要颜色
        placeholderTextColor: '#CCCCCC',

        // overlayer
        blankBGColor: 'rgba(40,40,40,0.4)',         // 浮层背景

        // button
        buttonBorderRadius: 3,
        buttonThemeNormalStyle: {
            normalTitle: "提交",
            normalBorderWidth: 0,

            normalTitleColor: "#FFFFFF",
            normalBGColor: defaultThemeColor,
            normalBorderColor: null,

            normalDisabledTitleColor: '#FFFFFF4C',
            normalDisabledBGColor: defaultThemeDisabledColor,
            normalDisabledBorderColor: null,
        },
        buttonThemeSelectedStyle: {
            // 修改
            selectedTitle: "修改",
            selectedBorderWidth: 1,

            selectedTitleColor: defaultThemeColor,
            selectedBGColor: "#FFFFFF",
            selectedBorderColor: defaultThemeColor,

            selectedDisabledTitleColor: defaultThemeDisabledColor,
            selectedDisabledBGColor: "#FFFFFF",
            selectedDisabledBorderColor: defaultThemeDisabledColor,
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
            backgroundColor: '#F7F7F7',
            width: 270,
            borderRadius: 14,
            overflow: 'hidden',
        },
        alertMarginVertical: {      // alert 竖直上的间距
            title_buttons: [30, 30, 0 , 0],
            title_message_buttons: [20, 10, 20, 0],
            message_buttons: [30, 30, 0, 0],
        },
        alertTitleStyle: {          // alert 标题
            marginHorizontal: 15,
            lineHeight: 21,
            fontSize: 15,
            color: this.textMainColor,
        },
        alertMessageStyle: {        // alert 信息
            lineHeight: 19,
            fontSize: 13,
            color: '#666666',
        },
        alertInputStyle: {          // alert 输入区域
            backgroundColor: 'white',
            marginHorizontal: 15,
            height: 43,
        },
        alertButtonsStyle: {        // alert 按钮整体
            height: 45,
        },
        alertButtonTextStyle: {     // alert 按钮中的text设置
            fontSize: 15,
        },

        // actionSheet
        actionSheetStyle: {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },

        // searchBar
        searchBarBorderRadius: 2,
    }
};


export const CJTheme = {
    themes: {
        default: CJThemeDefault,
    },

    set: function(theme) {
        Object.assign(this, theme);

    },
};

// CQTheme.set(ThemeDefault);
// CQTheme.set(ThemePartner);
CJTheme.set(CJTheme.themes['default']);
// CQTheme.set(CQTheme.themes['Partner']);

// module.exports = CJTheme;
