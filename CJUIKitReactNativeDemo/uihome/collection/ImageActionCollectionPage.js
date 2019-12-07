/**
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [集合视图主页]
 */
import React, { Component } from 'react';

import {
    LKDemoImages,
    LKDemoNavigationFactory,
} from '../../commonUIDemo/commonUIDemo';

import {
    LKImageActionHomeComponent,
    LKImageUploadType,
} from '../../lkcui/lkcui';

export default class ImageActionCollectionPage extends LKImageActionHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKDemoNavigationFactory.backPageWithRightButtonNavigationOptions({ navigation }, `图片操作的集合视图`, '测试状态切换', ()=>{
            // navigation.navigate('ImageActionCollectionPage', {});
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
            imageModels: [
                {
                    imageSource: LKDemoImages.localImageSource1,
                    uploadType: LKImageUploadType.NotNeed,
                    uploadProgress: 0,
                    imageIndex: 0,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    uploadType: LKImageUploadType.Uploading,
                    uploadProgress: 20,
                    imageIndex: 1,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    uploadType: LKImageUploadType.Uploading,
                    uploadProgress: 60,
                    imageIndex: 2,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    uploadType: LKImageUploadType.Success,
                    uploadProgress: 100,
                    imageIndex: 3,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    uploadType: LKImageUploadType.Failure,
                    uploadProgress: 77,
                    imageIndex: 4,
                },
            ],
        }
    }
}
