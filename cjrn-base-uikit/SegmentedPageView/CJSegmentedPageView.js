import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * tab页面滑动切换视图
 */
export default class CJSegmentedPageView extends Component {

    static propTypes = {
        index: PropTypes.number,
        pageModels: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                page: PropTypes.element,
            })
        ),

        titleViewHeight: PropTypes.number,
        titleStyle: PropTypes.shape({
            fontFamily: PropTypes.string,
            fontSize: PropTypes.number,
            normalColor: PropTypes.string,
            selectedColor: PropTypes.string,
            fontWeight: PropTypes.string,
            selectedFontWeight: PropTypes.string,
        }),
        slideLineStyle: PropTypes.shape({
            color: PropTypes.string,
            height: PropTypes.number,
            width: PropTypes.number,
        }),
    };

    static defaultProps = {
        index: 0,
        pageModels: [],
        titleViewHeight: 50,
        titleStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 14,
            normalColor: '#333333',
            selectedColor: '#192B93',
            fontWeight: 'normal',
            selectedFontWeight: 'bold',
        },
        slideLineStyle: {
            color: '#192B93',
            height: 3,
            width: 30,
        }
    };

    state = {
        index: 0,
        pageModels: [],
        slideAnimatedValue: new Animated.Value(0),
    };

    inputRange = [];
    outputRange = [];

    constructor(props) {
        super(props);
        this.state = { ...this.state, ...props };
        this._calcAnimatedRange();
    }

    render() {
        const translateX = this.state.slideAnimatedValue.interpolate({
            inputRange: this.inputRange,
            outputRange: this.outputRange,
        });

        return (
            <View style={styles.container}>
                <View style={[styles.topContainer, {
                    height: this.state.titleViewHeight,
                }]}>
                    {this._renderTitleViews()}
                    <Animated.View style={[
                        styles.slideLine,
                        {
                            transform: [
                                { translateX: translateX }
                            ],
                            width: width / this.state.pageModels.length,
                            height: this.state.slideLineStyle.height,
                        }
                    ]}>
                        <View
                            style={{
                                backgroundColor: this.state.slideLineStyle.color,
                                width: this.state.slideLineStyle.width,
                            }}
                        />
                    </Animated.View>
                </View>
                <View style={styles.line}/>
                <ScrollView
                    pagingEnabled={true}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={'scrollView'}
                    onScrollEndDrag={this._onScrollEndDrag.bind(this)}
                >
                    {this._renderComponentViews()}
                </ScrollView>
            </View>
        );
    }

    _renderTitleViews() {
        const titleViews = [];
        this.state.pageModels.forEach((pageModel, index) => {
            const color = this.state.index == index ? this.state.titleStyle.selectedColor : this.state.titleStyle.normalColor;
            const fontWeight = this.state.index == index ? this.state.titleStyle.selectedFontWeight : this.state.titleStyle.fontWeight;
            const titleView = (
                <View style={{ flex: 1 }} key={`PickerTitleView${index}`} >
                    <TouchableOpacity style={styles.btn} onPress={this._onTitlePress.bind(this, index)}>
                        <Text style={{
                            color: color,
                            fontWeight: fontWeight,
                            fontFamily: this.state.titleStyle.fontFamily,
                            fontSize: this.state.titleStyle.fontSize,
                        }} >{pageModel.title}</Text>
                    </TouchableOpacity>

                </View>
            );
            titleViews.push(titleView);
        });
        return titleViews;
    }

    _renderComponentViews() {
        const componentViews = [];
        this.props.pageModels.forEach((pageModel, index) => {
            const view = (
                <View style={styles.componentContainer} key={`PickerContentView${index}`}>
                    {pageModel.page}
                </View>
            );
            componentViews.push(view);
        });
        return componentViews;
    }

    _onScrollEndDrag({ nativeEvent: { contentOffset: { x } } }) {
        const offsetIndex = Math.round(x / width);
        this._onTitlePress(offsetIndex);
    }

    _onTitlePress(index) {
        this.setState({
            index: index,
        })
        this._startAnimated(this.inputRange[index]);
        this.refs.scrollView.scrollTo({ x: width * index, y: 0, duration: 300 })
    }

    _startAnimated(value) {
        Animated.timing(
            this.state.slideAnimatedValue,
            {
                toValue: value,
                duration: 300,
                easing: Easing.in,
            }
        ).start();
    }

    /**
     * 计算动画参数
     */
    _calcAnimatedRange() {
        const inputRangeSpace = 1.0 / (this.state.pageModels.length - 1);
        const outputRangeSpace = width / this.state.pageModels.length

        this.state.pageModels.forEach((pageModel, index) => {
            this.inputRange.push(index * inputRangeSpace);
            this.outputRange.push(index * outputRangeSpace);
        });
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    topContainer: {
        flexDirection: 'row',
    },
    slideLine: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    btn: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    componentContainer: {
        width: width,
    },
    line: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#dddddd'
    },
});
