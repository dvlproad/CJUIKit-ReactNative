/**
 * Created by 范冬冬 on 2019/11/7
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

const kAnimatedTime = 300;

/**
 * 一个下滑动画的蒙层
 */
export default class extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        opacityAnimatedValue: new Animated.Value(0),
        offsetMaxY: 500,
    };

    translateYAnimated = Animated.timing(
        this.state.animatedValue,
        {
            toValue: 1,
            duration: kAnimatedTime,
            easing: Easing.in,
        }
    );

    opacityAnimated = Animated.timing(
        this.state.opacityAnimatedValue,
        {
            toValue: 1,
            duration: kAnimatedTime,
            easing: Easing.in,
        }
    );

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.translateYAnimated.start();
        this.opacityAnimated.start();
    }

    render() {
        const translateY = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.offsetMaxY, 0],
        });

        const opacity = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.6],
        });

        return (
            <View style={styles.background}>
                <Animated.View style={[styles.mask, { opacity: opacity }]}/>
                <Animated.View
                    style={[styles.container, {
                        transform: [
                            {translateY: translateY},
                        ]
                    }]}
                    onLayout={this._onLayout.bind(this)}
                >
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }

    _onLayout({ nativeEvent: { layout: { width, height }}}) {
        this.setState({
            offsetMaxY: -height
        });
    }

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#00000000',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: -1,
    },
    mask: {
        backgroundColor: '#000000',
        flex: 1,
    },
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
});
