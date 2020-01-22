/**
 * CJTextButton.js
 *
 * @Description: CJTextButton
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-05-31 17:00:08
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    TouchableOpacity,
    Text,
    ViewPropTypes,
    View,
} from "react-native";

import { CJTheme }  from '../Theme/CJTheme';


/**
 * 文本按钮(已配置 Normal 和 Selected 风格的主题色按钮)
 */
export default class CJTextButton extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        disabled: PropTypes.bool,

        // noraml
        normalTitle: PropTypes.string,
        normalTitleColor: PropTypes.string,

        normalBGColor: PropTypes.string,        // 按钮默认时候的背景颜色
        normalBorderWidth: PropTypes.number,
        normalBorderColor: PropTypes.string,        // 按钮默认时候的边框颜色

        normalDisabledTitleColor: PropTypes.string,
        normalDisabledBGColor: PropTypes.string,      // 按钮失效时候的背景颜色

        onPress: PropTypes.func,                // 正常状态时候的按钮点击事件


        // selected
        selectedTitle: PropTypes.string,
        selectedTitleColor: PropTypes.string,

        selectedBGColor: PropTypes.string,      // 按钮选中时候的背景颜色
        selectedBorderColor: PropTypes.string,      // 设置按钮选中时候的边框颜色
        selectedBorderWidth: PropTypes.number,

        selectedDisabledTitleColor: PropTypes.string,   // 选中状态时候的按钮
        selectedDisabledBGColor: PropTypes.string,      // 按钮失效时候的背景颜色

        onSelectedPress: PropTypes.func,        // 选中状态时候的按钮点击事件(若未设置，则会使用onPress)

        // highlightedBGColor: PropTypes.number,   // 按钮高亮时候的背景颜色
        // highlightedBorderColor: PropTypes.string,   // 按钮高亮时候的边框颜色

        textStyle: Text.propTypes.style,            // 按钮文本style
    };

    static defaultProps = {
        selected: false,
        disabled: false,

        textStyle: {
            // fontSize: 17,
            // textAlign: 'center',
            // fontFamily: 'PingFangSC-Regular',
        },

        // normal
        normalTitle: "normal",
        // normalBorderWidth: CJTheme.style.buttonThemeNormalStyle.normalBorderWidth,
        //
        // normalTitleColor: CJTheme.style.buttonThemeNormalStyle.normalTitleColor,
        // normalBGColor: CJTheme.style.buttonThemeNormalStyle.normalBGColor,
        // normalBorderColor: CJTheme.style.buttonThemeNormalStyle.normalBorderColor,
        //
        // normalDisabledTitleColor: CJTheme.style.buttonThemeNormalStyle.normalDisabledTitleColor,
        // normalDisabledBGColor: CJTheme.style.buttonThemeNormalStyle.normalDisabledBGColor,
        // normalDisabledBorderColor: CJTheme.style.buttonThemeNormalStyle.normalDisabledBorderColor,

        onPress: () => { },

        // selected
        selectedTitle: "selected",
        // selectedBorderWidth: CJTheme.style.buttonThemeSelectedStyle.selectedBorderWidth,
        //
        // selectedTitleColor: CJTheme.style.buttonThemeSelectedStyle.selectedTitleColor,
        // selectedBGColor: CJTheme.style.buttonThemeSelectedStyle.selectedBGColor,
        // selectedBorderColor: CJTheme.style.buttonThemeSelectedStyle.selectedBorderColor,
        //
        // selectedDisabledTitleColor: CJTheme.style.buttonThemeSelectedStyle.selectedDisabledTitleColor,
        // selectedDisabledBGColor: CJTheme.style.buttonThemeSelectedStyle.selectedDisabledBGColor,
        // selectedDisabledBorderColor: CJTheme.style.buttonThemeSelectedStyle.selectedDisabledBorderColor,

        onSelectedPress: () => { },
    };

    render() {
        const { style } = this.props;

        let showTextColor = this.props.normalTitleColor;
        if (this.props.selected) {
            if (this.props.disabled) {
                showTextColor = this.props.selectedDisabledTitleColor ? this.props.selectedDisabledTitleColor : this.props.normalDisabledTitleColor;

            }  else {
                showTextColor = this.props.selectedTitleColor;
            }
        }

        let stateStyle = {};
        if (this.props.disabled) {
            if (this.props.selected) {
                stateStyle = {
                    backgroundColor: this.props.selectedDisabledBGColor,
                    borderWidth: this.props.selectedBorderWidth,
                    borderColor: this.props.selectedDisabledBorderColor,
                };
            } else {
                stateStyle = {
                    backgroundColor: this.props.normalDisabledBGColor,
                    borderWidth: this.props.normalBorderWidth,
                    borderColor: this.props.normalBorderColor,
                };
            }

        }  else {
            if (this.props.selected) {
                stateStyle = {
                    backgroundColor: this.props.selectedBGColor,
                    borderWidth: this.props.selectedBorderWidth,
                    borderColor: this.props.selectedBorderColor,
                };
            } else {
                stateStyle = {
                    backgroundColor: this.props.normalBGColor,
                    borderWidth: this.props.normalBorderWidth,
                    borderColor: this.props.normalBorderColor,
                };
            }

        }

        let normalTitle = this.props.normalTitle ? this.props.normalTitle : this.props.title; // 支持未设置的时候取title
        let showTitle = this.props.selected ? this.props.selectedTitle : normalTitle;
        let currentOnPress = this.props.onPress;
        if (this.props.selected && this.props.onSelectedPress) {
            currentOnPress = this.props.onSelectedPress;
        }

        // 使用Button组件，无法处理disabled时候的文字颜色问题
        // return (
        //     <View style={[{flex:1}, style]} >
        //         <Button
        //             title={this.props.title}
        //             color={this.props.normalTitleColor}
        //             disabled={this.props.disabled}
        //             onPress={this.props.onPress}
        //         />
        //     </View>
        // )
        let textHeight = this.props.style && this.props.style.height > 0 ? this.props.style.height : 40;

        return (
            <TouchableOpacity
                onPress={currentOnPress}
                disabled={this.props.disabled}
                style={[
                    {
                        justifyContent: "center",
                        height: textHeight,
                        borderRadius: CJTheme.style.buttonBorderRadius,
                    },
                    stateStyle,
                    this.props.style
                ]}
                //activeOpacity={0.4}
            >
                <Text
                    style={[
                        {
                            height: textHeight,
                            lineHeight:textHeight,
                            color: showTextColor,
                            fontSize: 17,
                            textAlign: 'center',
                            fontFamily: 'PingFangSC-Regular',
                        },
                        this.props.textStyle
                    ]}
                >
                    {showTitle}
                </Text>
            </TouchableOpacity>
        )
    }
}

