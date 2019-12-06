/**
 * CJActionSheetTableView.js
 *
 * @Description: 【单选】ActionSheet中不含①顶部标题与③底部取消部分的内容区域【单选】列表视图
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-11-17 22:56:47
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";

export default class CJActionSheetTableView extends Component {
    static propTypes = {
        itemModels: PropTypes.array,
        actionCellHeight: PropTypes.number,

        showSeparateLine: PropTypes.bool,   // 是否显示分隔线
        bottomLineColor: PropTypes.string,  // 分割线的颜色

        listMaxHeight: PropTypes.number,
        itemOnPress: PropTypes.func,
    };

    static defaultProps = {
        itemModels: [
            // {'mainTitle': '拍摄'},
        ],
        actionCellHeight: 50,
        showSeparateLine: true,
        bottomLineColor: '#eee',

        listMaxHeight: 100,
        itemOnPress: (item, index) => {},
    };

    render() {
        let actionCellHeight = this.props.actionCellHeight;
        let listHeight = this.props.itemModels.length * actionCellHeight;
        let listMaxHeight = this.props.listMaxHeight;
        let scrollEnabled = false;
        if (listHeight > listMaxHeight) {
            scrollEnabled = true;
            listHeight = listMaxHeight;
        }

        let bottomLineHeight = this.props.showSeparateLine ? 1 : 0;

        return (
            <FlatList style={{height: listHeight}}
                      scrollEnabled={scrollEnabled}
                      data={this.props.itemModels}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => {
                          return (
                              <CJActionSheetTableCell
                                  actionCellHeight={actionCellHeight}
                                  bottomLineHeight={bottomLineHeight}
                                  bottomLineColor={this.props.bottomLineColor}
                                  actionName={item.mainTitle}
                                  onPress={() => {
                                     this.props.itemOnPress(item, index)
                                  }}
                              />
                          )
                      }}
            />
        )
    }
}

export class CJActionSheetTableCell extends Component {
    static propTypes = {
        actionName: PropTypes.string.isRequired,
        actionCellHeight: PropTypes.number,     //cell高

        bottomLineHeight: PropTypes.number,     // 底部的分割线的高度(默认0)
        bottomLineColor: PropTypes.string,      // 分割线的颜色

        onPress: PropTypes.func,
    };

    static defaultProps = {
        actionName: '按钮标题',
        actionCellHeight: 50,

        bottomLineHeight: 0,
        bottomLineColor: '#eee',

        onPress: ()=>{},
    };

    render() {

        return (
            <TouchableOpacity
                style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: this.props.actionCellHeight,
                    borderBottomWidth: this.props.bottomLineHeight,
                    borderBottomColor: this.props.bottomLineColor,
                }, this.props.style]}
                onPress={this.props.onPress}
            >
                <Text style={styles.actionText}>
                    {this.props.actionName}
                </Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    actionText: {
        height: 44,
        fontSize: 17,
        textAlign: 'center',
        lineHeight:44,
        color: '#333333'
    }
});
