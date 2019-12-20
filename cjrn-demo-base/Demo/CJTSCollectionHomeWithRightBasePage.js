/**
 * CJTSCollectionHomeWithRightBasePage.js
 *
 * @Description: 用于测试各种选择的集合视图(带右键)
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-20 20:54:01
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import CJTSCollectionHomeBasePage from './CJTSCollectionHomeBasePage';
import CJTSNavigationFactory from '../Navigation/CJTSNavigationFactory';
import CJTSRoute from '../Navigation/CJTSRoute';

export default class CJTSCollectionHomeWithRightBasePage extends CJTSCollectionHomeBasePage {
    static navigationOptions = ({navigation}) => {
        return CJTSNavigationFactory.backPageWithRightButtonNavigationOptions({navigation}, `导航栏右键`, '操作', () => {
            // navigation.navigate('ImageActionCollectionPage', {});
            navigation.state.params.navigationBarRightButtonAction();
        })
    };

    componentWillMount() {
        this.props.navigation.setParams({
            navigationBarRightButtonAction: this.navigationBarRightButtonAction,
        })
    }


    navigationBarRightButtonAction = () => {
        let pageName = this.navigationBarRightButtonPageName();
        CJTSRoute.push(this.props.navigation, pageName, {});
    };


    navigationBarRightButtonPageName() {
        return null;
    }

}
