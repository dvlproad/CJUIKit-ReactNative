// LKDemoChooseWithRightBasePage.js
import React, {Component} from 'react';
import LKDemoChooseBasePage from './LKDemoChooseBasePage';
import LKDemoNavigationFactory from '../Navigation/LKDemoNavigationFactory';
import LKDemoRoute from '../Navigation/LKDemoRoute';

export default class LKDemoChooseWithRightBasePage extends LKDemoChooseBasePage {
    static navigationOptions = ({navigation}) => {
        return LKDemoNavigationFactory.backPageWithRightButtonNavigationOptions({navigation}, `导航栏右键`, '操作', () => {
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
        LKDemoRoute.push(this.props.navigation, pageName, {});
    };


    navigationBarRightButtonPageName() {
        return null;
    }

}
