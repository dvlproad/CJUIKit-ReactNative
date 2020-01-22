
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
    CQSegmentedPageView
} from 'cjrn-theme-uikit'

export default class TSSegmentedPage extends Component {
    render() {
        return (
            <CQSegmentedPageView
                pageModels={[
                    {
                        title: '资产类货物进厂',
                        page: (<Text {...this.props}>资产类货物进厂</Text>)
                    },
                    {
                        title: '成品设备管理',
                        page: (<Text {...this.props}>成品设备管理</Text>)
                    }
                ]}
            />
        );
    }
}

