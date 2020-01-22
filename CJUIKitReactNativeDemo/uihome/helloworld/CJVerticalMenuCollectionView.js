import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, SectionList, PanResponder, Text, View, Button} from 'react-native';

class CJVerticalMenuCollectionView extends Component {
    static propTypes = {
        // 数据，必须使用title，data的格式
        data: PropTypes.array,
        // 左侧区域的宽度
        leftWidth: PropTypes.number,
        // 左侧区域的背景颜色
        leftViewBackgroundColor: PropTypes.string,
        // 右侧区域的背景颜色
        rightViewBackgroundColor: PropTypes.string,

        // 渲染左视图
        onLeftItem: PropTypes.func,
        // 渲染右侧头部
        onRightHeader: PropTypes.func,
        // 渲染右侧视图
        onRightItem: PropTypes.func,
        // 渲染右侧组与组分割组件
        onRightSectionSeparatorComponent: PropTypes.func,
        // 渲染右侧组头部
        onRightListHeaderComponent: PropTypes.func,
        // 渲染右侧组尾部
        onRightListFooterComponent: PropTypes.func,
    };

    static defaultProps = {
        data: [],
        leftWidth: 10,
        leftViewBackgroundColor: 'white',
        rightViewBackgroundColor: 'white',
        onLeftItem: (item, index, isSelect) => {
            return null;
        },
        onRightHeader: (section, width, index) => {
            return null;
        },
        onRightItem: (item, width, index) => {
            return null;
        },
        onRightSectionSeparatorComponent: (item)=> {
            return null;
        },
        onRightListHeaderComponent: ()=> {
            return null;
        },
        onRightListFooterComponent: ()=> {
            return null;
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
        this.leftToIndex = -1;
    };

    _extraUniqueKey(item, index) {
        return "index" + index + item;
    };

    _leftView() {
        return <FlatList ref={ref => this.leftView = ref}
                         style={{
                             height: this.props.style.height,
                             width: this.props.leftWidth,
                             backgroundColor: this.props.leftViewBackgroundColor,
                         }}
                         data={this.props.data}
                         renderItem={({item, index}) => this._getLeftItem(item, index)}
                         showsVerticalScrollIndicator={false}
                         showsHorizontalScrollIndicator={false}
                         horizontal={false}
                         keyExtractor={this._extraUniqueKey}

        />;
    };

    _getLeftItem(item, index) {
        return this.props.onLeftItem(item, index, index === this.state.currentIndex);
    };

    onLeftItemPress(index) {
        if (index === this.state.currentIndex) {
            return;
        }
        this.leftToIndex = index;
        this.setState({currentIndex: index});
        this.rightView.scrollToLocation({
            sectionIndex: index,
            itemIndex: 0,
        });
    };

    renderSectionHeader(section, index) {
        let width = this.props.style.width - this.props.leftWidth;
        return this.props.onRightHeader(section, width, index);
    };

    _getRightItem(item, index) {
        return this.props.onRightItem(item, this.props.style.width - this.props.leftWidth, index);
    };

    onRightViewScroll(event) {
        let section = event.viewableItems[0].section;
        if (section) {
            let index = this.props.data.indexOf(section);
            if (index < 0) {
                index = 0;
            } else if (index > this.props.data.length - 1) {
                index = this.props.data.length - 1;
            }
            if (this.leftToIndex === -1) {
                if (index === this.state.currentIndex) {
                    return;
                }
                this.setState({currentIndex: index});
            } else {
                if (index === this.leftToIndex) {
                    this.leftToIndex = -1;
                }
            }
        }
    };

    _rightView() {
        let width = this.props.style.width - this.props.leftWidth;
        return <SectionList ref={ref => this.rightView = ref}
                            style={{
                                height: this.props.style.height,
                                width: width,
                                backgroundColor: this.props.rightViewBackgroundColor
                            }}
                            sections={this.props.data}
                            renderItem={({item, index}) => this._getRightItem(item, index)}
                            renderSectionHeader={({section, index}) => this.renderSectionHeader(section, index)}
                            SectionSeparatorComponent = {(item) => this.props.onRightSectionSeparatorComponent(item)}
                            ListHeaderComponent = {() => this.props.onRightListHeaderComponent()}
                            ListFooterComponent = {() => this.props.onRightListFooterComponent()}
                            horizontal={false}
                            keyExtractor={this._extraUniqueKey}
                            onViewableItemsChanged={(event) => this.onRightViewScroll(event)}
        />;
    };

    render() {
        return <View style={{...this.props.style, flexDirection: 'row'}}>
            {this._leftView()}
            {this._rightView()}
        </View>;
    };
}

export default CJVerticalMenuCollectionView;
