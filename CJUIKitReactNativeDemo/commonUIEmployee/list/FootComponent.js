import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import {FootStyles} from "../../styles/FootStyles";
import {PropTypes} from "prop-types";

/**
 * @author yi.xiao
 * @date 2019-08-19
 * @description 加载更多Component
 */
export default class FootComponent extends React.Component {

    static propTypes = {
        length: PropTypes.number.isRequired,
        noMore: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <View style={FootStyles.bottomFoot}>
                {
                    this.props.length !== 0 ?
                        this.props.noMore ? (
                                <Text style={FootStyles.footText}>没有更多数据了</Text>) :
                            (<View style={FootStyles.activeLoad}>
                                <ActivityIndicator size="small" animating={true}/>
                                <Text style={[FootStyles.footText, {marginLeft: 10}]}>加载更多...</Text>
                            </View>) : null
                }
            </View>
        );
    }

}
