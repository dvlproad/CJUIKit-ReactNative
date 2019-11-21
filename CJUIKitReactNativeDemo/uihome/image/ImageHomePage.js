//ImageHomePage.js
import {
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class ImageHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "image",
                    data: [
                        { title: "HelloImagePage", page: "HelloImagePage" },
                        { title: "LoadingImage1LoadingShowPage1", page: "LoadingImage1LoadingShowPage1" },
                        { title: "LoadingImage3WhenUploadPage", page: "LoadingImage3WhenUploadPage" },
                        { title: "LoadingImage2ErrorPage", page: "LoadingImage2ErrorPage" },
                        { title: "ActionLoadingImagePage", page: "ActionLoadingImagePage" },
                    ]
                },
                { key: "images",
                    data: [
                        { title: "ImagesChooseListExamplePage", page: "ImagesChooseListExamplePage" },
                        { title: "ImagesChooseListPage", page: "ImagesChooseListPage" },
                    ]
                },
            ],
        }
    }
}

export const Title_ImageHomePage = `ImageHomePage(图片首页)`;


//ImagePages
import HelloImagePage from "./HelloImagePage";
import LoadingImage1LoadingShowPage1, {Title_LoadingImagePage1} from "./LoadingImage1LoadingShowPage1";
import LoadingImage3WhenUploadPage, {Title_LoadingImagePage2} from "./LoadingImage3WhenUploadPage";
import ActionLoadingImagePage from './ActionLoadingImagePage';
import ImagesChooseListPage from "./ImagesChooseListPage";
import ImagesChooseListExamplePage from "./ImagesChooseListExamplePage";
import LoadingImage2ErrorPage, {Title_LoadingImagePage3} from "./LoadingImage2ErrorPage";


export const ImageRoutePage = 'ImageHomePage';
export const ImagePages = {
    ImageHomePage: {
        screen: ImageHomePage,
        navigationOptions: () => ({
            title: Title_ImageHomePage,
        }),
    },

    HelloImagePage: {
        screen: HelloImagePage,
        navigationOptions: () => ({
            title: `Image的基本使用`,
        }),
    },

    LoadingImage1LoadingShowPage1: {
        screen: LoadingImage1LoadingShowPage1,
        navigationOptions: () => ({
            title: Title_LoadingImagePage1,
        }),
    },
    LoadingImage3WhenUploadPage: {
        screen: LoadingImage3WhenUploadPage,
        navigationOptions: () => ({
            title: Title_LoadingImagePage2,
        }),
    },
    LoadingImage2ErrorPage: {
        screen: LoadingImage2ErrorPage,
        navigationOptions: () => ({
            title: Title_LoadingImagePage3,
        }),
    },
    ActionLoadingImagePage: {
        screen: ActionLoadingImagePage,
        navigationOptions: () => ({
            title: `单个图片选择`,
        }),
    },

    ImagesChooseListExamplePage: {
        screen: ImagesChooseListExamplePage,
        navigationOptions: () => ({
            title: `ImagesChooseListExamplePage`,
        }),
    },
    ImagesChooseListPage: {
        screen: ImagesChooseListPage,
        navigationOptions: () => ({
            title: `ImagesChooseListPage`,
        }),
    },
}
