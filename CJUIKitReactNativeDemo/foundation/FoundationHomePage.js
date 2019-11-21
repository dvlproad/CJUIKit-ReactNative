//FoundationHomePage.js
import {
    LKDemoTableHomeComponent
} from "../lkcui/lkcui";

export default class FoundationHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "Date",
                    data: [
                        { title: "DateHomePage", page: "DateHomePage" },
                    ]
                },
            ],
        }
    }
}



//FoundationPages
import {FoundationDatePages} from "./date/DateHomePage";

export const FoundationRoutePage = 'FoundationHomePage';
export const FoundationPages = {
    FoundationHomePage: {
        screen: FoundationHomePage,
        navigationOptions: () => ({
            title: `Foundation首页`,
        }),
    },

    ...FoundationDatePages,
};
