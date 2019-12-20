/**
 * CJTSRightActionBasePage.js
 *
 * @Description: CJTSRightActionBasePage
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-20 21:03:47
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import CJTSNavigationFactory from '../Navigation/CJTSNavigationFactory';

export default class CJTSRightActionBasePage extends Component {
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

    }

}
