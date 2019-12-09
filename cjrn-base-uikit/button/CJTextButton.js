import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";

// 文本按钮
export default class CJTextButton extends Component {
    static propTypes = {
        selected: PropTypes.bool,
        disabled: PropTypes.bool,

        // noraml
        normalTitle: PropTypes.string.isRequired,
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


        fontSize: PropTypes.number,
    };

    static defaultProps = {
        selected: false,
        disabled: false,

        fontSize: 17,

        // normal
        normalTitle: "normalTitle",
        normalBorderWidth: 0,

        normalTitleColor: "#FFFFFF",
        normalBGColor: 'rgba(23, 41, 145, 1)',
        normalDisabledBGColor: 'rgba(23, 41, 145, 0.4)',


        onPress: () => { },
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
                    borderColor: this.props.selectedBorderColor,
                };
            }

        }

        let showTitle = this.props.selected ? this.props.selectedTitle : this.props.normalTitle;
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
        return (
            <TouchableOpacity
                onPress={currentOnPress}
                disabled={this.props.disabled}
                style={[{ justifyContent: "center", height: 40 }, stateStyle, style]}
                //activeOpacity={0.4}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: showTextColor,
                        fontSize: this.props.fontSize
                    }}
                >
                    {showTitle}
                </Text>
            </TouchableOpacity>
        )
    }
}
