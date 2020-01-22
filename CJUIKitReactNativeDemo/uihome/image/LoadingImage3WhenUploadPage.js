//LoadingImage3WhenUploadPage.js

import React, { Component } from 'react'
import {View, Text, ScrollView} from 'react-native';

import {
    // Toast
    CQToastUtil,

    // Button
    CQThemeBGButton,
    CQThemeBorderButton,

    // image 图片
    CQLoadingImage,

} from "cjrn-theme-uikit";
import {CJTSNavigationFactory} from "cjrn-demo-base";

export const Title_LoadingImagePage2 = `LoadingImagePage2(看模拟上传图片时候的加载动画)`;
export default class LoadingImage3WhenUploadPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `测试本地图片上传成功后，图片组件的加载效果`)
    };

    constructor(props) {
        super(props);
        this.state = {
            hasUpload: false,
            isShowingLocalImage: false,
        };
    }

    render() {
        let isShowingLocalImage = this.state.isShowingLocalImage;

        let fogImage = null;
        if (isShowingLocalImage) {
            fogImage = require('./resources/fog.jpg');
        } else {
            fogImage = {uri: 'http://www.v3wall.com/wallpaper/1366_768/1703/1366_768_20170310105503345670.jpg'};    //
        }


        return (
            <ScrollView style={{backgroundColor:"#f5f5f5", paddingHorizontal: 15}}>
                <View style={{flex:1}}>
                    <Text style={{marginTop:20}}>模拟图片上传(处理上传结束后不会多余显示loading)</Text>
                    <CQLoadingImage
                        style={{width: 200, height: 200, backgroundColor:'purple'}}
                        source={fogImage}
                        needLoadingAnimation={true}
                    />

                    <CQThemeBGButton
                        style={{paddingTop: 0, marginTop: 50}}
                        title={!this.state.hasUpload?'上传本地图片':'已上传'}
                        disabled={this.state.hasUpload}
                        onPress={()=>{
                            this.setState({
                                hasUpload: !this.state.hasUpload,
                                isShowingLocalImage: !this.state.isShowingLocalImage,
                            })
                        }}
                    />
                </View>
            </ScrollView>


        )
    }
}
