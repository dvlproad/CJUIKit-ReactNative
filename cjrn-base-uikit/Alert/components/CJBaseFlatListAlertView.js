/**
 * CJBaseFlatListAlertView.js
 *
 * @Description: CJBaseFlatListAlertView
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-27 22:56:12
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
} from 'react-native';
import PropTypes from "prop-types";

import { CJTheme }  from '../../Theme/CJTheme';

/**
 * 内容为列表的弹窗基类
 */
export default class CJBaseFlatListAlertView extends Component {
    static propTypes = {
        title: PropTypes.string,
        keyValues: PropTypes.array,
        listMinimumLineSpacing: PropTypes.number,       // 竖直方向上box之间的间隔
    };


    static defaultProps = {
        title: null,
        keyValues: [],
        listMinimumLineSpacing: 10,
    };

    constructor(props) {
        super(props);
        this.state = { }
    }


    renderButtons() {
        return null;
    }

    renderCollectionCell(item, index, defaultCollectCellStyle) {
        return null;
    }


    // 获取当前box与下一个box之间的竖直间隔
    __getBoxVerticalInterval = (index, lastRowStartIndex, boxHorizontalInterval) => {
        if (index >= lastRowStartIndex) {
            return 0;
        }
        return boxHorizontalInterval;
    }

    render() {
        let allAlertMarginVertical = CJTheme.style.alertMarginVertical;

        let alertMarginVerticals = [];
        let titleVerticalIndex = 0;
        let messageVerticalIndex = 0;
        let buttonsVerticalIndex = 0;
        if (this.props.title) {
            alertMarginVerticals = allAlertMarginVertical.title_message_buttons;
            titleVerticalIndex = 0;
            messageVerticalIndex = 1;
            buttonsVerticalIndex = 2;
        } else {
            alertMarginVerticals = allAlertMarginVertical.message_buttons;
            titleVerticalIndex = -1;
            messageVerticalIndex = 0;
            buttonsVerticalIndex = 1;
        }


        let alertTitleComponent = null;
        if (this.props.title) {
            alertTitleComponent = (
                <Text
                    style={[
                        {
                            marginTop: alertMarginVerticals[titleVerticalIndex],
                            textAlign: 'center',
                        },
                        CJTheme.style.alertTitleStyle,
                    ]}
                >
                    {this.props.title}
                </Text>
            )
        }


        const boxVerticalInterval = this.props.listMinimumLineSpacing;
        let lastRowStartIndex = this.props.keyValues.length - 1; //最后一行的索引起点，index从0开始
        let alertFlatListComponent = (
            <FlatList
                style={{
                    backgroundColor: 'transparent',
                    marginHorizontal: 20,
                    marginTop: alertMarginVerticals[messageVerticalIndex],
                }}
                scrollEnabled={false}
                data={this.props.keyValues}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    let cellMarginRight = 0;
                    let cellMarginBottom = this.__getBoxVerticalInterval(index, lastRowStartIndex, boxVerticalInterval);
                    let defaultCollectCellStyle = {
                        marginRight: cellMarginRight,
                        marginBottom: cellMarginBottom,
                    };

                    return (
                        this.renderCollectionCell(item, index, defaultCollectCellStyle)
                    )
                }}
            />
        );


        let marginTop = alertMarginVerticals[buttonsVerticalIndex];
        let marginBottom = alertMarginVerticals[buttonsVerticalIndex+1]

        return (
            <View
                style={[
                    {flexDirection: 'column', justifyContent: 'center'},
                    CJTheme.style.alertStyle,
                    this.props.style
                ]}
            >
                {alertTitleComponent}
                {alertFlatListComponent}
                <View style={{ marginTop: marginTop, marginBottom: marginBottom}}>
                    {this.renderButtons()}
                </View>
            </View>
        )
    }
}
