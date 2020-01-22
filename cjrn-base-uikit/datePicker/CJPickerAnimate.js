import React, { Component } from 'react';
import {Animated, TouchableOpacity} from "react-native";
import CJBaseComponent from "../PickerView/CJBaseComponent";
import PropTypes from "prop-types";

export default class CJPickerAnimate extends CJBaseComponent {

    static propTypes = {
        shouldCreateItRightNow: PropTypes.bool,  // 是否应该马上创建它(常用于日期选择器不是从底部弹出，而是自己控制位置的场景)
        dismissAction: PropTypes.func,
        coverClickable: PropTypes.bool,
        component: PropTypes.element,
        showAnimationType: PropTypes.string,
        removeSubviews:PropTypes.bool //隐藏时，是否回收前景控件，false 更流畅，true：初始化更快，dismiss后就回收
    };

    static defaultProps = {
        dismissAction: () => { },
        removeSubviews: false,
        coverClickable: true,
        showAnimationType: 'timing',
        component:null,
    };

    _path = new Animated.Value(0);

    isShowing() {
        return this.state.isShow;
    }

    constructor(props) {
        super(props);
        // let needCreateAtFirst = this.props.datePickerCreateTimeType === CJDatePickerCreateTimeType.SuperViewAppear;
        this.state = {
            // hasCreate: needCreateAtFirst,
            isShow: false,
            noCover: false,  // 默认false,即有背景蒙层
        }
    }

    /**
     * 显示
     */
    show(callback) {
        this.setState({
            noCover: false,
            isShow: true
        }, () => {
            this.showEvent(callback);
        })
    }

    /**
     * 显示无背景
     */
    showNoCover(callback) {
        this.setState({
            noCover: true,
            isShow: true
        }, () => {
            this.showEvent(callback);
        })
    }

    dismiss(callback) {
        Animated.spring(this._path, { toValue: 0, friction: 9 }).start(() => {
            this.setState({ isShow: false }, () => {
                callback && callback();
            });
        });
    }

    showEvent(callback) {
        // if (!this.props.showAnimationType || this.props.showAnimationType === 'spring') {
            Animated.spring(this._path, {toValue: 1, friction: 9}).start(() => {
                callback && callback();
            });
        // } else {
        //     Animated.timing(this._path, { toValue: 1, duration: 200 }).start(() => {
        //         callback && callback();
        //     });
        // }
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    /**
     * 重写前景动画效果
     * @param {*} path
     */
    _getContentInterpolate(path) {
        let contentHeight = 44 * 5 + parseInt(this.mScreenWidth * 15 / 375);
        return [{
            translateY: path.interpolate({
                inputRange: [0,  1],
                inputRange: [0,  1],
                outputRange: [this.getSize(contentHeight), 0]
            })
        }]
    }

    render() {
        let viewStyle = {
            top: 0,
            backgroundColor: 0x00000050
        };
        if (this.state && this.state.noCover) {
            viewStyle = {
                top: 0,
                backgroundColor: 'transparent'
            }
        }
        if (this.state.isShow || (this.props && this.props.removeSubviews === false)) {
            return <Animated.View
                style={
                    [
                        {
                            position: 'absolute',
                            left: 0, right: 0, bottom: 0,
                            opacity: this._path.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0, 1, 1]
                            }),
                            ...this._getContentPosition(),
                            transform: [
                                {
                                    translateY: this._path.interpolate(
                                        {
                                            inputRange: [0, 0.01, 1],
                                            outputRange: [this.mScreenHeight, 0, 0]
                                        }
                                    )
                                }
                            ]
                        },
                        viewStyle
                    ]
                }>
                <TouchableOpacity
                    onPress={() => {
                        if (!this.props || (this.props.coverClickable || this.props.coverClickable == null)) {
                            this.dismiss(this.props.dismissAction);
                        }
                    }}
                    style={{ position: 'absolute', width: this.mScreenWidth, height: this.mScreenHeight }} />

                <Animated.View style={{
                    // opacity: this._path.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.5, 1] }),
                    transform: this._getContentInterpolate(this._path),
                }}>
                    {this.props.component}
                </Animated.View>
            </Animated.View>
        } else {
            return null;
        }
    }
}

