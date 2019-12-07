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
    LKDemoCollectionHomeComponent,
} from '../../commonUIDemo/commonUIDemo';

export default class CollectionHomePage extends LKDemoCollectionHomeComponent {
    static navigationOptions = ({ navigation }) => {
        return LKDemoNavigationFactory.backPageNavigationOptions({ navigation }, `集合视图`)
    };

    constructor(props) {
        super(props);

        this.state = {
            moduleModels: [
                {
                    title: "图片组合(显示)",
                    imageSource: LKDemoImages.localImageSource2,
                    nextPageName: "ImageLookCollectionPage",
                },
                {
                    title: "图片组合(操作1)",
                    imageSource: LKDemoImages.localImageSource2,
                    nextPageName: "ImageActionCollectionPage",
                },
                {
                    title: "图片组合(操作2)",
                    imageSource: LKDemoImages.localImageSource2,
                    nextPageName: "ImageActionContainPage",
                },
                {
                    title: "介绍视图",
                    imageSource: LKDemoImages.localImageSource2,
                    nextPageName: "DescriptionsPage",
                },
            ],
        }
    }
}

// collection
import ImageLookCollectionPage from './ImageLookCollectionPage';
import ImageActionCollectionPage from './ImageActionCollectionPage';
import ImageActionContainPage from './ImageActionContainPage';
import DescriptionsPage from './DescriptionsPage';

// CollectionPages
export const CollectionRoutePage = 'CollectionHomePage';
export const CollectionChildPages = {
    ImageLookCollectionPage: {
        screen: ImageLookCollectionPage,
        navigationOptions: () => ({
            title: `图片显示的组合视图`,
        }),
    },
    ImageActionCollectionPage: {
        screen: ImageActionCollectionPage,
        navigationOptions: () => ({
            title: `图片操作的组合视图1`,
        }),
    },
    ImageActionContainPage: {
        screen: ImageActionContainPage,
        navigationOptions: () => ({
            title: `图片操作的组合视图2`,
        }),
    },
    DescriptionsPage: {
        screen: DescriptionsPage,
        navigationOptions: () => ({
            title: `介绍的描述视图列表`,
        }),
    },
};
