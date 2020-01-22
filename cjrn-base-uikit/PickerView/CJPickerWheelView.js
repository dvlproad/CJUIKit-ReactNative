import React from 'react';

import {Animated, PanResponder, View} from 'react-native';

import CJBaseComponent from './CJBaseComponent';

// import Svg, {LinearGradient, Rect, Stop} from 'react-native-svg';
import PropTypes from 'prop-types'

class CJPickerWheelView extends CJBaseComponent {

    static propTypes = {
        itemTextColor: PropTypes.number,
        itemSelectedColor: PropTypes.number,
        itemHeight: PropTypes.number,
        onPickerSelected: PropTypes.func,
        selectedIndex: PropTypes.number,
        maxSelectedIndex:PropTypes.number,
        minSelectedIndex:PropTypes.number,
        forceUpdate: PropTypes.bool
    };

    static defaultProps = {
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097D5ff,
        itemHeight: 40,
        onPickerSelected: null,
        selectedIndex: 0,
        maxSelectedIndex:-1,
        minSelectedIndex:-1,
        forceUpdate: false
    };

    _previousTop = 0;

    lastTop = 0;

    constructor(props) {
        super(props);
        let list = ['', ''].concat(props.list).concat(['', '']);
        this.colorPath = [];
        let length = list.length;

        let index = this.validateIndex(props.selectedIndex);
        for (let i = 0; i < length; i++) {
            this.colorPath.push(new Animated.Value(i === (index + 2) ? 1 : 0));
        }

        let toValue = -props.itemHeight * index;
        this.path = new Animated.Value(toValue);

        this.state = {
            list: list,
            selectedIndex: index,
            maxSelectedIndex: props.maxSelectedIndex,
            minSelectedIndex: props.minSelectedIndex
        };

        this.maxValue = 0;
        this.minValue = -props.itemHeight * (list.length - 5);
        this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
        this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
        this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
        this.onPanResponderMove = this.onPanResponderMove.bind(this);
        this.onPanResponderEnd = this.onPanResponderEnd.bind(this);

        //這裏固定在屏幕底部，所以直接寫死touch區域即可。
        this.parentTopY = this.mScreenHeight - props.itemHeight * 5 - this.getSize(15);
        this.parentBottomY = this.mScreenHeight - this.getSize(15);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps) {
            let list = ['', ''].concat(nextProps.list).concat(['', '']);
            let listChange = JSON.stringify(list) !== JSON.stringify(this.state.list);
            let indexChange = nextProps.selectedIndex !== this.state.selectedIndex ||
                nextProps.minSelectedIndex !== this.state.minSelectedIndex ||
                nextProps.maxSelectedIndex !== this.state.maxSelectedIndex ||
                nextProps.itemWidth !== this.props.itemWidth;

            if (listChange || indexChange) {
                console.log('shouldComponentUpdate');
                let toValue = -this.props.itemHeight * nextProps.selectedIndex;
                toValue = this.validateToValue(toValue);
                this.path.setValue(toValue);

                this.colorPath = [];
                let length = list.length;
                let selectedIndex = this.validateIndex(nextProps.selectedIndex);
                for (let i = 0; i < length; i++) {
                    this.colorPath.push(new Animated.Value(i === (selectedIndex + 2) ? 1 : 0));
                }

                nextState.list = list;
                nextState.selectedIndex = selectedIndex;
                nextState.minSelectedIndex = nextProps.minSelectedIndex;
                nextState.maxSelectedIndex = nextProps.maxSelectedIndex;
                this.maxValue = 0;
                this.minValue = -this.props.itemHeight * (list.length - 5);
                return true;
            }
        }
        return false;
    }

    //用户开始触摸屏幕的时候，是否愿意成为响应者；
    onStartShouldSetPanResponder(evt, gestureState) {
        if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
            return false;
        } else {
            this.path && this.path.removeAllListeners();
            this.path.stopAnimation();
            this.keyDown = Date.now();
            return true;
        }
    }

    //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
    onMoveShouldSetPanResponder(evt, gestureState) {
        if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
            return false;
        } else {
            this.path && this.path.removeAllListeners();
            this.path.stopAnimation();
            return true;
        }
    }

    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant(evt, gestureState) {
        this.lastTop = this.path._value;
    }

    // 最近一次的移动距离为gestureState.move{X,Y}
    onPanResponderMove(evt, gestureState) {
        if (global.timer != null) {
            global.timer.map(item => {
                clearTimeout(item);
            });
        }
        this._previousTop = this.lastTop + gestureState.dy;
        if (this._previousTop > 0) {
            this._previousTop = Math.min(this._previousTop, this.maxValue + this.props.itemHeight);
        } else {
            this._previousTop = Math.max(this._previousTop, this.minValue - this.props.itemHeight);
        }
        this.path.setValue(this._previousTop);
        if (this.previousTop) {
            this.velocity = gestureState.dy - this.previousTop;
        } else {
            this.velocity = 0;
        }
        this.previousTop = gestureState.dy;
    }

    /**
     * 校正超限index
     * @param index
     * @returns {*}
     */
    validateIndex(index){
        let tempIndex = index;
        let list = ['', ''].concat(this.props.list).concat(['', '']);
        let maxIndex = list.length - 5;
        if (this.props.maxSelectedIndex !== -1) {
            maxIndex = Math.min(this.props.maxSelectedIndex, maxIndex)
        }

        let minIndex = 0 ;
        if (this.props.minSelectedIndex !== -1) {
            minIndex = Math.max(this.props.minSelectedIndex, minIndex)
        }

        if (index > maxIndex) {
            tempIndex = maxIndex
        }

        if (index < minIndex) {
            tempIndex = minIndex
        }
        return tempIndex
    }

    /**
     * 校正超限 toValue
     * @param toValue
     * @returns {number}
     */
    validateToValue(toValue){
        let index = parseInt(toValue /  -this.props.itemHeight);
        index = this.validateIndex(index);
        return -this.props.itemHeight * index;
    }

    onPanResponderEnd(evt, gestureState) {
        let actionTime = Date.now() - this.keyDown;
        if (actionTime < 300 && Math.abs(gestureState.vy) < 0.1) {//点击
            let clickPosition = -(parseInt((gestureState.y0 - this.parentTopY) / this.props.itemHeight) - 1);
            let toValue = this.path._value;
            let number = Math.round(toValue / this.props.itemHeight);
            toValue = this.props.itemHeight * number;
            toValue = toValue + (this.props.itemHeight * clickPosition);

            toValue = this.validateToValue(toValue);

            if (isNaN(toValue)) {
            } else {
                Animated.timing(this.path, { toValue: toValue, duration: 200 }).start(() => {
                    this.onSeleted(Math.abs(toValue / this.props.itemHeight - 2));
                });
            }
        } else {
            this.lastTop = this._previousTop;
            let toValue = this._previousTop + gestureState.vy * this.props.itemHeight * 2;
            let number = Math.round(toValue / this.props.itemHeight);
            toValue = this.props.itemHeight * number;
            if (toValue > 0) {
                toValue = Math.min(toValue, this.maxValue);
            } else {
                toValue = Math.max(toValue, this.minValue);
            }

            toValue = this.validateToValue(toValue);

            Animated.decay(this.path, {
                velocity: gestureState.vy, //通过手势设置相关速度
                deceleration: 0.995,
            }).start(() => {
                if (this.path._value % this.props.itemHeight === 0) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                } else {
                    //慣性動畫
                    if (this.pathListener) {
                        this.path.removeListener(this.pathListener);
                        this.pathListener = null;
                        let toValue = Math.round(this.path._value / this.props.itemHeight) * this.props.itemHeight;
                        toValue = this.validateToValue(toValue);
                        Animated.timing(this.path, {
                            toValue: toValue,
                            duration: 50
                        }).start(() => {
                            //onSeleted
                            this.onSeleted(Math.abs(toValue / this.props.itemHeight - 2));
                        });
                    }
                }
            });
            //當滾動超出上限或者下限時，接管慣性動畫
            this.pathListener = this.path.addListener((listener) => {

                let minValue = this.minValue;
                if (this.props.maxSelectedIndex !== -1) {
                    let minSelectedValue = -this.props.itemHeight * (this.props.maxSelectedIndex);
                    minValue = Math.max(minSelectedValue, minValue)
                }

                let maxValue = this.maxValue;
                if (this.props.minSelectedIndex !== -1) {
                    let maxSelectedValue = -this.props.itemHeight * (this.props.minSelectedIndex);
                    maxValue = Math.min(maxSelectedValue, maxValue)
                }

                if (listener.value < minValue && this.pathListener) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                    Animated.timing(this.path, { toValue: minValue }).start(() => {
                        this.onSeleted(Math.abs(minValue / this.props.itemHeight - 2));
                    });
                } else if (listener.value > maxValue - this.props.itemHeight && this.pathListener) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                    Animated.timing(this.path, { toValue: maxValue }).start(() => {
                        this.onSeleted(Math.abs(maxValue / this.props.itemHeight - 2));
                    });
                }
            });
        }
    }

    onSeleted(selectedIndex) {
        if (global.timer == null) {
            global.timer = [];
        }
        global.timer.push(setTimeout(() => {
            this.colorPath.map((item, index) => {
                if (item._value === 0 && selectedIndex === index) {
                    item.setValue(1);
                } else if (item._value === 1 && selectedIndex !== index) {
                    item.setValue(0);
                }
            });
            let toValue = this.state.list[selectedIndex];
            this.props.onPickerSelected && this.props.onPickerSelected(toValue);
        }, 20));
    }


    componentWillMount(evt, gestureState) {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderEnd,
            onPanResponderTerminate: this.onPanResponderEnd,
        });
    }

    renderList() {
        return this.state.list.map((item, index) => {
            return this.renderItem(item, index);
        });
    }

    renderItem(item, index) {
        return <View
            key={index}
            style={{
                width: this.props.itemWidth, height: this.props.itemHeight,
                justifyContent: 'center', alignItems: 'center'
            }}>
            <Animated.Text style={{
                color: this.colorPath[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.itemTextColor, this.props.itemSelectedColor]
                }), fontSize: this.props.fontSize ? this.props.fontSize : this.getSize(20),
                backgroundColor: 'transparent', fontWeight: 'normal'
            }}>{item}</Animated.Text>
        </View >
    }

    render() {
        return <View style={{
            width: this.props.itemWidth, height: this.props.itemHeight * 5 + this.getSize(15),
            backgroundColor: '#ffffff'
        }}>
            <View
                ref={ref => this.ref = ref}
                {...this._panResponder.panHandlers}
                style={{
                    overflow: 'hidden',
                    width: this.props.itemWidth, height: this.props.itemHeight * 5 + this.getSize(15), backgroundColor: '#ffffff'
                }}>
                <Animated.View
                    style={{
                        transform: [
                            {
                                translateY: this.path
                            }
                        ]
                    }}
                >
                    {this.renderList()}
                </Animated.View>
                <View style={{ position: 'absolute', width: this.props.itemWidth, height: this.mOnePixel, top: this.props.itemHeight * 4 / 2, backgroundColor: '#E8EEF0' }} />
                <View style={{ position: 'absolute', width: this.props.itemWidth, height: this.mOnePixel, top: this.props.itemHeight * 6 / 2, backgroundColor: '#E8EEF0' }} />
                {/*<Svg*/}
                {/*    onStartShouldSetResponder={() => {*/}
                {/*        return false;*/}
                {/*    }}*/}
                {/*    onResponderStart={() => {*/}
                {/*        return false;*/}
                {/*    }}*/}
                {/*    style={{ position: 'absolute', top: 0 }}*/}
                {/*    height={this.props.itemHeight}*/}
                {/*    width={this.props.itemWidth}*/}
                {/*>*/}
                {/*    <LinearGradient id="grad" x1="0" y1={this.props.itemHeight} x2={0} y2="0">*/}
                {/*        <Stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />*/}
                {/*        <Stop offset="1" stopColor="#ffffff" stopOpacity="1" />*/}
                {/*    </LinearGradient>*/}
                {/*    <Rect*/}
                {/*        x="0"*/}
                {/*        y="0"*/}
                {/*        width={this.props.itemWidth}*/}
                {/*        height={this.props.itemHeight}*/}
                {/*        fill="url(#grad)"*/}
                {/*        clipPath="url(#clip)"*/}
                {/*    />*/}
                {/*</Svg>*/}

                {/*<Svg*/}
                {/*    onStartShouldSetResponder={() => {*/}
                {/*        return false;*/}
                {/*    }}*/}
                {/*    onResponderStart={() => {*/}
                {/*        return false;*/}
                {/*    }}*/}
                {/*    style={{ position: 'absolute', bottom: this.getSize(15) }}*/}
                {/*    height={this.props.itemHeight}*/}
                {/*    width={this.props.itemWidth}*/}
                {/*>*/}
                {/*    <LinearGradient id="grad" x1="0" y1={this.props.itemHeight} x2={0} y2="0">*/}
                {/*        <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />*/}
                {/*        <Stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />*/}
                {/*    </LinearGradient>*/}
                {/*    <Rect*/}
                {/*        x="0"*/}
                {/*        y="0"*/}
                {/*        width={this.props.itemWidth}*/}
                {/*        height={this.props.itemHeight}*/}
                {/*        fill="url(#grad)"*/}
                {/*        clipPath="url(#clip)"*/}
                {/*    />*/}
                {/*</Svg>*/}
                <View style={{ width: this.mScreenWidth, height: this.getSize(15), bottom: 0, backgroundColor: '#ffffff', position: 'absolute' }} />
            </View>

        </View>
    }
}

export default CJPickerWheelView;
