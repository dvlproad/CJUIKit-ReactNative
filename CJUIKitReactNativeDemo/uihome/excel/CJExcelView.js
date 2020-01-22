/**
 * 1.可以设置列固定几排
 *  1.1 设置列数据源和展示方式
 * 2.可以设置行固定一排
 *  2.1 设置行数据源和展示方式
 * 3.可以设置重叠部分展示行还是列
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {PanResponder, View, FlatList} from 'react-native';

class CJExcelView extends Component  {
    static propTypes = {
        // 头部行数
        topRowCount:PropTypes.number,
        // 左边列数
        leftColumnCount:PropTypes.number,
        // 内容列数
        centerColumnCount:PropTypes.number,

        // 获取某一列宽度
        onColumnWidth:PropTypes.func,
        // 获取某一行的高度
        onRowHeight:PropTypes.func,
        // 获取某一列某一行view
        renderItem:PropTypes.func,

        // 获取顶部栏某一列的数据
        onTopDatas:PropTypes.func,
        // 获取底部栏某一列的数据
        onBottomDatas:PropTypes.func,
    };

    static defaultProps = {
        topRowCount:0,
        onColumnWidth:(columnIndex) => {},
        onRowHeight:(rowIndex) => {},
        renderItem:(item,section,index) => {},
        renderColumnItem:(item,section,index) => {},
        onTopDatas:(columnIndex) => {},
        onBottomDatas:(columnIndex) => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
        }
        this.leftLists = [];
        this.centerLists = [];
        // 用于判断一次手势的滑动方向
        this.isActivate = false;
        // 当前滑动的方向，默认是上下
        this.isHorizontal = true;
        // 当前滚动的X坐标
        this.curOffsetX = 0;
        // 当前滚动的Y坐标
        this.curOffsetY = 0;
        // 最大能滚动的X
        this.maxScrollOffsetX = 0;
        // 最大能滚动的Y
        this.maxScrollOffsetY = 0;


    }

    componentWillMount() {
        this.timer = setTimeout(() => {
            this.setState({
                isLoad: true,
            });
            this.timer && clearTimeout(this.timer);
        }, 100);
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // 记录当前的状态,最大滚动距离，当前的offset
                let list;
                if (this.leftLists[0]) {
                    list = this.leftLists[0];
                } else if (this.centerView[0]) {
                    list = this.centerView[0];
                }
                if (list) {
                    // 取出当前list的状态
                    let mer = list._listRef._getScrollMetrics();
                    this.maxScrollOffsetY = mer.contentLength - mer.visibleLength;
                    this.curOffsetY = -mer.offset;
                }

                let centerViewMer = this.centerView._listRef._getScrollMetrics();
                this.maxScrollOffsetX =  centerViewMer.contentLength - centerViewMer.visibleLength;
                this.curOffsetX = -centerViewMer.offset;
            },
            onPanResponderMove: (evt, gestureState) => {
                if (!this.isActivate) {
                    let dy = Math.abs(gestureState.dy);
                    let dx = Math.abs(gestureState.dx);
                    // 超过一定距离才开始判定滑动
                    if (dy > 5 || dx > 5) {
                        // 判断要滑动的方向
                        if (dy < dx) {
                            console.log("现在是左右" + gestureState.dy + "   " + gestureState.dx);
                            this.isHorizontal = false;
                        } else {
                            console.log("现在是上下" + gestureState.dy + "   " + gestureState.dx);
                            this.isHorizontal = true;
                        }
                        this.isActivate = true;
                    }
                } else {
                    if (this.isHorizontal) {
                        let cy = this.curOffsetY + gestureState.dy;
                        if (cy !== 0) {
                            cy = -cy;
                        }
                        this._onMyScroll(cy);
                    } else {
                        let cy = this.curOffsetX + gestureState.dx;
                        if (cy !== 0) {
                            cy = -cy;
                        }
                        this.centerView.scrollToOffset({offset: cy, animated: false});
                    }
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                this.isActivate = false;
                if (this.isHorizontal) {
                    this.curOffsetY = this.curOffsetY + gestureState.dy;
                    if (this.curOffsetY > 0) {
                        this.curOffsetY = 0;
                    } else if (this.curOffsetY < -this.maxScrollOffsetY) {
                        this.curOffsetY = -this.maxScrollOffsetY;
                    }
                } else {
                    this.curOffsetX = this.curOffsetX + gestureState.dy;
                    if (this.curOffsetX > 0) {
                        this.curOffsetX = 0;
                    } else if (this.curOffsetX < -this.maxScrollOffsetX) {
                        this.curOffsetX = -this.maxScrollOffsetX;
                    }
                }
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });
    };

    _topView(section,width, height) {
        let data = this.props.onTopDatas(section);
        return <FlatList style={{height:height, width:width,flexDirection:"column"}}
                         data={data}
                         renderItem={({item,index}) => this._getTopViewItem(item,section,index)}
                         showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false}
                         horizontal={true}
                         scrollEnabled={false}
                         disableScrollViewPanResponder={true}
                         keyExtractor={this._extraUniqueKey}
        />
    }
    _getTopViewItem(item, section,index) {
        if (this.props.renderItem) {
            return this.props.renderItem(item,section,index);
        } else {
            return <View />
        }
    }

    _leftView() {
        if (this.leftView) {
            return this.leftView;
        }

        let width = this._getLeftViewWidth();
        this.leftLists = [];
        let data = [];
        for (let i = 0; i<this.props.leftColumnCount;i++) {
            data.push(i);
        }
        return <FlatList ref={ref => this.leftView = ref}
                         style={{height:this.props.style.height, width:width,flexDirection:"column"}}
                         data={data}
                         renderItem={({index}) => this._getLeftItem(index)}
                         showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false}
                         horizontal={true}
                         scrollEnabled={false}
                         disableScrollViewPanResponder={true}
                         keyExtractor={this._extraUniqueKey}
        />
    }
    _getLeftViewWidth() {
        let width = 0;
        if (this.props.onColumnWidth) {
            for (let i = 0; i<this.props.leftColumnCount;i++) {
                width += this.props.onColumnWidth(i);
            }
        }
        return width;
    }
    _getLeftItem(index) {
        let width = 0;
        if (this.props.onColumnWidth) {
            width = this.props.onColumnWidth(index);
        }
        // 获取头部总的高度
        let topHeight = 0;
        if (this.props.onRowHeight) {
            for (let i = 0; i<this.props.topRowCount;i++) {
                topHeight += this.props.onRowHeight(i);
            }
        }
        let section = index;
        let data = this.props.onBottomDatas(section);
        return <View style={{height:this.props.style.height, width:width,flexDirection:"column"}}
        >
            {this._topView(index,width,topHeight)}
            <FlatList ref={(view) => { this.leftLists.push(view) }}
                      style={{height:this.props.style.height-topHeight, width:width}}
                      data={data}
                      renderItem={({item,index}) => this._getColumnItem(item,section,index+this.props.topRowCount)}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      scrollEnabled={false}
                      keyExtractor={this._extraUniqueKey}
            />
        </View>
    }
    _getColumnItem(item,section,index) {
        if (this.props.renderItem) {
            return this.props.renderItem(item,section,index);
        } else {
            return <View />
        }
    }
    _centerView() {
        if (this.centerView) {
            return this.centerView;
        }
        let leftViewWidth = this._getLeftViewWidth();
        let centerWidth = this.props.style.width - leftViewWidth;
        this.centerLists = [];
        let data = [];
        for (let i = 0; i<this.props.centerColumnCount;i++) {
            data.push(i);
        }
        return <FlatList ref={ref => this.centerView = ref}
                         style={{height:this.props.style.height, width:centerWidth}}
                         data={data}
                         renderItem={({index}) => this._getCenterItem(index)}
                         showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false}
                         horizontal={true}
                         scrollEnabled={false}
                         disableScrollViewPanResponder={true}
                         keyExtractor={this._extraUniqueKey}
        />;
    }

    _getCenterItem(index) {
        // 获取头部总的高度
        let topHeight = 0;
        if (this.props.onRowHeight) {
            for (let i = 0; i<this.props.topRowCount;i++) {
                topHeight += this.props.onRowHeight(i);
            }
        }
        let section = index + this.props.leftColumnCount;
        let data = this.props.onBottomDatas(section);
        let width = this.props.onColumnWidth(section);
        return <View style={{height:this.props.style.height, width:width,flexDirection:"column"}}
        >
            {this._topView(section,width,topHeight)}
            <FlatList ref={(view) => { this.centerLists.push(view) }}
                      style={{height:this.props.style.height-topHeight, width:width}}
                      data={data}
                      renderItem={({item,index}) => this._getColumnItem(item,section,index+this.props.topRowCount)}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      scrollEnabled={false}
                      keyExtractor={this._extraUniqueKey}
            />
        </View>
    }

    _onMyScroll = (offset) => {
        this.leftLists.map((listView)=> {
            if (listView) {
                listView.scrollToOffset({offset: offset, animated: false});
            }
        });
        this.centerLists.map((listView)=> {
            if (listView) {
                listView.scrollToOffset({offset: offset, animated: false});
            }
        });
    };

    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }

    render() {
        if (!this.state.isLoad) return <View/>;
        return <View style={{...this.props.style,flexDirection:"row",backgroundColor:'red'}}
                     {...this._panResponder.panHandlers}
        >
            {this._leftView()}
            {this._centerView()}
        </View>
    };
}

export default CJExcelView;
