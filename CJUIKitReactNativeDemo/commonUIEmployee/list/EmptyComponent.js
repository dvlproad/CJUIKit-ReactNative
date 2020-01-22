import React from "react";
import {View, Text, Image} from "react-native";
import {PropTypes} from "prop-types";

/**
 * @author yi.xiao
 * @date 2019-08-16
 * @description 空数据页面
 */
export default class EmptyComponent extends React.Component {

    static propTypes = {
        noDataText: PropTypes.string,
        appendComponent: PropTypes.func,
        style:PropTypes.object,
    };

    _renderAppendComponent = () => {
        if (this.props.appendComponent) {
            return this.props.appendComponent();
        } else return null;
    };

    render() {
        const data = this.props.noDataText ? this.props.noDataText : "抱歉，搜索无结果";
        return (
            <View style={[{
                flex: 1,
                flexDirection:'column',
                marginTop: 100,
                justifyContent: "center",
                alignItems: "center"
            },this.props.style]}>
                <Image source={require("./nonData_image.png")}/>
                <Text style={{color: "#cccccc", textAlign: "center", marginTop: 10}}>{data}</Text>
                {this._renderAppendComponent()}
            </View>
        )
    }

}
