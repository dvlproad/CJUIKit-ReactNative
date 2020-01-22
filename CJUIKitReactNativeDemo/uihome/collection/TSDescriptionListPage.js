/**
 * TSDescriptionListPage.js
 *
 * @Description: TSDescriptionListPage
 *
 * @author      chaoqian.li
 * @date        2019/11/15 11:13 上午
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';

import {
    CJTSDefaultImages,
    CJTSNavigationFactory,
} from 'cjrn-demo-base';

import {
    CQDescriptionList,
} from 'cjrn-theme-uikit';

export default class TSDescriptionListPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `介绍列表`)
    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <CQDescriptionList
                imageModels={[
                    {
                        imageSource: CJTSDefaultImages.localImageSource1,
                        imageIndex: 0,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                        imageIndex: 1,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                        imageIndex: 2,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                        imageIndex: 3,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                        imageIndex: 4,
                    },
                ]}
            />
        )
    }
}
