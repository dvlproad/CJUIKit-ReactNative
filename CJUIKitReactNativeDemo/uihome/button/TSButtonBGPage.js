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
    LKBlueBGButton,
    LKBlueBGBottomTextButton,
    LKToast,
} from '../../commonUIEmployee/commonUIEmployee';

export default class TSButtonBGPage extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor: "#f2f2f2", paddingHorizontal: 15}}>
                <View style={{backgroundColor: "#01ADFE", marginTop: 20}}>
                    <LKBlueBGButton normalTitle={'enable 的蓝色背景按钮'}
                                    disabled={false}
                                    onPress={()=>{
                                        LKToast.showMessage('点击按钮');
                                    }}
                    />
                    <LKBlueBGButton normalTitle={'disabled 的蓝色背景按钮'}
                                    disabled={true}
                    />
                </View>



                <View style={{backgroundColor: "#01ADFE4C", marginTop: 40}}>
                    <LKBlueBGBottomTextButton normalTitle={'底部 的蓝色背景按钮'}
                                              disabled={false}
                                              onPress={()=>{
                                                  LKToast.showMessage('点击按钮');
                                              }}
                    />
                </View>


            </ScrollView>
        );
    }
}
