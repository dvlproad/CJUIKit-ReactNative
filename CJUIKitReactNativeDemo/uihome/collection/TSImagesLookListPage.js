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

import {
    CQImagesLookList,
    CQToastUtil,
} from 'cjrn-theme-uikit';

export default class TSImagesLookListPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `图片展示列表`)
    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <CQImagesLookList
                imageModels={[
                    {
                        imageSource: CJTSDefaultImages.localImageSource1,
                    },
                    {
                        imageSource: CJTSDefaultImages.localImageSource2,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                    },
                    {
                        imageSource: CJTSDefaultImages.networkImageSource1,
                    },
                ]}
                imageClickHandle={(index, imageModel)=>{
                    CQToastUtil.showMessage("您正在点击图片:" + index);
                }}
            />
        )
    }
}
