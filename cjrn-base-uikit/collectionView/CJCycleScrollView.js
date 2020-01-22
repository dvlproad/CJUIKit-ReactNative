/**
 * CJCycleScrollView.js
 *
 * @Description: CJCycleScrollView
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2020/1/14 20:00:18
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Image,
    ScrollView,
    Dimensions,
    Platform,
    TouchableWithoutFeedback
} from 'react-native'

const screenWidth = Dimensions.get('window').width;

export default class CJCycleScrollView extends Component {
    static propTypes = {
        //圆点对齐: left/center/right
        dotAlign: PropTypes.string,
        //圆点颜色
        dotColor: PropTypes.string,
        //圆点激活颜色
        dotSelectedColor: PropTypes.string,
        //是否自动播放
        autoPlay: PropTypes.bool,
        //图片拉伸模式
        imgResizeMode: PropTypes.string,
        //是否循环
        loop: PropTypes.bool,
        //数据
        datas: PropTypes.array,
        //自定义view方法
        childRender: PropTypes.func,
        //点击事件方法
        onItemClick: PropTypes.func
    }

    static defaultProps = {
        dotAlign: 'center',
        dotColor: '#f4797e',
        dotSelectedColor: '#ffffff',
        autoPlay: false,
        imgResizeMode: 'stretch',
        loop: false,
        datas: ['#dfe24a', '#68eaf9', '#ef9af9'],
        childRender: () => null,
        onItemClick: null
    }

    constructor(props) {
        super(props);
        this.state = {
            //视图的宽度，不传则为全屏宽度
            width: this.props.width || screenWidth,
            //视图的高度
            height: this.props.height || 150,
            //视图个数
            total: this.props.datas.length,
            //当前视图idx
            currentIndex: 0,
        }
        this.internals = {
            ...this.internals,
            isScrolling: false
        }
        this._index = 0;
    }

    //默认自定义view方法
    _defaultChildView(item, position = -1) {
        const { width, height } = this.state;
        const { onItemClick, imgResizeMode } = this.props;
        let view;
        if (typeof (item) === 'string') {
            if (item.charAt(0) === '#') {
                view = <View key={position} style={{ width: width, height: height, backgroundColor: item }} />;
            } else if (item.indexOf('http') >= 0) {
                view = <Image style={{ width: width, height: height, resizeMode: imgResizeMode }} source={{ uri: item }} />;
            }
        } else {
            view = <Image style={{ width: width, height: height, resizeMode: imgResizeMode }} source={item} />;
        }
        if (onItemClick) {
            //如果有点击事件方法，则渲染TouchableWithoutFeedback
            return (
                <TouchableWithoutFeedback onPress={() => {
                    if (!this.missTouch) {
                        onItemClick(position);
                    }
                    this.missTouch = false;
                }}>
                    {view}
                </TouchableWithoutFeedback>
            )
        } else {
            return view;
        }
    }

    render() {
        const { total, currentIndex, width, height } = this.state;
        const { childRender, loop, datas, dotAlign, dotColor, dotSelectedColor } = this.props;
        //遍历生成视图
        let children = datas.map((v, i) => {
            return childRender(v, i) || this._defaultChildView(v, i);
        });
        //循环的话，头尾各加一个吧
        if (total > 1 && loop) {
            const first = datas[0];
            const last = datas[total - 1];
            children.unshift(childRender(last, total - 1) || this._defaultChildView(last, total));
            children.push(childRender(first, 0) || this._defaultChildView(first, -1));
        }
        //生成圆点
        let dots = total <= 1 ? null : datas.map((v, i) => {
            return (<View key={i} style={[{ backgroundColor: (i == currentIndex) ? dotSelectedColor : dotColor }, styles.circle]} />);
        });
        //判断圆点对齐方式
        let dotsAlign = { top: height - 20 };
        switch (dotAlign) {
            case 'left':
                dotsAlign.left = 10;
                break;
            case 'right':
                dotsAlign.right = 10;
                break;
            case 'center':
            default:
                let length = datas.length;
                let circleLength = 6 * length + 5 * 2 * length;
                let center = (width - circleLength) / 2;
                dotsAlign.left = center
        }

        return (
            <View style={[styles.container, { width: width, height: height }]}>
                <ScrollView horizontal={true}
                    {...this.props}
                    scrollEnabled={false}
                    scrollEventThrottle={16}
                    onLayout={this._onScrollLayout}
                    onMomentumScrollEnd={this._onScrollEnd}
                    onTouchStart={this._onTouchStart}
                    onTouchEnd={this._onTouchEnd}
                    onTouchMove={this._onTouchMove}
                    onTouchCancel={this._onTouchCancel}
                    onScroll={this._onScroll}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ref={s => { this._scrollView = s; }}>
                    {children}
                </ScrollView>
                <View style={[styles.circleContainer, dotsAlign]}>{dots}</View>
            </View>
        )
    }
    //布局完成
    _onScrollLayout = () => {
        if (this.props.loop && this.state.total > 1) {
            this._scrollView.scrollTo({ ...{ x: this.state.width }, animated: false })
        }
    }
    //触屏取消
    _onTouchCancel = e => {
        this._onTouchEnd(e);
    }
    //触碰开始
    _onTouchStart = e => {
        const { width } = this.state;
        this.internals.isScrolling = true;
        this.touchEvent = {
            x: e.nativeEvent.pageX,
            o: this._index * width
        }
        clearInterval(this._timer);
        this._timer = null;
    }
    //触碰移动
    _onTouchMove = e => {
        this.missTouch = true;
        const offsetX = this.touchEvent.x - e.nativeEvent.pageX;
        this._scrollView.scrollTo({ ...{ x: this.touchEvent.o + offsetX }, animated: false });
    }
    //触屏结束
    _onTouchEnd = e => {
        const { width } = this.state;
        this.internals.isScrolling = false;
        this._scrollView.scrollTo({ ...{ x: this._index * width }, animated: true });

        if (Platform.OS === 'android') {
            this._scrollTo(this._index);
            this._refreshFocusIndicator();
        }
        if (!this._timer) {
            this._initTimer();
        }
    }
    //滑动结束
    _onScrollEnd = e => {
        const { width } = this.state;
        this.internals.isScrolling = false;
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        this._index = Math.round(contentOffsetX / width);
        this._scrollTo(this._index);
        this._refreshFocusIndicator();
    }

    //滑动时计算当前页面
    _onScroll = e => {
        const { width } = this.state;
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        this._index = Math.round(contentOffsetX / width);
    }
    //滚到指定视图位置
    _scrollTo = (position) => {
        let loopJump = false;
        if (this.props.loop && this.state.total > 1) {
            if (position === 0) {
                position = this.state.total;
                this._index = position;
                loopJump = true;
            } else if (position >= this.state.total + 1) {
                position = 1;
                this._index = position;
                loopJump = true;
            }
        }
        if (loopJump) {
            const { width } = this.state;
            this._scrollView.scrollTo({ ...{ x: position * width }, animated: Platform.OS === 'android' })
        }
    }
    //重置小圆点状态
    _refreshFocusIndicator() {
        if (this.props.loop) {
            const index = this._index > this.state.total ? 0 : (this._index - 1);
            this.setState({ currentIndex: index });
        } else {
            this.setState({ currentIndex: this._index });
        }
    }
    //设置自动播放定时器
    _initTimer = () => {
        if (this.state.total > 1 && this.props.loop && this.props.autoPlay) {
            this._timer = setInterval(function () {
                const { width } = this.state;
                if (this._index >= this.state.total + 1) {
                    this._index = 1;
                    this._scrollView.scrollTo({ ...{ x: this._index * width }, animated: false })
                }
                this._index++;
                this._scrollView.scrollTo({ ...{ x: this._index * width }, animated: true })
                this._refreshFocusIndicator();
            }.bind(this), 3500);
        }
    }
    // 组件装载完成
    componentDidMount() {
        if (this.state.total > 1 && this.props.loop) {
            this._index = 1;
        }
        this._initTimer();
    }
    // 组件即将卸载
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    // 组件接收到新属性
    componentDidUpdate(nextProps) {
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    circleContainer: {
        flexDirection: 'row',
        position: 'absolute'
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 6,
        marginHorizontal: 5,
    },
};