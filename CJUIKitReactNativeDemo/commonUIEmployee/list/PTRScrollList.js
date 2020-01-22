/**
 * Created by woowalker on 2017/8/28.
 */

"use strict";
import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Animated,
    ScrollView,
    ListView,
    FlatList,
    VirtualizedList,
    PanResponder,
    UIManager,
    LayoutAnimation,
    Platform, ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";
import EmptyComponent from "./EmptyComponent";

const {width, height} = Dimensions.get("window");

const G_STATUS_NONE = 0, // 正常手势，没有上拉或者下拉刷新
    G_STATUS_PULLING_DOWN = 1, // ListView 处于顶部，下拉刷新
    G_STATUS_RELEASE_TO_REFRESH = 2, // 拉动距离处于可触发刷新或者加载状态
    G_STATUS_HEADER_REFRESHING = 3, // 顶部正在刷新
    G_STATUS_HEADER_SUCCESS = 4, // 顶部刷新成功
    G_STATUS_FOOTER_NONE = 5, //
    G_STATUS_FOOTER_REFRESHING = 6, // 底部正在加载更多
    G_PULL_DOWN_DISTANCE = 100, //下拉刷新下拉距离大于 80 时触发下拉刷新
    G_PULL_DOWN_REFRESH_DISTANCE = G_PULL_DOWN_DISTANCE - 30;
const TIMER_DELAY_REFRESH_SUCCESS = 500; //刷新成功停留时间

// Enable LayoutAnimation under Android
if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class FooterComponent extends Component {
    render() {
        return <View style={Styles.activeLoad}>
            <ActivityIndicator size="small" animating={true}/>
            <Text style={[Styles.footText, {marginLeft: 10}]}>正在加载...</Text>
        </View>
    }
}

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
            waitTimer: null,
            text: "下拉刷新"
        };
    }

    hc_refreshFinished = () => {
        this._loop && this._loop.stop();
        this._loop = null;
        this.state.waitTimer = setTimeout(() => {
            this.props.ptrScrollFinished && this.props.ptrScrollFinished();
            clearInterval(this.state.waitTimer);
            this.state.waitTimer = null;
        }, 100);
    };
    hc_startLoading = () => {
        this.infiniteLoading();
    };
    hc_updateProgress = per => {
        this.state.progress.setValue(per);
    };
    hc_updateStatus = status => {
        let text = this.state.text;
        if (status === G_STATUS_NONE || status === G_STATUS_PULLING_DOWN) text = "下拉刷新";
        else if (status === G_STATUS_RELEASE_TO_REFRESH) text = "松开刷新";
        else if (status === G_STATUS_HEADER_SUCCESS) text = "刷新成功";
        else text = "正在刷新";
        this.setState({text});
    };
    hc_resetStatus = () => {
        this.state.progress.stopAnimation(() => {
            this.state.progress.setValue(0);
            if (this.state.waitTimer) {
                clearInterval(this.state.waitTimer);
                this.state.waitTimer = null;
            }
        });
    };

    componentWillUnmount() {
        if (this.state.waitTimer) {
            clearInterval(this.state.waitTimer);
            this.state.waitTimer = null;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.text !== this.state.text;
    }

    /** 展示加载动画 */
    infiniteLoading = () => {
        this.state.progress.setValue(0);
        this._loop = Animated.loop(
            Animated.timing(this.state.progress, {
                toValue: 1,
                duration: 1800,
                useNativeDriver: true
            })
        );
        this._loop.start();
    };

    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <LottieView
                    loop={true}
                    imageAssetsFolder={"images/"}
                    style={{width: 40, height: 40,}}
                    source={Platform.OS === 'android' ? require("./loading.json") : require("./loading_ios")}
                    progress={this.state.progress}/>
                <Text style={{
                    fontSize: 13,
                    color: "#999999",
                    bottom: 20,
                    marginTop: 30
                }}>{this.state.text}</Text>
            </View>
        );
    }
}

const totalOffset = 150;

class HeaderRefresh extends Component {
    _top = 0;
    _gestureStatus = G_STATUS_NONE;
    _currentOffset = 0;

