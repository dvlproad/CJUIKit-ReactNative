// LKDemoRightActionBasePage.js
import React, {Component} from 'react';
import LKDemoNavigationFactory from '../Navigation/LKDemoNavigationFactory';

export default class LKDemoRightActionBasePage extends Component {
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
        
    }

}
