/**
 * CQNavigationViewUtil.js(不要引用此类，即请将此类复制一遍在具体APP中自己实现一遍)
 *
 * @Description: 导航栏(含路由)
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-09 10:31:29
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, {Component} from 'react';
import { CJImageButton } from 'cjrn-base-uikit';
import CQRouteUtil from "./CQRouteUtil";
import {Button} from "react-native";

export default class CQNavigationBarUtil {
    /**
     * 创建放回RN包内上一页的导航栏
     *
     * @param navigation    导航栏
     * @param title         导航栏标题
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backPageNavigationOptions = ({ navigation }, title) => {
        let navigationOptions = {
            title: title,
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerLeft: (
                this.backPageButton({ navigation })
            ),
        };
        return navigationOptions;
    };


    /**
     * 创建放回RN包内上一页且有右键的导航栏
     *
     * @param navigation            导航栏
     * @param title                 导航栏标题
     * @param rightButtonText       导航栏右键的标题
     * @param rightButtonOnPress    导航栏右键的按钮事件
     * @returns {{title: *, headerLeft: *, headerStyle: {backgroundColor: string}}}
     */
    static backPageWithRightButtonNavigationOptions = ({ navigation }, title, rightButtonText, rightButtonOnPress) => {
        let navigationOptions = {
            title: title,
            headerStyle: {                                 //导航栏样式设置
                backgroundColor: '#ffffff',
            },
            headerLeft: (
                this.backPageButton({ navigation })
            ),
            headerRight: (
                <Button
                    title={rightButtonText}
                    onPress={rightButtonOnPress}
                />
            ),
        };
        return navigationOptions;
    };


    /**
     * 包内->包内：在包内返回到上一个的图片按钮--每个RN app 【除首页之外】都需要使用的组件
     *
     * @param navigation
     * @returns {*}
     */
    static backPageButton({ navigation }) {
        return (
            <CJImageButton source={require('./resources/nav_back.png')}
                               onPress={() => {
                                   CQRouteUtil.pop(navigation);
                               }}
            />
        )
    }
}
