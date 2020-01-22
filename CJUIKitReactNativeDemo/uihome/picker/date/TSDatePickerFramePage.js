/**
 * TSDatePickerFramePage.js
 *
 * @Description: 测试自定义datePicker位置
 *
 * @author      chaoqian.li
 * @date        2019-12-04 02:51:57
 */

import React, { Component } from 'react';
import {View, Text} from 'react-native';

import {
    CQToastUtil,
    CQTextButton,
    CQThemeBGButton,
    CQDatePicker,
    // CQDatePickerView,
} from 'cjrn-theme-uikit';


export default class TSDatePickerFramePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dealIndex: 0,
            dateString1: '2019-06-06',
            dateString2: '2000-02-29'
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*注意点：①DatePicker必须写在Button后，否则会出现Button重复点击问题；*/}
                {/*<CQThemeBGButton*/}
                {/*    style={{*/}
                {/*        width: 180,*/}
                {/*        backgroundColor:'red'*/}
                {/*    }}*/}
                {/*    normalTitle={this.state.dateString1}*/}
                {/*    onPress={()=>{*/}

                {/*    }}*/}
                {/*/>*/}
                <Text style={{flex:1}}>暂不支持</Text>

                {/*<CQDatePickerView*/}
                {/*    style={{width:300, height:300, backgroundColor: 'green'}}*/}
                {/*    shouldCreateItRightNow={true}*/}
                {/*/>*/}

            </View>
        )
    }
}
