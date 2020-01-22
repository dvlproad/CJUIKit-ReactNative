//TSActionLoadingImagePage.js
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
    CJTSDefaultImages,
    CJTSNavigationFactory,
} from 'cjrn-demo-base';

import {
    // theme
    CQTheme,

    // Toast
    CQToastUtil,

    // image 图片
    CQLoadingImage,
    CQImageUploadType,
    CQActionLoadingImage,

} from "cjrn-theme-uikit";

var carImageUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1562053677&di=9c7e86f3099929712b5f97b94bc153c5&src=http://01.minipic.eastday.com/20161109/20161109230347_7e6b8aeb814b27aad394cc65d42237d8_4.jpeg';

export default class TSActionLoadingImagePage extends Component {
    static navigationOptions = ({ navigation }) => {
        return CJTSNavigationFactory.backPageNavigationOptions({ navigation }, `用于图片列表上传的可增删的图片按钮`)
    };

    constructor(props) {
        super(props);
        this.state = {
            imageSource: CJTSDefaultImages.networkImageSource1,
            addIconCurIndex: -1,   //添加按钮的当前索引的值①等于-1代表没有添加显示；②大于imageMaxCount则不显示
        };
    }

    isAddIcon = (index)=> {
        if (index == this.state.addIconCurIndex) {
            return true;
        } else {
            return false;
        }
    }

    clickButtonHandle = (index)=> {
        if (index == this.state.addIconCurIndex) {
            this.addImageHandle(index);
        } else {
            this.browseImageHandle(index);
        }
    }

    browseImageHandle=(index) => {
        CQToastUtil.showMessage("浏览图片" + index);
    }


    addImageHandle=(index) => {
        let imageSource = CJTSDefaultImages.networkImageSource1;

        this.setState({
                addIconCurIndex: -1,
                imageSource: imageSource,
            }
        )
    }

    deleteImageHandle=(index) => {
        let addImage = require('./resources/pickImage_blue.png');
        this.setState({
                addIconCurIndex: 0,
                imageSource: addImage,
            }
        )
    }

    render() {
        return (
            <ScrollView
                style={{
                    flexDirection:'row',
                    backgroundColor:"white",
                    paddingHorizontal: 15
                }}
            >
                <CQActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'red', borderRadius:10,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 6,
                        borderWidth: 3,
                        borderColor: "cyan",
                    }}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562747201772&di=e5e02e2208aea4acdfd1fa92d4a10d42&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FI9-_x2ze5vz07q7YorAc1Q%3D%3D%2F151715012463950227.jpg'}}

                    isEditing={true}
                    uploadType={CQImageUploadType.Uploading}
                    uploadProgress={60}
                    clickButtonHandle={()=>{
                        CQToastUtil.showMessage('点击图片');
                    }}
                    deleteImageHandle={()=>{
                        CQToastUtil.showMessage('点击删除');
                    }}
                />

                <CQActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'green',
                        marginTop: 20,
                    }}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562747201772&di=e5e02e2208aea4acdfd1fa92d4a10d42&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FI9-_x2ze5vz07q7YorAc1Q%3D%3D%2F151715012463950227.jpg'}}

                    isEditing={true}
                    uploadType={CQImageUploadType.Uploading}
                    uploadProgress={60}
                    clickButtonHandle={()=>{
                        CQToastUtil.showMessage('点击图片');
                    }}
                    deleteImageHandle={()=>{
                        CQToastUtil.showMessage('点击删除');
                    }}
                />

                <CQActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'blue',
                        marginTop: 20,
                    }}
                    source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562747201772&di=e5e02e2208aea4acdfd1fa92d4a10d42&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FI9-_x2ze5vz07q7YorAc1Q%3D%3D%2F151715012463950227.jpg'}}

                    isEditing={true}
                    uploadType={CQImageUploadType.Uploading}
                    uploadProgress={60}
                    clickButtonHandle={()=>{
                        CQToastUtil.showMessage('点击图片');
                    }}
                    deleteImageHandle={()=>{
                        CQToastUtil.showMessage('点击删除');
                    }}
                />


                <CQActionLoadingImage
                    style={{
                        width: 164, height: 108, backgroundColor:'red',
                        marginTop: 20,
                    }}
                    source={this.state.imageSource}

                    isEditing={true}
                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}
                />


                <CQActionLoadingImage
                    style={{
                        width: 164, height: 108,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 4,
                        borderWidth: 0,
                        borderColor: "#E5E5E5",
                    }}
                    source={require('./resources/pickImage_blue.png')}

                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}

                    isEditing={false}
                    isAddIcon={this.isAddIcon(0)}
                />

                <CQActionLoadingImage
                    style={{
                        width: 100, height: 100, borderRadius:4,
                        marginTop: 20,
                    }}
                    imageBorderStyle={{
                        borderRadius: 4,
                        borderWidth: 0,
                        borderColor: "#E5E5E5",
                    }}
                    source={require('./resources/pickImage_blue.png')}

                    clickButtonHandle={this.clickButtonHandle}
                    deleteImageHandle={this.deleteImageHandle}

                    isEditing={false}
                    isAddIcon={this.isAddIcon(1)}
                />
            </ScrollView>
        );
    }
}
