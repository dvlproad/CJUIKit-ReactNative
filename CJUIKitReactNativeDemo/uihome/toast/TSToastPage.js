//TSToastPage.js
import React, { Component } from 'react';
import { CJTSTableHomeBasePage, CJTSTableHomeWithRightBasePage } from "cjrn-demo-base";
import {
    CQToastUtil,
} from "cjrn-theme-uikit";


export default class TSToastPage extends CJTSTableHomeBasePage {


    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "ToastUtil(信息展示)",
                    data: [
                        {
                            title: "我知道了！",
                            clickButtonHandle: (moduleModel) => {
                                CQToastUtil.showMessage('我知道了');
                            },
                        },
                    ]
                },
            ],
        }
    }
}

