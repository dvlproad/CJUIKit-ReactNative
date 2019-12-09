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
} from 'cjrn-demo-base';

import {
    LKImageLookHomeComponent,
    LKImageUploadType,
} from '../../lkcui/lkcui';

export default class ImageLookCollectionPage extends LKImageLookHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKDemoNavigationFactory.backPageNavigationOptions({ navigation }, `图片集合视图`)
    };

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
