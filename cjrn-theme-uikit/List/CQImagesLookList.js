
import React, {Component} from 'react';
import {  Alert, Dimensions } from 'react-native';
import PropTypes from "prop-types";
import {
    CJImageLookCollectionView
} from 'cjrn-base-uikit';


export default class CQImagesLookList extends Component {
    static propTypes = {
        imageModels: PropTypes.array,
        imageClickHandle: PropTypes.func,
    }

    static defaultProps = {
        imageModels: [],
        imageClickHandle: (index, imageModel)=>{ },
    }

    constructor(props) {
        super(props);
        this.state = {
            isImageAllLoaded: false,    //图片是否全部加载完成，如果没有，则不允许点击修改按钮来切换为编辑状态
        };
    }


    imageLoadedCountChange= (imageLoadedCount, isImageAllLoaded)=>{
        //Alert.alert("完成加载的图片个数为:" + imageLoadedCount);
        this.state.isImageAllLoaded = isImageAllLoaded;
    }


    render() {
        const screenWidth = Dimensions.get('window').width;
        const listWidth = screenWidth;

        return (
            <CJImageLookCollectionView
                // style={{paddingHorizontal: 40}}   //谨记：这边设置无效
                listWidth={listWidth}
                sectionInset={{top:15, left:15, bottom:15, right:15}}
                cellWidthFromPerRowMaxShowCount={4} // 水平方向上的列数 & 通过每行可显示的最多个数来设置每个cell的宽度
                // cellWidthFromFixedWidth={165}       // 通过cell的固定宽度来设置每个cell的宽度
                widthHeightRatio={165/165}
                minimumInteritemSpacing={15}
                minimumLineSpacing={10}
                dataModels={this.props.imageModels}
                clickButtonHandle={(index)=>{
                    let imageModel = this.props.imageModels[index];
                    this.props.imageClickHandle && this.props.imageClickHandle(index, imageModel)
                }}
                imageLoadedCountChange={this.imageLoadedCountChange}
            />
        );
    }
}
