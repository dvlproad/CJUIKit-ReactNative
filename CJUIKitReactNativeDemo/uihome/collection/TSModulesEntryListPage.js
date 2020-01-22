/**
 * TSModulesEntryListPage.js
 *
 * @Description: TSModulesEntryListPage
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2020-01-13 14:10:58
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';

import {
    CJTSDefaultImages,
    CJTSNavigationFactory,
} from 'cjrn-demo-base';

import {
    CQModulesEntryList,
} from 'cjrn-theme-uikit';

export default class TSModulesEntryListPage extends Component {
    static navigationOptions = ({navigation}) => {
        return CJTSNavigationFactory.backPageNavigationOptions({navigation}, `模块功能入口列表`)
    };

    render() {
        return (
            <CQModulesEntryList
                navigation={this.props.navigation}
                moduleModels={ [
                    {
                        title: "通知发货",
                        imageSource: CJTSDefaultImages.localImageSource1,
                        nextPageName: "TSDescriptionListPage",
                    },
                    {
                        title: "采购单查询",
                        imageSource: CJTSDefaultImages.localImageSource2,
                        nextPageName: "TSDescriptionListPage",
                    },
                ]}
            />
        );
    }
}
