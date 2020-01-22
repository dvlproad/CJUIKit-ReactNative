/**
 * TSBottomButtonsPage.js
 *
 * @Description: 设置屏幕底部的按钮
 *
 * @author      chaoqian.li
 * @date        2019-12-02 13:35:31
 */
import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {
    CQThemeBGButton,
    CQBottomOneButton,
    CQBottomTwoButtons,
    CQToastUtil,
} from 'cjrn-theme-uikit';
import {CQBottomThreeButtons} from "cjrn-theme-uikit/Button/CQBottomTextButton";

export default class TSBottomButtonsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {bottomType: 1};
    }

    _renderBottomButtons() {
        if (this.state.bottomType == 1) {
            return (
                <CQBottomOneButton title={'提交'}
                                   disabled={false}
                                   onPress={()=>{
                                       CQToastUtil.showMessage('点击提交');
                                   }}
                />
            )
        } else if (this.state.bottomType == 2) {
            return (
                <CQBottomTwoButtons
                    buttonFlex1={105}
                    title1={'暂存'}
                    onPress1={()=>{
                        CQToastUtil.showMessage('点击暂存');
                    }}
                    buttonFlex2={224}
                    title2={'保存'}
                    onPress2={()=>{
                        CQToastUtil.showMessage('点击保存');
                    }}
                />
            )
        } else if (this.state.bottomType == 3) {
            return (
                <CQBottomThreeButtons
                    buttonFlex1={105}
                    title1={'暂存'}
                    onPress1={()=>{
                        CQToastUtil.showMessage('点击暂存');
                    }}
                    buttonFlex2={105}
                    title2={'保存'}
                    onPress2={()=>{
                        CQToastUtil.showMessage('点击保存');
                    }}
                    buttonFlex3={105}
                    title3={'提交'}
                    onPress3={()=>{
                        CQToastUtil.showMessage('点击提交');
                    }}
                />
            )
        }
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: "#f2f2f2"}}>
                <ScrollView style={{backgroundColor: "transparent"}}>
                    <View style={{backgroundColor: "#FFFFFF", paddingHorizontal: 15, paddingVertical: 15, marginTop: 60, height: 400}}>
                        <CQThemeBGButton
                            title={'切换底部显示的按钮个数'}
                            disabled={false}
                            onPress={()=>{
                                let bottomType = (this.state.bottomType++) % 3 + 1;
                                CQToastUtil.showMessage('底部显示的按钮个数:' + bottomType);
                                this.setState({
                                    bottomType: bottomType,
                                });

                            }}
                        />
                    </View>
                </ScrollView>

                {this._renderBottomButtons()}


            </View>
        );
    }
}
