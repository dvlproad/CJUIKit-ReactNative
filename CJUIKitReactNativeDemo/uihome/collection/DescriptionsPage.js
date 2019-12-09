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
    LKDescriptionBasePage,
} from '../../lkcui/lkcui';

export default class DescriptionsPage extends LKDescriptionBasePage {
    static navigationOptions = ({ navigation }) => {
        return LKDemoNavigationFactory.backPageNavigationOptions({ navigation }, `图片集合视图`)
    };

    constructor(props) {
        super(props);

        this.state = {
            imageModels: [
                {
                    imageSource: LKDemoImages.localImageSource1,
                    imageIndex: 0,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    imageIndex: 1,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    imageIndex: 2,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    imageIndex: 3,
                },
                {
                    imageSource: LKDemoImages.networkImageSource1,
                    imageIndex: 4,
                },
            ],
        }
    }
}