    constructor(props) {
        super(props);
        this._top = 0;
        props.getInstance instanceof Function && props.getInstance(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    //通过ref向子组件传数据，避免整个scroll被渲染
    setRefreshStatus(status, offset) {
        let currentStatus = this._gestureStatus;
        if (status === G_STATUS_HEADER_REFRESHING && this._gestureStatus !== status) {
            this._lottieInstance.hc_startLoading && this._lottieInstance.hc_startLoading();
        } else if (status === G_STATUS_PULLING_DOWN || status === G_STATUS_RELEASE_TO_REFRESH) {
            if (offset >= 0) {
                let _per = offset / totalOffset;
                this._lottieInstance.hc_updateProgress && this._lottieInstance.hc_updateProgress(_per);
            }
        }
        this._lottieInstance.hc_updateStatus && this._lottieInstance.hc_updateStatus(status);
        this._gestureStatus = status;
        if (offset >= 0) {
            offset = Math.min(G_PULL_DOWN_DISTANCE, offset);
        }
        let opacity = 1;
        let translateY = offset - G_PULL_DOWN_DISTANCE;
        if (
            (status === G_STATUS_HEADER_REFRESHING && currentStatus === G_STATUS_HEADER_REFRESHING) ||
            (status === G_STATUS_HEADER_SUCCESS && currentStatus === G_STATUS_HEADER_SUCCESS)
        ) {
            translateY = -offset;
        }
        if (status === G_STATUS_PULLING_DOWN || status === G_STATUS_NONE) {
            opacity = Math.min(offset, 10) / 10;
        }
        this._wrapRef.setNativeProps({style: {top: translateY, opacity}});
    }

    render() {
        let Header = this.props.renderHeaderRefresh ? this.props.renderHeaderRefresh : HeaderComponent;
        return (
            <View
                ref={ref => (this._wrapRef = ref)}
                style={[
                    Styles.refresh,
                    {
                        // transform: [{ translateY: -G_PULL_DOWN_DISTANCE }],
                        top: -G_PULL_DOWN_DISTANCE,
                        opacity: 0
                    }
                ]}
            >
                <Header ref={ins => (this._lottieInstance = ins)} ptrScrollFinished={this.props.ptrScrollFinished}/>
            </View>
        );
    }
}

function customLayoutAnimationConfig(duration) {
    return {
        duration,
        create: {
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        update: {
            // property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        },
        delete: {
            property: LayoutAnimation.Properties.opacity,
            type: LayoutAnimation.Types.easeInEaseOut
        }
    };
}

export default class PTRScrollList extends Component {
    _headerRefreshInstance = null; //刷新头实例
    _currentOffsetY = 0;
    _currentContentSizeHeight = 0;
    _footerMoreData = true;
    _ptrHeight = 1;
    _panResponder = null;
    _succedStayTimer = null;
    firstVisible: boolean = true;

    static propTypes = {
        scrollComponent: PropTypes.oneOf(["ScrollView", "ListView", "FlatList", "VirtualizedList"]).isRequired,
        getRef: PropTypes.func,
        onHeaderRefreshing: PropTypes.func,
        onFooterRefreshing: PropTypes.func,
        renderFooterInfinite: PropTypes.object,
        renderHeaderRefresh: PropTypes.object,
        emptyComponent: PropTypes.func,
        ItemSeparatorComponent: PropTypes.func,
        isTopOffset: PropTypes.bool,
        scrollComponentStyle:PropTypes.object
    };

    static defaultProps = {
        scrollComponent: "FlatList",
        scrollComponentStyle:{},
        onHeaderRefreshing: () => null,
        onFooterRefreshing: () => null
    };

    constructor(props) {
        super(props);
        this.state = {
            isTopOffset: props.isTopOffset,
            gestureStatus: G_STATUS_NONE,
            enableFooterInfinite: false || props.enableFooterInfinite,
            enableHeaderRefresh: props.enableHeaderRefresh == undefined ? true : props.enableHeaderRefresh,
            footerStatus: G_STATUS_FOOTER_NONE
        };
        props.getInstance instanceof Function && props.getInstance(this);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderEnd: this.onPanResponderEnd
        });
    }

    componentWillUnmount() {
        if (this._succedStayTimer) {
            clearInterval(this._succedStayTimer);
            this._succedStayTimer = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.enableHeaderRefresh !== undefined) this.state.enableHeaderRefresh = nextProps.enableHeaderRefresh;
        if (nextProps.enableFooterInfinite !== undefined) this.state.enableFooterInfinite = nextProps.enableFooterInfinite;
    }

    onMoveShouldSetPanResponderCapture = (evt, gestureState) => {
        let {dy, vy} = gestureState;
        let result = this.state.gestureStatus !== G_STATUS_HEADER_REFRESHING && gestureState.vy > 0 && this._currentOffsetY == 0;
        this._scrollInstance.setNativeProps({scrollEnabled: !result});
        return result;
    };

    // 开始拖拽
    onPanResponderMove = (evt, gestureState) => {
        let {dy, vy} = gestureState;
        let {enableHeaderRefresh, gestureStatus} = this.state;
        if (enableHeaderRefresh) {
            let y = dy * 0.3;
            if (gestureStatus !== G_STATUS_HEADER_REFRESHING && gestureStatus !== G_STATUS_HEADER_SUCCESS) {
                if (y >= G_PULL_DOWN_DISTANCE) {
                    this._setGestureStatus(G_STATUS_RELEASE_TO_REFRESH);
                } else {
                    this._setGestureStatus(G_STATUS_PULLING_DOWN);
                }
                this._scrollInstance.setNativeProps({style: {paddingTop: y}});
                this._headerRefreshInstance.setRefreshStatus(this.state.gestureStatus, y);
            }
        }
    };

    // 拖拽结束 onPanResponderEnd
    onPanResponderEnd = (evt, gestureState) => {
        let {dy, vy} = gestureState;
        let {enableHeaderRefresh} = this.state;
        let {gestureStatus, footerStatus} = this.state;
        let y = dy * 0.3;
        if (enableHeaderRefresh) {
            if (gestureStatus !== G_STATUS_HEADER_REFRESHING && gestureStatus !== G_STATUS_HEADER_SUCCESS
                && y >= G_STATUS_HEADER_SUCCESS) {
                let duration = 200;
                LayoutAnimation.configureNext(customLayoutAnimationConfig(duration));
                if (y >= G_PULL_DOWN_REFRESH_DISTANCE && footerStatus === G_STATUS_FOOTER_NONE) {
                    this._setGestureStatus(G_STATUS_HEADER_REFRESHING);
                    this._scrollInstance.setNativeProps({style: {paddingTop: G_PULL_DOWN_DISTANCE}});
                    this._headerRefreshInstance.setRefreshStatus(this.state.gestureStatus, G_PULL_DOWN_DISTANCE);
                    duration = Math.min(((y - G_PULL_DOWN_DISTANCE) / G_PULL_DOWN_DISTANCE) * duration, duration);
                } else if ((vy > 0 && /e/g.test(String(vy))) && footerStatus === G_STATUS_FOOTER_NONE) {
                    this._setGestureStatus(G_STATUS_HEADER_REFRESHING);
                    this._scrollInstance.setNativeProps({style: {paddingTop: G_PULL_DOWN_DISTANCE}});
                    this._headerRefreshInstance.setRefreshStatus(this.state.gestureStatus, G_PULL_DOWN_DISTANCE);
                    duration = Math.min(((G_PULL_DOWN_DISTANCE - y) / G_PULL_DOWN_DISTANCE) * duration, duration);
                } else {
                    this._scrollInstance.setNativeProps({style: {paddingTop: 0}});
                    this._headerRefreshInstance.setRefreshStatus(this.state.gestureStatus, 0);
                    duration = Math.min((y / G_PULL_DOWN_DISTANCE) * duration, duration);
                }
            }
        }
    };

    // 动画刷新完成初始化位置
    _headerRefreshDone = (animated = true) => {
        const status = animated ? G_STATUS_HEADER_SUCCESS : G_STATUS_NONE;
        this._setGestureStatus(status);
        this._headerRefreshInstance.setRefreshStatus(status, G_PULL_DOWN_DISTANCE);
        const reset = () => {
            const shouldAnimated = this._currentOffsetY < G_PULL_DOWN_DISTANCE;
            shouldAnimated && LayoutAnimation.configureNext(customLayoutAnimationConfig(200));
            this._setGestureStatus(G_STATUS_NONE);
            this._headerRefreshInstance.setRefreshStatus(G_STATUS_NONE, 0);
            this._scrollInstance.setNativeProps({style: {paddingTop: 0}});
            this._footerRef && this._footerRef.setNativeProps({style: {paddingBottom: 0}});
            this._scrollToPos(shouldAnimated ? 0 : this._currentOffsetY - G_PULL_DOWN_DISTANCE, shouldAnimated);
            this._footerMoreData = true;
            this._updateFooterVisible();
        };
        //刷新成功顶部停留时间
        !animated || TIMER_DELAY_REFRESH_SUCCESS === 0
            ? reset()
            : (this._succedStayTimer = setTimeout(() => {
                reset();
            }, TIMER_DELAY_REFRESH_SUCCESS));
    };
    // 刷新结束
    ptr_headerRefreshFinished = (animated = true) => {
        if (this.state.gestureStatus !== G_STATUS_HEADER_REFRESHING) return;
        if (animated == false) {
            this._headerRefreshDone(animated);
            this._headerRefreshInstance._lottieInstance.hc_resetStatus && this._headerRefreshInstance._lottieInstance.hc_resetStatus();
        } else this._headerRefreshInstance._lottieInstance.hc_refreshFinished && this._headerRefreshInstance._lottieInstance.hc_refreshFinished();
    };
    ptr_footerRefershFinished = moreData => {
        if (this.state.footerStatus !== G_STATUS_FOOTER_REFRESHING) return;
        this.state.footerStatus = G_STATUS_FOOTER_NONE;
        this._footerMoreData = moreData || false;
        this._updateFooterVisible();
    };

    /**  根据状态来判断需要执行的 刷新事件类型 */
    _setGestureStatus = status => {
        this.state.gestureStatus = status;
        if (status === G_STATUS_HEADER_REFRESHING) {
            this.props.onHeaderRefreshing && this.props.onHeaderRefreshing();
            this._footerRef && this._footerRef.setNativeProps({style: {paddingBottom: G_PULL_DOWN_DISTANCE}});
        }
    };

    _scrollToPos = (offset, animated) => {
        let {scrollComponent} = this.props;
        switch (scrollComponent) {
            case "ScrollView":
            case "ListView":
                this._scrollInstance.scrollTo({x: 0, y: offset, animated});
                break;
            case "FlatList":
                this._scrollInstance.scrollToOffset({animated: false, viewPosition: 0, index: 0});
                //this._scrollInstance.scrollToOffset({viewPosition:0,index:0,animated:true});
                break;
            case "VirtualizedList":
                this._scrollInstance.scrollToOffset({offset, animated});
                break;
        }
    };
    /**
     * 页面滚动函数，根据页面的滚动 距离，执行相对应的方法
     */
    onScroll = e => {
        let {contentOffset} = e.nativeEvent;
        this._currentOffsetY = contentOffset.y;
        let {enableHeaderRefresh, gestureStatus} = this.state;
        if (enableHeaderRefresh) {
            let y = this._currentOffsetY;
            if (gestureStatus === G_STATUS_HEADER_REFRESHING || gestureStatus === G_STATUS_HEADER_SUCCESS) {
                this._headerRefreshInstance.setRefreshStatus(this.state.gestureStatus, y);
            }
        }
    };

    onScrollBeginDrag = e => {
        this.onEndReachedCalledDuringMomentum = false;
        this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
    };
    onScrollEndDrag = e => {
        this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
    };
    onContentSizeChange = (w, h) => {
        this._currentContentSizeHeight = h;
        this._updateFooterVisible();
        this.props.onContentSizeChange && this.props.onContentSizeChange(w, h);
    };
    onLayout = e => {
        this._ptrHeight = e.nativeEvent.layout.height;
        this._updateFooterVisible();
        this.props.onLayout && this.props.onLayout(e);
    };

    onEndReachedCalledDuringMomentum = true;
    // 视图滚动开始
    onMomentumScrollBegin = e => {
        this.props.onMomentumScrollBegin && this.props.onMomentumScrollBegin(e);
    };
    onMomentumScrollEnd = e => {
        this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
    };
    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            let {enableFooterInfinite, gestureStatus} = this.state;
            if (enableFooterInfinite && gestureStatus !== G_STATUS_HEADER_REFRESHING && gestureStatus !== G_STATUS_HEADER_SUCCESS && this._footerVisible()) {
                this.props.onFooterRefreshing();
                this.state.footerStatus = G_STATUS_FOOTER_REFRESHING;
            }
            this.onEndReachedCalledDuringMomentum = true;
        }
        this.props.onEndReached && this.props.onEndReached();
    };

