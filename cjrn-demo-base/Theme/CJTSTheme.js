/**
 * CJTSTheme.js
 *
 * @Description: APP的默认值管理
 *
 * @author      dvlproad
 * @date        2019-12-02 16:36:01
 */



let defaultThemeColor = '#192B93FF';           // 主题色(enable)：蓝
let defaultThemeDisabledColor = '#192B9366';   // 主题色(disable)：蓝

const CJTSThemeDefault = {
    style: {
        themeColor:         defaultThemeColor,          // 主题色(enable)：蓝
        themeDisabledColor: defaultThemeDisabledColor,  // 主题色(disable)：蓝
        separateLineColor:  '#E5E5E5',                  // 分割线(长用于紧凑alert中的按钮分隔)
        textMainColor:      '#333333',                  // 文字的主要颜色
    }
};

// let partnerThemeColor = '#2F7DE1FF';           // 主题色(enable)：蓝
// let partnerThemeDisabledColor = '#2F7DE166';   // 主题色(disable)：蓝
// const CJTSThemePartner = {
//     style: {
//         themeColor:         partnerThemeColor,          // 主题色(enable)：蓝
//         themeDisabledColor: partnerThemeDisabledColor,  // 主题色(disable)：蓝
//         separateLineColor:  '#E5E5E5',                  // 分割线(长用于紧凑alert中的按钮分隔)
//         textMainColor:      '#333333',                  // 文字的主要颜色
//     }
// };

export const CJTSTheme = {
    themes: {
        Default: CJTSThemeDefault,
        // Partner: CJTSThemePartner,
    },

    set: function(theme) {
        Object.assign(this, theme);
    },
};

// CJTSTheme.set(CJTSThemeDefault);
CJTSTheme.set(CJTSTheme.themes['Default']);

// module.exports = CJTSTheme;
