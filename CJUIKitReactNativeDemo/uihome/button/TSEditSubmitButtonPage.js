//TSEditSubmitButtonPage.js
import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {
    CQThemeNormalSelectedButton,
    CQToastUtil,
} from 'cjrn-theme-uikit';

export default class TSEditSubmitButtonPage extends Component {
    renderSeparator() {
        return <Separator/>;
    }

    render() {
        return (
            <ScrollView style={{backgroundColor: "#f2f2f2", paddingHorizontal: 15}}>
                <View style={{marginTop: 40}}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={[
                            {selected: true, disabled: false},
                            {selected: true, disabled: true},
                            {selected: false, disabled: false},
                            {selected: false, disabled: true},
                        ]}
                        renderItem={({item}) => <TestSubmitButton selected={item.selected}
                                                                  disabled={item.disabled}/>}
                        //ItemSeparatorComponent={this.renderSeparator} //写法1
                        ItemSeparatorComponent={() => (<Separator/>)} //写法2
                    />
                </View>
            </ScrollView>

        );
    }
}


class Separator extends Component {
    render() {
        return (
            <Text style={{justifyContent: "center"}}>  </Text>
        );
    }
}


class TestSubmitButton extends CQThemeNormalSelectedButton {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...this.state
    //     };
    // }

    render() {


        return (
            <CQThemeNormalSelectedButton
                style={{height: 46}}
                selected={this.props.selected}
                disabled={this.props.disabled}
                onPress={() => {
                    CQToastUtil.showMessage("你点击了提交按钮！");
                }}
                onSelectedPress={() => {
                    CQToastUtil.showMessage("你点击了编辑按钮！");
                }}
            />
        );
    }
}
