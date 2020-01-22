/**
 * CQImagesChooseList.js
 *
 * @Description: 图片上传列表
 *
 * @author      chaoqian.li
 * @date        2019-11-14 15:07:19
 *
 * Copyright (c) dvlproad. All rights reserved.
 */
/*  使用示例：
                <CQImagesChooseList
                    imageModels={[
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.NotNeed,
                            uploadProgress: 0,
                            imageIndex: 0,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Uploading,
                            uploadProgress: 20,
                            imageIndex: 1,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Uploading,
                            uploadProgress: 60,
                            imageIndex: 2,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Success,
                            uploadProgress: 100,
                            imageIndex: 3,
                        },
                        {
                            imageSource: {uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460118221,780234760&fm=26&gp=0.jpg'},
                            uploadType: ImageUploadType.Failure,
                            uploadProgress: 77,
                            imageIndex: 4,
                        },
                    ]}
                    imageMaxCount={5}

                    imageLoadedCountChange={(imageLoadedCount, isImageAllLoaded)=>{
                        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
                        this.state.isImageAllLoaded = isImageAllLoaded;
                    }}

                    isEditing={this.state.isEditing}
                    browseImageHandle={(index) => {
                        Alert.alert("浏览图片" + index);
                    }}
                    addImageHandle={(index) => {
                        Alert.alert("添加图片" + index);
                    }}
                    deleteImageCompleteBlock={(imageModels)=>{
                        this.setState({
                            imageModels: imageModels
                        })
                    }}
                />
 */
import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import {
    CJImageActionCollectionView
} from 'cjrn-base-uikit';
import PropTypes from "prop-types";


export default class CQImagesChooseList extends Component {
    static propTypes = {
        scrollEnabled: PropTypes.bool,              // 是否可以滚动

        imageModels: PropTypes.array,
        imageMaxCount: PropTypes.number,        //最大显示的图片个数(当达到指定图片最大量后，添加图片按钮不在显示)
        imageLoadedCountChange: PropTypes.func, //完成加载的图片个数发生变化的回调

        isEditing: PropTypes.bool,

        browseImageHandle: PropTypes.func,
        addImageCompleteBlock: PropTypes.func,
        deleteImageCompleteBlock: PropTypes.func,
    };

    static defaultProps = {
        scrollEnabled: false,

        imageModels: [],
        imageMaxCount: 10000,
        imageLoadedCountChange: (imageLoadedCount, isImageAllLoaded)=>{},

        isEditing: false,

        browseImageHandle: (buttonIndex)=>{},
        addImageCompleteBlock: (imageModels)=>{},
        deleteImageCompleteBlock: (imageModels)=>{},
    };


    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <CJImageActionCollectionView
                style={[{backgroundColor:'#FFFFFF'}, this.props.style]}   //谨记：这边设置无效
                scrollEnabled={this.props.scrollEnabled}
                listWidth={listWidth}
                sectionInset={{top:5, left:15, bottom:15, right:15}}
                // cellWidthFromPerRowMaxShowCount={4} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                cellWidthFromFixedWidth={80}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={70/70}
                minimumInteritemSpacing={0}
                minimumLineSpacing={0}
                forceBoxHorizontalIntervalEqualMinimumInteritemSpacing={true}
                dataModels={this.props.imageModels}
                imageMaxCount={this.props.imageMaxCount}

                imageLoadedCountChange={this.props.imageLoadedCountChange}
                addImageSource={require('./resources/addImage_common.png')}

                isEditing={this.props.isEditing}
                browseImageHandle={this.props.browseImageHandle}
                addImageHandle={this.props.addImageHandle}
                deleteImageHandle={(index) => {
                    // Alert.alert("删除图片" + index);
                    let imageModels = this.props.imageModels;
                    imageModels.splice(index,1);

                    this.props.deleteImageCompleteBlock && this.props.deleteImageCompleteBlock(imageModels);
                }}
                deleteButtonWidth={24}
                imageTopRightForDeleteButtonCenterOffset={2}
            />
        );
    }
}