/**
 * 文本按钮(已配置 Normal 和 Selected 风格的主题色按钮)
 */
export class CJThemeNormalSelectedButton extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        fontSize: PropTypes.number,

        // noraml
        normalTitle: PropTypes.string,
        onPress: PropTypes.func,                // 正常状态时候的按钮点击事件

        // selected
        selectedTitle: PropTypes.string,
        onSelectedPress: PropTypes.func,        // 选中状态时候的按钮点击事件(若未设置，则会使用onPress)
    };

    static defaultProps = {
        selected: false,
        disabled: false,
        fontSize: 17,

        // normal
        normalTitle: "normal",
        onPress: () => { },

        // selected
        selectedTitle: "selected",
        onSelectedPress: () => { },
    };

    render() {
        return (
            <CJTextButton
                style={this.props.style}
                selected={this.props.selected}
                disabled={this.props.disabled}
                fontSize={this.props.fontSize}

                // normal
                normalTitle={this.props.normalTitle}
                normalBorderWidth={CJTheme.style.buttonThemeNormalStyle.normalBorderWidth}

                normalTitleColor={CJTheme.style.buttonThemeNormalStyle.normalTitleColor}
                normalBGColor={CJTheme.style.buttonThemeNormalStyle.normalBGColor}
                normalBorderColor={CJTheme.style.buttonThemeNormalStyle.normalBorderColor}

                normalDisabledTitleColor={CJTheme.style.buttonThemeNormalStyle.normalDisabledTitleColor}
                normalDisabledBGColor={CJTheme.style.buttonThemeNormalStyle.normalDisabledBGColor}
                normalDisabledBorderColor={CJTheme.style.buttonThemeNormalStyle.normalDisabledBorderColor}

                onPress={this.props.onPress}

                // selected
                selectedTitle={this.props.selectedTitle}
                selectedBorderWidth={CJTheme.style.buttonThemeSelectedStyle.selectedBorderWidth}

                selectedTitleColor={CJTheme.style.buttonThemeSelectedStyle.selectedTitleColor}
                selectedBGColor={CJTheme.style.buttonThemeSelectedStyle.selectedBGColor}
                selectedBorderColor={CJTheme.style.buttonThemeSelectedStyle.selectedBorderColor}

                selectedDisabledTitleColor={CJTheme.style.buttonThemeSelectedStyle.selectedDisabledTitleColor}
                selectedDisabledBGColor={CJTheme.style.buttonThemeSelectedStyle.selectedDisabledBGColor}
                selectedDisabledBorderColor={CJTheme.style.buttonThemeSelectedStyle.selectedDisabledBorderColor}

                onSelectedPress={this.props.onSelectedPress}
            />
        )
    }
}

/**
 * 以主题色作为按钮背景色构建的主题按钮 ThemeBGButto
 */
export class CJThemeBGButton extends Component {
    static defaultProps = {
        title: null,
        fontSize: 17,
        onPress: () => { },
        disabled: false,
    };

    render() {
        return (
            <CJThemeNormalSelectedButton
                style={this.props.style}
                selected={false}
                fontSize={this.props.fontSize}
                normalTitle={this.props.title}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            />
        )
    }
}

/**
 * 以主题色作为按钮边框色构建的主题按钮 ThemeBorderButton
 */
export class CJThemeBorderButton extends Component {
    static defaultProps = {
        title: null,
        fontSize: 17,
        onPress: () => { },
        disabled: false,
    };

    render() {
        return (
            <CJThemeNormalSelectedButton
                style={this.props.style}
                selected={true}
                fontSize={this.props.fontSize}
                selectedTitle={this.props.title}
                onSelectedPress={this.props.onPress}
                disabled={this.props.disabled}
            />
        )
    }
}