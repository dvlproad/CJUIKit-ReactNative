/**
 * TSRefreshHomePage.js
 *
 * @Description: TSRefreshHomePage
 *
 * @author      chaoqian.li
 * @date        2019-12-23 17:24:37
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PTRScrollList from "../../commonUIEmployee/list/PTRScrollList";

export default class TSRefreshHomePage extends Component {


    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            enableHeaderRefresh: true,
            enableFooterInfinite: true,
            dataList:[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
        };
    }

    _loadMore = () => {
        setTimeout(()=>{
             this.ptrScrollList.ptr_footerRefershFinished(true)
        },2000);
    };

    _refresh = () => {
        setTimeout(()=> {
        this.ptrScrollList.ptr_headerRefreshFinished()
        },2000);
    };

    _renderItem = ({item,index}) => {
        return (<View style={{flexDirection:'row',alignItems:'center',flex:1,backgroundColor:'yellow'}}>
            <Text>{index}</Text>
        </View>)
    }

    render() {
        return (
            <PTRScrollList isTopOffset={true}
                           scrollComponentStyle={{backgroundColor: "#f5f5f5"}}
                           contentContainerStyle={{backgroundColor: "#f5f5f5"}}
                           data={this.state.dataList}
                           onHeaderRefreshing={this._refresh}
                           onFooterRefreshing={this._loadMore}
                           // getItemLayout={(data, index) => (
                           //     {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                           // )}
                           // emptyComponent={this._renderCreateDiscountEmptyComponent}
                           // ItemSeparatorComponent={this._renderDivider}
                           scrollComponent={"FlatList"}
                           keyExtractor={(item) => (item * Math.random()).toString()}
                           showsVerticalScrollIndicator={false}
                           enableFooterInfinite={this.state.enableFooterInfinite}
                           enableHeaderRefresh={this.state.enableHeaderRefresh}
                           ref={ref => this.ptrScrollList = ref}
                           renderItem={this._renderItem}
            />
        );
    }
}
