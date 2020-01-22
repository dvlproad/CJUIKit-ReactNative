/**
 * CJMessageAlertView.js
 *
 * @Description: 弹窗AlertView
 *
 * @author      ciyouzen
 * @email       dvlproad@163.com
 * @date        2019-12-17 11:34:51
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
import PropTypes from "prop-types";

import { CJTheme }  from '../Theme/CJTheme';
import { CJAlertIKnowButton, CJAlertClosedCancelOKButtons }  from './components/CJAlertButtons';

let screenHeight = Dimensions.get('window').height;

// export var CJAlertMarginType = {
//     Title_Message_Buttons: 0,
//     Title_Buttons: 1,
//     Message_Buttons: 2,
// }

class CJBaseMessageAlertView extends Component {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,
    };


    static defaultProps = {
        title: null,
        message: null,
    };

    constructor(props) {
        super(props);
        this.state = { }
    }


    renderButtons() {
        return null;
    }



    render() {
        let allAlertMarginVertical = CJTheme.style.alertMarginVertical;

        let alertMarginVerticals = [];
        let titleVerticalIndex = 0;
        let messageVerticalIndex = 0;
        let buttonsVerticalIndex = 0;
        if (this.props.title) {
            if (this.props.message) {
                alertMarginVerticals = allAlertMarginVertical.title_message_buttons;
                titleVerticalIndex = 0;
                messageVerticalIndex = 1;
                buttonsVerticalIndex = 2;
            } else {
                alertMarginVerticals = allAlertMarginVertical.title_buttons;
                titleVerticalIndex = 0;
                messageVerticalIndex = -1;
                buttonsVerticalIndex = 1;
            }
        } else {
            if (this.props.message) {
                alertMarginVerticals = allAlertMarginVertical.message_buttons;
                titleVerticalIndex = -1;
                messageVerticalIndex = 0;
                buttonsVerticalIndex = 1;
            }
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

        let alertMessageComponent = null;
        if (this.props.message) {
            alertMessageComponent = (
                <View
                    showsVerticalScrollIndicator={false}
                    style={{
                        marginTop: alertMarginVerticals[messageVerticalIndex],
                        // maxHeight: screenHeight / 4,
                        // overflow: 'scroll',
                        backgroundColor: 'transparent',
                    }}
                >
                    <Text
                        style={[
                            {
                                textAlign: 'center',
                            },
                            CJTheme.style.alertMessageStyle,
                        ]}
                    >
                        {this.props.message}
                    </Text>
                </View>
            )
        }

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
                {alertMessageComponent}
                <View style={{ marginTop: marginTop, marginBottom: marginBottom}}>
                    {this.renderButtons()}
                </View>
            </View>
        )
    }
}

/**
 * '取消' + '确定' AlertView
 */
export class CJCancelOKMessageAlertView extends CJBaseMessageAlertView {
    static propTypes = {
        cancelTitle: PropTypes.string,
        cancelHandle: PropTypes.func,

        okTitle: PropTypes.string,
        okHandle: PropTypes.func,
    };


    static defaultProps = {
        title: null,
        message: null,

        cancelTitle: '取消',
        cancelHandle: () => { },

        okTitle: '确定',
        okHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }


    renderButtons() {
        return (
            <CJAlertClosedCancelOKButtons
                cancelTitle={this.props.cancelTitle}
                cancelHandle={this.props.cancelHandle}
                okTitle={this.props.okTitle}
                okHandle={this.props.okHandle}
            />
        )
    }
}

/**
 * '我知道了' AlertView
 */
export class CJIKnowMessageAlertView extends CJBaseMessageAlertView {
    static propTypes = {
        title: PropTypes.string,
        message: PropTypes.string,

        iKnowTitle: PropTypes.string,
        iKnowHandle: PropTypes.func,
    };


    static defaultProps = {
        title: null,
        message: null,

        iKnowTitle: '我知道了',
        iKnowHandle: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }


    renderButtons() {
        return (
            <CJAlertIKnowButton
                iKnowTitle={this.props.iKnowTitle}
                iKnowHandle={this.props.iKnowHandle}
            />
        )
    }
}