    _renderFooterInfinite = () => {
        let Footer = this.props.renderFooterInfinite ? this.props.renderFooterInfinite : FooterComponent;
        return (
            <View ref={ref => (this._footerRef = ref)}
                  style={[Styles.endLoadMore, {display: this._footerVisible() ? "flex" : "none"}]}>
                <Footer/>
            </View>
        );
    };
    //两种情况底部不可见 1、不满一屏 2、没有更多数据
    _footerVisible = () => {
        return this._currentContentSizeHeight >= this._ptrHeight && this._footerMoreData;
    };
    _updateFooterVisible = () => {
        this._footerRef && this._footerRef.setNativeProps({style: {display: this._footerVisible() ? "flex" : "none"}});
    };

    render() {
        let {enableFooterInfinite, enableHeaderRefresh} = this.state;
        let {scrollComponent} = this.props;
        let ScrollComponent = null;
        switch (scrollComponent) {
            case "ScrollView":
                ScrollComponent = ScrollView;
                break;
            case "ListView":
                ScrollComponent = ListView;
                break;
            case "FlatList":
                ScrollComponent = FlatList;
                break;
            case "VirtualizedList":
                ScrollComponent = VirtualizedList;
                break;
            default:
                ScrollComponent = FlatList;
                break;
        }
        return (
            <View
                style={[Styles.wrap, {marginTop: this.state.isTopOffset ? 0 : 50}, this.props.style]} {...this._panResponder.panHandlers}
                collapsable={false}>
                {enableHeaderRefresh ? (
                    <HeaderRefresh
                        getInstance={ins => (this._headerRefreshInstance = ins)}
                        ptrScrollFinished={this._headerRefreshDone}
                        renderHeaderRefresh={this.props.renderHeaderRefresh}
                    />
                ) : null}
                <ScrollComponent
                    {...this.props}
                    style={[this.props.scrollComponentStyle]}
                    ref={ref => {
                        this._scrollInstance = ref;
                        this.props.getRef instanceof Function && this.props.getRef(ref);
                    }}
                    scrollEventThrottle={this.props.scrollEventThrottle || 16}
                    contentContainerStyle={this.props.contentContainerStyle || {backgroundColor: "#ffffff"}}
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onScroll={this.onScroll}
                    onLayout={this.onLayout}
                    bounces={false}
                    ListEmptyComponent={this.props.emptyComponent}
                    ItemSeparatorComponent={this.props.ItemSeparatorComponent}
                    onContentSizeChange={this.onContentSizeChange}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    onEndReachedThreshold={0.01}
                    ListFooterComponent={enableFooterInfinite ? this._renderFooterInfinite() : null}
                    onEndReached={this.onEndReached}
                />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    wrap: {
        flex: 1,
        overflow: "hidden"
    },
    refresh: {
        position: "absolute",
        right: 0,
        height: G_PULL_DOWN_DISTANCE,
        left: 0,
        zIndex: 10000,
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"
    },

    endLoadMore: {
        width,
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    loadMoreFont: {
        fontSize: 12,
        height: 30,
        lineHeight: 30,
        color: "#333333"
    },
    activeLoad: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footText: {
        fontSize: 12,
        color: '#333333',
    },
});
