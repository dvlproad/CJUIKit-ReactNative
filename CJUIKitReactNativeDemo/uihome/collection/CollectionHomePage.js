/**
 * @author ciyouzen
 * @email dvlproad@163.com
 * @create date 2019-11-09 10:30:47
 * @modify date 2019-11-09 10:30:47
 * @desc [集合视图主页]
 */
import React, { Component } from 'react';
import {
    CJTSDefaultImages,
    CJTSNavigationFactory,
} from 'cjrn-demo-base';
import { CJTSCollectionHomeBasePage, CJTSCollectionHomeWithRightBasePage } from "cjrn-demo-base";

export default class CollectionHomePage extends CJTSCollectionHomeBasePage {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `集合视图`)
    };

    constructor(props) {
        super(props);

        this.state = {
            moduleModels: [
                {
                    title: "图片组合(显示)",
                    imageSource: CJTSDefaultImages.localImageSource2,
                    nextPageName: "TSImagesLookListPage",
                },
                {
                    title: "图片组合(操作)",
                    imageSource: CJTSDefaultImages.localImageSource2,
                    nextPageName: "TSImagesChooseListPage",
                },
                {
                    title: "介绍视图列表",
                    imageSource: CJTSDefaultImages.localImageSource2,
                    nextPageName: "TSDescriptionListPage",
                },
                {
                    title: "模块功能入口列表",
                    imageSource: CJTSDefaultImages.localImageSource2,
                    nextPageName: "TSModulesEntryListPage",
                },
            ],
        }
    }
}

// collection
import TSImagesLookListPage from './TSImagesLookListPage';
import TSImagesChooseListPage from './TSImagesChooseListPage';
import TSDescriptionListPage from './TSDescriptionListPage';
import TSModulesEntryListPage from './TSModulesEntryListPage';
import TSCycleCollectionPage from '../helloworld/TSCycleCollectionPage';

// CollectionPages
export const CollectionRoutePage = 'CollectionHomePage';
export const CollectionChildPages = {
    TSImagesLookListPage: {
        screen: TSImagesLookListPage,
    },
    TSImagesChooseListPage: {
        screen: TSImagesChooseListPage,
    },
    TSDescriptionListPage: {
        screen: TSDescriptionListPage,
    },
    TSModulesEntryListPage: {
        screen: TSModulesEntryListPage,
    },
    TSCycleCollectionPage: {
        screen: TSCycleCollectionPage,
    },
};
