/**
 * Created by 范冬冬 on 2019/11/7
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * 工具栏
 */
export default class extends Component {

    static propTypes = {
        titles: PropTypes.array.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    state = {
        selectIndex: -1, // -1是未选中
        titles: [],
    };

    constructor(props) {
        super(props);
        this.setState((prevState, props) => {
            return {
                titles: props.titles,
            }
        });
    }

    render() {
        const titleViews = [];
        this.props.titles.forEach((title, index) => {
            const image = index == this.state.selectIndex ? require('./image/icon_toolbar_title_selected.png') : require('./image/icon_toolbar_title_normal.png');
            const color = index == this.state.selectIndex ? '#192B93' : '#333333';
            const titleView = (
                <TouchableOpacity style={styles.titleContainer} onPress={this._onTitlePress.bind(this, index)}>
                    <Text style={[styles.title, { color: color }]}>{title}</Text>
                    <Image source={image}/>
                </TouchableOpacity>
            );
            titleViews.push(titleView);
        });
        return (
            <View style={styles.container}>
                {titleViews}
            </View>
        );
    }

    _onTitlePress(index) {
        let selectIndex = index;
        if (this.state.selectIndex == index) {
            selectIndex = -1;
        }

        this.setState({
            selectIndex: selectIndex
        });

        this.props.onPress(selectIndex);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: 50,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'PingFangSC-Medium',
        fontSize: 13,
        marginRight: 3,
    },
});
