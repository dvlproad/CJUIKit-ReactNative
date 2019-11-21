//UploadHomePage.js
import {
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class UploadHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "image",
                    data: [
                        { title: "UploadImagePage", page: "UploadImagePage" },
                    ]
                },
            ],
        }
    }
}


//UploadPages
import UploadImagePage from "../upload/UploadImagePage";

export const UploadRoutePage = 'UploadHomePage';
export const UploadPages = {
    UploadHomePage: {
        screen: UploadHomePage,
        navigationOptions: () => ({
            title: `UploadHomePage`,
        }),
    },

    UploadImagePage: {
        screen: UploadImagePage,
        navigationOptions: () => ({
            title: `UploadImagePage`,
        }),
    },
}
