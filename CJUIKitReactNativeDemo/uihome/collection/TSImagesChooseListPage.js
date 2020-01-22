/**
 * TSImagesChooseListPage.js
 *
 * @Description: TSImagesChooseListPage
 *
 * @author      chaoqian.li
 * @date        2019/11/15 11:02 上午
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import { View } from 'react-native';
import {
    CJTSDefaultImages,
    CJTSNavigationFactory,
} from 'cjrn-demo-base';

import {
    CQImagesChooseList,
    CQImageUploadType,
    CQToastUtil,
    CQCenterText,
} from 'cjrn-theme-uikit';


export default class TSImagesChooseListPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageWithRightButtonNavigationOptions({ navigation }, `图片选择列表`, '测试状态切换', ()=>{
            // navigation.navigate('TSImagesChooseListPage', {});
            navigation.state.params.changeEditState();
        })
    };

    componentWillMount(){
        this.props.navigation.setParams({
            changeEditState:this.changeEditState,
        })
    }

    changeEditState= ()=>{
        let isEditing = !this.state.isEditing;
        this.setState({
            isEditing: isEditing,
        })
    }


    constructor(props) {
        super(props);

        this.state = {
            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
            isEditing: false,
            imageModels: [
                {
                    imageSource: CJTSDefaultImages.localImageSource1,
                    uploadType: CQImageUploadType.NotNeed,
                    uploadProgress: 0,
                    imageIndex: 0,
                },
                {
                    imageSource: CJTSDefaultImages.networkImageSource1,
                    uploadType: CQImageUploadType.Uploading,
                    uploadProgress: 20,
                    imageIndex: 1,
                },
                {
                    imageSource: CJTSDefaultImages.networkImageSource1,
                    uploadType: CQImageUploadType.Uploading,
                    uploadProgress: 60,
                    imageIndex: 2,
                },
                {
                    imageSource: CJTSDefaultImages.networkImageSource1,
                    uploadType: CQImageUploadType.Success,
                    uploadProgress: 100,
                    imageIndex: 3,
                },
                {
                    imageSource: CJTSDefaultImages.networkImageSource1,
                    uploadType: CQImageUploadType.Failure,
                    uploadProgress: 77,
                    imageIndex: 4,
                },
            ],
        }
    }



    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //CQToastUtil.showMessage("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }


    browseImageHandle=(index) => {
        CQToastUtil.showMessage("浏览图片" + index);
    }

    addImageHandle=(index) => {
        CQToastUtil.showMessage("添加图片" + index);
        let imageModel = {imageSource: CJTSDefaultImages.networkImageSource1};

        let imageModels = this.state.imageModels;
        imageModels.splice(index-1, 0, imageModel);
        this.setState({
            imageModels: imageModels
        })
    }


    render() {
        return (
            <View style={{ backgroundColor:"green"}}>
                <CQImagesChooseList
                    imageModels={this.state.imageModels}

                    imageLoadedCountChange={this.imageLoadedCountChange}

                    isEditing={this.state.isEditing}
                    browseImageHandle={this.browseImageHandle}
                    addImageHandle={this.addImageHandle}
                    deleteImageCompleteBlock={(imageModels)=>{
                        this.setState({
                            imageModels: imageModels
                        })
                    }}
                />
                <CQCenterText text={'我是用来测试的'} />
            </View>

        );
    }
}
