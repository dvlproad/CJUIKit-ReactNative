/**
 * TSVerticalMenuCollectionPage.js
 *
 * @Description: 测试竖直菜单的列表视图
 *
 * @author      chaoqian.li
 * @date        2019-12-31 15:33:55
 */
import React, {Component} from 'react';
import {Button, Dimensions, Text, View, Image, StyleSheet} from 'react-native';
import CJVerticalMenuCollectionView from './CJVerticalMenuCollectionView';

export default class TSTablePage extends Component {

    mScreenWidth = Dimensions.get('window').width;
    mScreenHeight = Dimensions.get('window').height;

    constructor(props) {
        super(props);
        this.state = {};

        this.leftWidth = 150;
        this.leftItemHeight = 50;
        this.data = [
            {
                title: '人气top',
                data: [
                    {
                        title: '圣诞姜饼人拿铁',
                        price: 14.9,
                    },
                    {
                        title: '每日坚果',
                        price: 10.9,
                    },
                ],
            },
            {
                title: '小鹿茶',
                data: [
                    {
                        title: '牛乳茶',
                        price: 14.9,
                    },
                    {
                        title: '大红袍',
                        price: 10.9,
                    },
                    {
                        title: '抹茶咖啡',
                        price: 10.9,
                    },
                ],
            },
            {
                title: '大师咖啡',
                data: [
                    {
                        title: '黑糖拿铁',
                        price: 14.9,
                    },
                    {
                        title: '陨石拿铁',
                        price: 10.9,
                    },
                    {
                        title: '香草拿铁',
                        price: 10.9,
                    },
                    {
                        title: '香草拿铁22',
                        price: 10.9,
                    },
                    {
                        title: '香草拿铁33',
                        price: 10.9,
                    },
                ],
            },
            {
                title: '纳瑞冰',
                data: [
                    {
                        title: '牛乳茶111',
                        price: 14.9,
                    },
                    {
                        title: '大红袍222',
                        price: 10.9,
                    },
                    {
                        title: '抹茶咖啡333',
                        price: 10.9,
                    },
                    {
                        title: '牛乳茶111',
                        price: 14.9,
                    },
                    {
                        title: '大红袍222',
                        price: 10.9,
                    },
                    {
                        title: '抹茶咖啡333',
                        price: 10.9,
                    },
                    {
                        title: '抹茶咖啡333',
                        price: 10.9,
                    },
                    {
                        title: '抹茶咖啡333',
                        price: 10.9,
                    },
                ],
            },
        ];
    }

    _renderCollectionView() {
        return <CJVerticalMenuCollectionView ref={ref => this.tableView = ref}
                                                 style={{width: this.mScreenWidth, height: 500}}
                                                 data={this.data}
                                                 leftWidth={this.leftWidth}
                                                 leftViewBackgroundColor={'#F5F5F5'}
                                                 rightViewBackgroundColor={'#F5F5F5'}
                                                 onLeftItem={(item, index, isSelect) => {
                                                     let selectView = isSelect === true ?
                                                         <View style={[styles.leftSelectView,{width: this.leftWidth-20,
                                                             height: this.leftItemHeight,}]}/> : null;
                                                     let selectColor = isSelect? 'black' : '#808080';
                                                     return <View style={{
                                                         width: this.leftWidth,
                                                         height: this.leftItemHeight,
                                                         justifyContent: 'center',
                                                     }}>
                                                         {selectView}
                                                         <Button title={item.title} onPress={() => {
                                                             this.tableView.onLeftItemPress(index);
                                                         }} color={selectColor}/>
                                                     </View>;
                                                 }}
                                                 onRightHeader={(section, width, index) => {
                                                     return (<View style={[styles.rightHeight,{width: width}]}>
                                                             <Text style={{marginLeft: 10}}>{section.title}</Text>
                                                         </View>
                                                     );
                                                 }}
                                                 onRightItem={(item, width, index) => {
                                                     return this._renderRightItem(item, width, index);
                                                 }}
                                                 onRightSectionSeparatorComponent={(item)=>{
                                                     if (item.trailingItem) return null;
                                                     return <View style={{height:10,backgroundColor:'#F5F5F5'}}/>
                                                 }}
        />
    };

    _renderRightItem(item, width, index) {
        return (
            <View style={{height: 70, backgroundColor: 'white'}}>
                <View style={{height: 69,justifyContent: 'center'}}>
                    <View style={styles.rightItem}>
                        <Image style={styles.thumbnail} />
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.year}>{item.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:width,marginLeft: 4,height:1,backgroundColor:'#F5F5F5'}}/>
            </View>
        );
    }

    render() {
        return (
            <View style={{
                width: this.mScreenWidth,
                height: this.mScreenHeight,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
            }}>
                {this._renderCollectionView()}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    leftSelectView: {
        borderRadius: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        position: 'absolute',
    },
    rightHeight: {
        height: 50,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        justifyContent: 'center',
    },
    rightItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    thumbnail: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 10,
    },
    year: {
        marginLeft: 10,
        color:'orange'
    },
});


