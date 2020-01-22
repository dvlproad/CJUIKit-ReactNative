/**
 * TSCycleCollectionPage.js
 *
 * @Description: 测试循环滚动的集合视图
 *
 * @author      chaoqian.li
 * @date        2019-12-31 15:34:45
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
} from 'react-native';
import {
    CQNavigationBarUtil,
    CQCycleScrollView,
    CQToastUtil,
} from "cjrn-theme-uikit";

const { width } = Dimensions.get('window');

export default class TSCycleCollectionPage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CQNavigationBarUtil.backPageNavigationOptions({ navigation }, `轮播图`)
    };

    render() {
        return (
            <View>
                <View height={200}>
                    <Text style={{fontSize: 20}}>Images & autoPlay</Text>
                    <CQCycleScrollView
                        width={width}
                        height={180}
                        imgResizeMode={'cover'}
                        datas={[
                            "http://img.mp.itc.cn/upload/20160729/4d0efc4e8fbc4254ae741b87132dd104_th.jpg",
                            require('./img/2.jpg'),
                            require('./img/1.jpg')]}
                        loop={true}
                        dotColor={'blue'}
                        dotAlign={'center'}
                        autoPlay={true}
                        onItemClick={i => {
                            CQToastUtil.showMessage(`Item ${i}`)
                        }}
                    />
                </View>


                <View height={170}>
                    <Text style={{fontSize: 20}}>custom view:</Text>
                    <CQCycleScrollView
                        width={width}
                        height={150}
                        loop={true}
                        childRender={(item, position) => {
                            return (
                                <View style={{ width: width, height: 150, backgroundColor: item }} >
                                    <Text style={{ fontSize: 40, textAlign: "center", top: 50 }}>
                                        custom view {position}
                                    </Text>
                                </View>
                            )
                        }}
                        dotAlign={'left'} />
                </View>

            </View >
        );
    }
}
