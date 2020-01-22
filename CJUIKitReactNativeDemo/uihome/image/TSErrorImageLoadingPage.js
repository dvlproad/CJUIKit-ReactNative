/**
 * TSErrorImageLoadingPage.js
 *
 * @Description: TSErrorImageLoadingPage
 *
 * @author      chaoqian.li
 * @date        2020/1/21 1:55 下午
 *
 * Copyright (c) dvlproad. All rights reserved.
 */

import React, { Component } from 'react'
import {ScrollView, Text} from 'react-native';

import {
    // Toast
    CQToastUtil,

    // Button
    CQThemeBGButton,

    // image 图片
    CQLoadingImage,

} from "cjrn-theme-uikit";
import {CJTSNavigationFactory} from "cjrn-demo-base";

export const Title_LoadingImagePage3 = 'TSErrorImageLoadingPage(加载到错误图片时候，界面会不会卡死)';
export default class TSErrorImageLoadingPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `测试加载错误图片，会不会卡死`)
    };

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    render() {
        let errorNetworkImage = {uri: 'http://xxx.jpg'};

        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <Text style={{marginTop:20}}>测试加载到错误图片时候，界面会不会卡死</Text>

                <Text style={{marginTop:20}}>LoadingImage(大图)</Text>
                <CQLoadingImage
                    style={{width: 200, height: 200, backgroundColor:'orange'}}
                    source={errorNetworkImage}
                    needLoadingAnimation={true}
                />
                <CQThemeBGButton
                    style={{paddingTop: 0}}
                    title={'测试图片source更新时候的加载动画(如果你点击按钮有响应，说明没卡死)'}
                    onPress={()=>{
                        CQToastUtil.showMessage('你点击到了按钮，说明没卡死');
                    }}
                />


                <CQLoadingImage
                    style={{width: 200, height: 200, backgroundColor:'orange', marginVertical: 20}}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563345638317&di=98e13924cafe05c31072b28b9b418e11&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-8%2F201281416145837523.jpg'}}
                    needLoadingAnimation={true}
                />

                <CQThemeBGButton
                    style={{paddingTop: 0}}
                    title={'刷新视图' + this.state.count}
                    onPress={()=>{
                        CQToastUtil.showMessage('正在刷新视图');
                        this.setState({
                            count: this.state.count+1,
                        })
                    }}
                />
            </ScrollView>


        )
    }
}
