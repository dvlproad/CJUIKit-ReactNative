/**
 * CJLoadingImage.js
 *
 * @Description: 图片控件(只含加载动画,但不含其他可操作事件)
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-06-07 19:54:15
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
/*
使用示例

import CJLoadingImage from '../../commonUI/image/CJLoadingImage';

                <CJLoadingImage style={{width: 200, height: 200, backgroundColor:'red'}}
                                source={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'}}
                />

 */

import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const viewPropTypes = ViewPropTypes || View.propTypes;
const stylePropTypes = viewPropTypes.style;

import { ObjectCJHelper } from '../Helper/ObjectCJHelper';

/// 图片加载状态
var CJImageLoadStatus = {
    Pending: 0,     /**< 准备加载 */
    Loading: 1,     /**< 正在加载 */
    Success: 2,     /**< 加载成功 */
    Failure: 3,     /**< 加载失败 */
    End:     4,     /**< 加载结束 */
    ErrorImageSuccess: 5,     /**< 加载"加载失败时候的照片"成功 */
    ErrorImageFailure: 6,     /**< 加载"加载失败时候的照片"也失败 */
};



export default class CJLoadingImage extends Component {
    static propTypes = {
        //source: PropTypes.number.isRequired,    //图片
        defaultSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),    //图片加载前的默认显示图
        errorSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),      //图片加载失败的显示图
        imageBorderStyle: stylePropTypes,   //图片边框样式

        onLoadComplete: PropTypes.func, //图片加载结束的回调

        // 是否需要加载动画(默认需要)
        // 有以下体验不友好的情况需要特殊处理：即从本地上传的图片会得到网络图片地址，
        // 如果此时把网络图片的地址更新上去，会导致再显示菊花loading，不大友好，需要设置本属性为false
        needLoadingAnimation: PropTypes.bool,

        stateTextHeight: PropTypes.number,  // 图片上的状态文本视图所占的高度
        stateTextString: PropTypes.string,   // 图片上的状态文本
    };

    static defaultProps = {
        source: require('./resources/imageDefault.png'),
        defaultSource: require('./resources/imageDefault.png'),
        errorSource: require('./resources/imageError.png'),
        imageBorderStyle: {
            borderRadius: 6,
            borderWidth: 0,
            borderColor: "#E5E5E5",
        },

        onLoadComplete: ()=>{},

        needLoadingAnimation: false,

        stateTextHeight: 0,
        stateTextString: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isNetworkImage: false,
            loadStatus: CJImageLoadStatus.Pending,
            shouldShowErrorSource: false,
            isShowingErrorSource: false,
        }
    }

    componentDidMount(): void {
        this.state.isNetworkImage = this.checkIsNetworkImage(this.props.source);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.source !== nextProps.source){
            this.state.shouldShowErrorSource = false;
            this.state.isShowingErrorSource = false;

            let isNetworkImage = this.checkIsNetworkImage(nextProps.source);
            this.setState({
                isNetworkImage: isNetworkImage,
            })
        }
    }

    /**
     * 是否是网络图片
     */
    checkIsNetworkImage= (imageSource) => {
        let isNetworkImage = false;
        if (imageSource.hasOwnProperty('uri') && typeof imageSource['uri'] === 'string') {
            let uri = imageSource['uri'];
            if (uri.indexOf('http:') == 0 || uri.indexOf('https:') == 0) {
                isNetworkImage = true;
            }
        }
        return isNetworkImage;
    }

    /**
     * 开始加载(当开始加载图片调用该方法)
     */
    onLoadStart = () => {
        let loadStatus = this.state.isNetworkImage ? CJImageLoadStatus.Loading : CJImageLoadStatus.Success;
        this.setState({
            loadStatus: loadStatus,
        })
    }


    /**
     * 加载结束(当加载完成回调该方法，不管图片加载成功还是失败都会调用该方法)
     */
    onLoadEnd = () => {
        if (this.state.isShowingErrorSource) { //防止重复setState，死循环

        } else {
            this.props.onLoadComplete();
        }

        this.setState({
            loadStatus: CJImageLoadStatus.End
        })
    }


    /**
     * 加载成功(当图片加载成功之后，回调该方法)
     */
    onLoadSuccess=() => {
        if (this.state.isShowingErrorSource) {
            this.state.loadStatus = CJImageLoadStatus.ErrorImageSuccess;
        } else {
            this.state.loadStatus = CJImageLoadStatus.Success;
        }
    }

    /**
     * 加载失败(该属性要赋值一个function，当加载出错执行赋值的这个方法)
     * @param {*} error
     */
    onLoadError=(error) => {
        if (this.state.isShowingErrorSource) {
            console.log("如果当要显示的图加载失败时候，转为显示加载失败时，" +
                "却发现连传入的图片加载失败图都是错误的，那就不处理");
            this.state.loadStatus = CJImageLoadStatus.ErrorImageFailure;

        } else {
            this.state.shouldShowErrorSource = true;
            if (this.state.isNetworkImage) {
                console.log("加载图片失败" + '\n'
                    + "加载的图片的地址是:" + this.props.source['uri'] + '\n'
                    + '失败原因:' + error.nativeEvent.error);
            } else {
                console.log("加载图片失败" + '\n'
                    + "加载的图片的地址是:" + "为本地图片" + '\n'
                    + '失败原因:' + error.nativeEvent.error);
            }

            this.state.loadStatus = CJImageLoadStatus.Failure;
        }
    }


    render() {
        let selfStyle = ObjectCJHelper.dealPropStyle(this.props.style);

        const imageWidth = selfStyle.width;
        const imageHeight = selfStyle.height;

        if (selfStyle.width > 0 && selfStyle.height > 0) {

        } else {
            selfStyle = [{flex:1}, selfStyle];
        }


        let stateTextString = this.props.stateTextString;

        let stateBGColor = stateTextString && stateTextString.length > 0 ? 'rgba(0,0,0,0.6)' : null;

        let stateTextWidth = imageWidth;
        let stateTextHeight = this.props.stateTextHeight;
        let stateTextStyle ={flex: 1, textAlign: 'center', fontSize: 17, color: '#FFFFFF'};
        stateTextStyle = [stateTextStyle, {lineHeight: stateTextHeight}];

        let stateComponentStyle = [
            {
                backgroundColor:stateBGColor,
                position:'absolute',
                width:stateTextWidth,
                height:stateTextHeight
            },
            this.props.imageBorderStyle
        ];

        let stateComponent = (
            <View style={stateComponentStyle}>
                <Text
                    style={stateTextStyle}
                >
                    {stateTextString}
                </Text>
            </View>
        );

        let showLoadingHUD = false;
        if (this.props.needLoadingAnimation) {
            showLoadingHUD = this.state.loadStatus == CJImageLoadStatus.Loading;
        }

        let imageStyle = [
            {
                width: imageWidth,
                height: imageHeight,
                borderRadius: 6,
                borderWidth: 0,
                borderColor: "#E5E5E5",
            },
            this.props.imageBorderStyle
        ];

        let showingImage = this.props.source;
        if (this.state.shouldShowErrorSource) {
            showingImage = this.props.errorSource;
            this.state.isShowingErrorSource = true;
        }

        return (
            <View
                style={selfStyle}
            >
                <Image
                    style={imageStyle}
                    source={showingImage}
                    defaultSource={this.props.defaultSource}
                    resizeMode={'stretch'}
                    onLoadStart={this.onLoadStart}
                    onLoadEnd={this.onLoadEnd}
                    onLoad={this.onLoadSuccess}
                    onError={this.onLoadError}
                />

                {stateComponent}

                <ActivityIndicator
                    style={{
                        position:'absolute',
                        width:imageWidth,
                        height:imageHeight,
                    }}
                    size="large"
                    color="#172991"
                    animating={showLoadingHUD}
                />
            </View>
        );
    }
}
