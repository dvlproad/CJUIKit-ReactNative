import React, { Component } from 'react';
import {
    Modal,
    Text,
    Button,
    View,
    Animated,
    ScrollView,
    Dimensions,
} from 'react-native';
import PropTypes from "prop-types";

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;


export default class CJAlertAnimation extends Component {
    isHide = false;

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            top: screenHeight,
            topAnimated: new Animated.Value(screenHeight),
        };
    }

    renderAlertView() {
        return null;
    }

    render() {
        return (
            <Modal style={{
                width: screenWidth,
                height: screenHeight,
            }}
                   transparent={true}
                   visible={this.state.visible}
            >
                <Animated.View style={{
                    backgroundColor: "#000",
                    opacity: 0.3,
                    position: "absolute",
                    width: screenWidth,
                    height: screenHeight,
                }}>
                </Animated.View>
                <Animated.View style={[{
                    overflow: 'hidden',
                    width: 272,
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    left: (screenWidth - 272) / 2
                }, { top: this.state.topAnimated }]} onLayout={(e) => { this._onLayout(e) }}
                >
                    {this.renderAlertView()}
                </Animated.View>
            </Modal >
        );
    }

    //获取底层灰色bar的宽度
    _onLayout(event) {
        if (this.isHide) {
            return;
        }
        let { height } = event.nativeEvent.layout;
        if (screenHeight != this.state.top) {
            return;
        }
        let top = (screenHeight - height) / 2;
        this.setState({
            top: top
        }, this.changeTop)
    }

    changeTop() {
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 200,
                    toValue: this.state.top
                }
            )
        ]).start();
    }


    //显示动画
    show() {
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 200,
                    toValue: this.state.top
                }
            )
        ]).start();

        this.setState({
            visible: true,
        })
    }

    //隐藏动画
    hideWithAction(action) {
        this.isHide = true;
        this.state.top = screenHeight;
        Animated.parallel([
            Animated.timing(
                this.state.topAnimated,
                {
                    duration: 200,
                    toValue: this.state.top
                }
            ),
        ]).start();

        setTimeout(
            () => {
                this.setState({
                    visible: false,
                }, ()=>{
                    this.isHide = false;
                })
            },
            200
        );


        action && setTimeout(action, 200);
    }
}
