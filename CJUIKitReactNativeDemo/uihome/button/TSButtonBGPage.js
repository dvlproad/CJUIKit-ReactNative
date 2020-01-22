/**
 * TSButtonBGPage.js
 *
 * @Description: 设置按钮背景的示例
 *
 * @author      chaoqian.li
 * @date        2019-12-02 13:35:31
 */
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {
    CQThemeBGButton,
    CQThemeBorderButton,
    CQToastUtil,
} from 'cjrn-theme-uikit';

export default class TSButtonBGPage extends Component {
    render() {
        return (
            <View style={{flex:1, backgroundColor: "#f2f2f2"}}>
                <ScrollView style={{backgroundColor: "transparent"}}>
                    <View style={{backgroundColor: "#FFFFFF", paddingHorizontal: 15, paddingVertical: 15, marginTop: 60, height: 400}}>
                        <CQThemeBGButton
                            title={'enable 的蓝色背景按钮'}
                            disabled={false}
                            onPress={()=>{
                                CQToastUtil.showMessage('点击按钮');
                            }}
                        />
                        <CQThemeBGButton
                            style={{marginTop: 50}}
                            title={'disabled 的蓝色背景按钮'}
                            disabled={true}
                        />
                        <CQThemeBorderButton
                            style={{marginTop: 50}}
                            title={'enable 的蓝色背景按钮'}
                            disabled={false}
                            onPress={()=>{
                                CQToastUtil.showMessage('点击按钮');
                            }}
                        />
                        <CQThemeBorderButton
                            style={{marginTop: 50}}
                            title={'disabled 的蓝色背景按钮'}
                            disabled={true}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }
}
