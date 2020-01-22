/**
 * Created by 范冬冬 on 2019/11/7
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { CJOverlayView, CJToolbarView } from 'cjrn-base-uikit';

/**
 *
 */
export default class TSMenuPage extends Component {

    state = {
        index: -1,
    };

    render() {
        let overlayView = null;
        if (this.state.index == 0) {
            overlayView = (
                <CJOverlayView>
                    <View>
                        <Text>jaskldfjk</Text>
                    </View>
                </CJOverlayView>
            );
        } else if (this.state.index == 1) {
            overlayView = (
                <CJOverlayView>
                    <View>
                        <Text>jaskldfjk</Text>
                        <Text>jaskldfjk</Text>
                        <Text>jaskldfjk</Text>
                        <Text>jaskldfjk</Text>
                    </View>
                </CJOverlayView>
            );
        }
    
        return (
            <View style={styles.container}>
                <CJToolbarView
                    titles={['预计到货日期', '收货单位']}
                    onPress={this._onToolbarPress.bind(this)}
                />
                {overlayView}
                <Text>菜单页</Text>
            </View>
        );
    }

    _onToolbarPress(index) {
        this.setState({
            index,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
});
