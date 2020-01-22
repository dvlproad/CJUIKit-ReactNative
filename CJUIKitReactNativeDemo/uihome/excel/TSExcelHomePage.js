/**
 * TSExcelHomePage.js
 *
 * @Description: TSExcelHomePage
 *
 * @author      chaoqian.li
 * @date        2019-12-23 17:50:39
 */
import React, { Component } from 'react';
import {Dimensions, Text, View} from 'react-native';
import CJExcelView from "./CJExcelView";

var _topCount = 2;
var _leftCount = 2;
var _rowCount = 10;
var _columnCount = 20;

export default class TSExcelHomePage extends Component {

    mScreenWidth = Dimensions.get('window').width;
    mScreenHeight = Dimensions.get('window').height;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{ width:this.mScreenWidth,height:this.mScreenHeight, justifyContent: "center", alignItems: "center"}}>
                <CJExcelView ref={ref => this.excelView = ref}
                                 style={{width:this.mScreenWidth,height:300}}
                                 topRowCount={_topCount}
                                 leftColumnCount={_leftCount}
                                 centerColumnCount={_rowCount}
                                 onColumnWidth={
                                     (index) => {
                                         return this._onColumnItemWidth(index);
                                     }
                                 }
                                 onRowHeight={
                                     (index) => {
                                         return this._onRowItemHeight(index);
                                     }
                                 }
                                 renderItem={
                                     (item,section,index) => {
                                         let color;
                                         if (section < _leftCount) {
                                             if (index < _topCount) {
                                                 // 左上
                                                 color = 'pink';
                                             } else {
                                                 // 左下
                                                 color = 'blue';
                                             }
                                         } else {
                                             if (index < _topCount) {
                                                 // 右上
                                                 color = 'red';
                                             } else {
                                                 // 右下
                                                 color = 'yellow';
                                             }
                                         }
                                         let width = this._onColumnItemWidth(section);
                                         let height = this._onRowItemHeight(index);
                                         return <Text style={{fontSize:13,width:width,height:height,textAlign:'center',alignItems:'center',justifyContent:'center',textAlignVertical:'center',lineHeight:height,backgroundColor:color}}>
                                             {item.title}
                                         </Text>
                                     }
                                 }
                                 onTopDatas={
                                     (section) => {
                                         if (section < _leftCount) {
                                             let topModels = [];
                                             for (let j = 0; j < _topCount; j++) {
                                                 let topItem = new Map();
                                                 topItem.title = "LT" + section + "-" + j;
                                                 topModels.push(topItem);
                                             }
                                             return topModels;
                                         } else {
                                             let topModels = [];
                                             for (let j = 0; j < _topCount; j++) {
                                                 let topItem = new Map();
                                                 topItem.title = "MT" + section + "-" + j;
                                                 topModels.push(topItem);
                                             }
                                             return topModels;
                                         }
                                     }
                                 }
                                 onBottomDatas={
                                     (section) => {
                                         if (section < _leftCount) {
                                             let itemModels = [];
                                             for (let j = _topCount; j < _columnCount + _topCount; j++) {
                                                 let item = new Map();
                                                 item.title = "LM" + + section + "-" + j;
                                                 itemModels.push(item);
                                             }
                                             return itemModels;
                                         } else {
                                             let itemModels = [];
                                             for (let j = _topCount; j < _columnCount + _topCount; j++) {
                                                 let item = new Map();
                                                 item.title = "MT" + + section + "-" + j;
                                                 itemModels.push(item);
                                             }
                                             return itemModels;
                                         }
                                     }
                                 }
                />
            </View>
        );
    };

    _onColumnItemWidth(index) {
        if (index >= _leftCount) return 20 + index * 10;
        switch (index) {
            case 0:
                return 50;
            case 1:
                return 60;
            case 2:
                return 70;
            default :
                return 100;
        }
    };

    _onRowItemHeight(columnIndex) {
        switch (columnIndex) {
            case 0:
                return 20;
            case 1:
                return 30;
            default :
                return 10 + columnIndex * 5;
        }
    }
}
