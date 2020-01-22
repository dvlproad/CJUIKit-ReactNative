/**
 * @author Allen
 * @create date 2019-11-05 16:49:58
 * @modify date 2019-11-05 16:49:58
 * @desc [description]
 */
import React, {Component, PureComponent} from 'react';
import './CJDateUtil';
import Overlay from "teaset/components/Overlay/Overlay";
import {
    Animated,
    AppRegistry,
    DeviceEventEmitter,
    Dimensions,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

export default class CJPickerContainer extends Component {

    mScreenWidth = Dimensions.get('window').width;

    mScreenHeight = Dimensions.get('window').height;

    //最小显示单位
    mOnePixel = (PixelRatio.get() === 3 ? 2 : 1) / PixelRatio.get();

    _path = new Animated.Value(0);

    isShowing() {
        return this.state.isShow;
    }

    get handler() {
        return this.handlers.length > 0 ? this.handlers[this.handlers.length - 1] : this;
    }

    static add(element, showCallback, hideCallback) {
        DeviceEventEmitter.emit("showOverlay", {element, showCallback, hideCallback});
    }

    static hide(hideCallback) {
        DeviceEventEmitter.emit("hideOverlay", {hideCallback});
    }

    static remove() {
        DeviceEventEmitter.emit("removeOverlay", {});
    }

    constructor(props) {
        super(props);
        this.handlers = [];
        this.state = {
            element: null,
            isShow: false,
            noCover: false,  // 默认false,即有背景蒙层
        }
    }

    componentDidMount() {
        DeviceEventEmitter.addListener("showOverlay", e => this.handler.show(e));
        DeviceEventEmitter.addListener("hideOverlay", e => this.handler.hide(e));
        DeviceEventEmitter.addListener("removeOverlay", e => this.handler.remove(e));
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners("showOverlay");
        DeviceEventEmitter.removeAllListeners("hideOverlay");
        DeviceEventEmitter.removeAllListeners("removeOverlay");
    }

    /**
     * 显示日期选择器(默认显示 yyyyMMdd 选择器)
     */
    show(e) {
        let { element, showCallback, hideCallback } =  e;
        this.setState({
            noCover: false,
            isShow: true,
            element:element,
            hideCallback: hideCallback
        }, () => {
            this.showEvent(showCallback);
        })
    }

    hide(e) {
        let { hideCallback } = e;
        Animated.timing(this._path, { toValue: 0, duration: 200 }).start(() => {
            this.setState({ isShow: false }, () => {
                hideCallback && hideCallback();
            });
        });
    }

    remove(e) {
        this.setState({
            noCover: false,
            isShow: false,
            element:null,
        }, () => {
            this.hide(()=>{});
        })
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'flex-start' }
    }

    /**
     * 重写前景动画效果
     * @param {*} path
     */
    _getContentInterpolate(path) {
        return [{
            translateY: path.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [this.getSize(200), this.getSize(200), 0]
            })
        }]
    }

    showEvent(callback) {
        if (!this.props.showAnimationType || this.props.showAnimationType === 'spring') {
            Animated.spring(this._path, { toValue: 1 }).start(() => {
                callback && callback();
            });
        } else {
            Animated.timing(this._path, { toValue: 1 }).start(() => {
                callback && callback();
            });
        }
    }

    /**
     * return 當前分辨率下的數值
     * @param {*} size 375标注图下的值
     */
    getSize(size) {
        return parseInt(this.mScreenWidth * size / 375);
    }

    renderContent() {
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
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        ...this._getContentPosition(),
                        transform: [
                            {
                                translateX: this._path.interpolate(
                                    {
                                        inputRange: [0, 0.01, 1],
                                        outputRange: [-this.mScreenWidth, 0, 0]
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
                        this.hide({hideCallback: this.state.hideCallback});
                    }
                }}
                style={{ position: 'absolute', width: this.mScreenWidth, height: this.mScreenHeight }} />

            <Animated.View style={{
                opacity: this._path.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] }),
                transform: this._getContentInterpolate(this._path),
            }}>
                <View
                    style={[{flexDirection:'column', justifyContent: 'flex-end'},
                        {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        },]}
                    pointerEvents='box-none'>
                    {this.state.element}
                </View>
            </Animated.View>
        </Animated.View>
    }

    render() {
        return (
            <View style={{backgroundColor: '#000', flex: 1}}>
                <PureView>
                    {this.props.children}
                </PureView>
                <View style={styles.overlay} pointerEvents='box-none'>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

// class PureView extends PureComponent {
//     render() {
//         return (
//             <View style={{flex: 1}}>
//                 {this.props.children}
//             </View>
//         );
//     }
// }

// if (!AppRegistry.registerComponentOld) {
//     AppRegistry.registerComponentOld = AppRegistry.registerComponent;
// }
//
// AppRegistry.registerComponent = function(appKey, componentProvider) {
//
//     class RootElement extends Component {
//         render() {
//             let Component = componentProvider();
//             return (
//                 <CJPickerContainer>
//                     <Component {...this.props} />
//                 </CJPickerContainer>
//             );
//         }
//     }
//
//     return AppRegistry.registerComponentOld(appKey, () => RootElement);
// };
