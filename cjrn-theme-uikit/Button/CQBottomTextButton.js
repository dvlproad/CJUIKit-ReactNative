// CQTextButton.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Dimensions, Platform, View} from "react-native";
import { CQThemeBGButton, CQThemeBorderButton } from "./CQTextButton";


let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;




//注意此按钮顶部阴影超出了按钮本身区域，注意放在视图上层才会显示出来；
class CQBaseBottomTextButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderButtons() {
        return null;
    }

    render() {
        return (
            <View style={{
                paddingTop: 8,
                paddingBottom: 8 + screenBottomHeight,
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -1 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 10,
            }}>
                {this.renderButtons()}
            </View>
        )
    }
}

/**
 * 底部 一个 按钮
 */
export class CQBottomOneButton extends CQBaseBottomTextButton {
    static propTypes = {
        title: PropTypes.string,
        normalTitle: PropTypes.string,  // 可以直接使用title来设置此属性
        fontSize: PropTypes.number,
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        normalTitle: null,
        fontSize: 14,
        onPress: () => { },
        disabled: false,
    };

    renderButtons() {
        let title = this.props.normalTitle && this.props.normalTitle.length > 0 ? this.props.normalTitle : this.props.title;
        return (
            <CQThemeBGButton
                style={[this.props.style, {marginHorizontal: 15}]}
                title={title}
                fontSize={this.props.fontSize}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            />
        )
    }
}

/**
 * 底部 两个 按钮
 */
export class CQBottomTwoButtons extends CQBaseBottomTextButton {
    static propTypes = {
        buttonFlex1: PropTypes.number,
        title1: PropTypes.string,
        normalTitle1: PropTypes.string,  // 可以直接使用title来设置此属性
        onPress1: PropTypes.func,
        disabled1: PropTypes.bool,

        buttonFlex2: PropTypes.number,
        title2: PropTypes.string,
        normalTitle2: PropTypes.string,  // 可以直接使用title来设置此属性
        onPress2: PropTypes.func,
        disabled1: PropTypes.bool,
        
        fontSize: PropTypes.number,
    };

    static defaultProps = {
        fontSize: 14,
    };

    renderButtons() {
        let title1 = this.props.normalTitle1 && this.props.normalTitle1.length > 0 ? this.props.normalTitle1 : this.props.title1;
        let title2 = this.props.normalTitle2 && this.props.normalTitle2.length > 0 ? this.props.normalTitle2 : this.props.title2;
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: 15,
            }}
            >
                <CQThemeBorderButton
                    style={[{flex:this.props.buttonFlex1}]}
                    title={title1}
                    fontSize={this.props.fontSize}
                    onPress={this.props.onPress1}
                    disabled={this.props.disabled1}
                />
                <CQThemeBGButton
                    style={[{flex:this.props.buttonFlex2, marginLeft: 15}]}
                    title={title2}
                    fontSize={this.props.fontSize}
                    onPress={this.props.onPress2}
                    disabled={this.props.disabled2}
                />
            </View>

        )
    }
}

/**
 * 底部 三个 按钮
 */
export class CQBottomThreeButtons extends CQBaseBottomTextButton {
    static propTypes = {
        buttonFlex1: PropTypes.number,
        title1: PropTypes.string,
        normalTitle1: PropTypes.string,  // 可以直接使用title来设置此属性
        onPress1: PropTypes.func,
        disabled1: PropTypes.bool,

        buttonFlex2: PropTypes.number,
        title2: PropTypes.string,
        normalTitle2: PropTypes.string,  // 可以直接使用title来设置此属性
        onPress2: PropTypes.func,
        disabled2: PropTypes.bool,

        buttonFlex3: PropTypes.number,
        title3: PropTypes.string,
        normalTitle3: PropTypes.string,  // 可以直接使用title来设置此属性
        onPress3: PropTypes.func,
        disabled3: PropTypes.bool,

        fontSize: PropTypes.number,
    };

    static defaultProps = {
        fontSize: 14,
    };

    renderButtons() {
        let title1 = this.props.normalTitle1 && this.props.normalTitle1.length > 0 ? this.props.normalTitle1 : this.props.title1;
        let title2 = this.props.normalTitle2 && this.props.normalTitle2.length > 0 ? this.props.normalTitle2 : this.props.title2;
        let title3 = this.props.normalTitle3 && this.props.normalTitle3.length > 0 ? this.props.normalTitle3 : this.props.title3;
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: 15,
            }}
            >
                <CQThemeBorderButton
                    style={[{flex:this.props.buttonFlex1}]}
                    title={title1}
                    fontSize={this.props.fontSize}
                    onPress={this.props.onPress1}
                    disabled={this.props.disabled1}
                />
                <CQThemeBorderButton
                    style={[{flex:this.props.buttonFlex2, marginLeft: 15}]}
                    title={title2}
                    fontSize={this.props.fontSize}
                    onPress={this.props.onPress2}
                    disabled={this.props.disabled2}
                />
                <CQThemeBGButton
                    style={[{flex:this.props.buttonFlex3, marginLeft: 15}]}
                    title={title3}
                    fontSize={this.props.fontSize}
                    onPress={this.props.onPress3}
                    disabled={this.props.disabled3}
                />
            </View>

        )
    }
}
