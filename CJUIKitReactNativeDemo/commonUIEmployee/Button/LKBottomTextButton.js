// LKTextButton.js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Dimensions, Platform, View} from "react-native";
import { LKBlueBGButton } from "./LKTextButton";


let screenHeight = Dimensions.get('window').height;
let screenBottomHeight = Platform.OS === 'ios' ? screenHeight >= 812 ? 34 : 0 : 0;




//注意此按钮顶部阴影超出了按钮本身区域，注意放在视图上层才会显示出来；
export class LKBlueBGBottomTextButton extends Component {
    static propTypes = {
        normalTitle: PropTypes.string.isRequired,
        fontSize: PropTypes.number,
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        normalTitle: "normalTitle",
        fontSize: 14,
        onPress: () => { },
        disabled: false,
    };


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={{
                paddingHorizontal: 15,
                paddingTop: 8,
                paddingBottom: 8 + screenBottomHeight,
                backgroundColor: 'white',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -1 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 10,
            }}>
                <LKBlueBGButton
                    style={this.props.style}
                    normalTitle={this.props.normalTitle}
                    fontSize={this.props.fontSize}
                    onPress={this.props.onPress}
                    disabled={this.props.disabled}
                />
            </View>
        )
    }
}


