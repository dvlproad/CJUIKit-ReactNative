//ModalHomePage.js
import {
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class ModalHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "Modal",
                    data: [
                        { title: "EasyModalPage", page: "EasyModalPage" },
                    ]
                },
                { key: "Loading",
                    data: [
                        { title: "ActivityIndicatorPage", page: "ActivityIndicatorPage" },
                        { title: "HUDHomePage", page: "HUDHomePage" },
                    ]
                },
                { key: "ActionSheet",
                    data: [
                        { title: "ActionSheetFactoryPage", page: "ActionSheetFactoryPage" },
                        { title: "ActionSheetPage", page: "ActionSheetPage" },
                        { title: "PhotoCameraSheetPage", page: "PhotoCameraSheetPage" },
                    ]
                },
            ],
        }
    }
}


//ModalPages
import EasyModalPage from './modal/EasyModalPage';

import ActivityIndicatorPage from "./hud/ActivityIndicatorPage";
import HUDHomePage from "./hud/HUDHomePage";

import PhotoCameraSheetPage from "./actionSheet/PhotoCameraSheetPage";
import ActionSheetFactoryPage from "./actionSheet/ActionSheetFactoryPage";

export const ModalRoutePage = 'ModalHomePage';
export const ModalPages = {
    ModalHomePage: {
        screen: ModalHomePage,
        navigationOptions: () => ({
            title: `ModalHomePage`,
        }),
    },

    //modal
    EasyModalPage: {
        screen: EasyModalPage,
        navigationOptions: () => ({
            title: `EasyModalPage`,
        }),
    },

    //hud
    ActivityIndicatorPage: {
        screen: ActivityIndicatorPage,
        navigationOptions: () => ({
            title: `ActivityIndicatorPage`,
        }),
    },
    HUDHomePage: {
        screen: HUDHomePage,
        navigationOptions: () => ({
            title: `HUDHomePage`,
        }),
    },

    //actionSheet
    ActionSheetFactoryPage: {
        screen: ActionSheetFactoryPage,
        navigationOptions: () => ({
            title: `ActionSheetFactoryPage`,
        }),
    },
    PhotoCameraSheetPage: {
        screen: PhotoCameraSheetPage,
        navigationOptions: () => ({
            title: `PhotoCameraSheetPage`,
        }),
    },

};

