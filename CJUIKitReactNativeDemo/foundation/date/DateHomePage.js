//DateHomePage.js
import {
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class DateHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "date",
                    data: [
                        { title: "DateFormatterPage", page: "DateFormatterPage" },
                    ]
                },
            ],
        }
    }
}

//ImagePages

import DateFormatterPage from "./DateFormatterPage";
import DateElementPage from "./DateElementPage";

export const FoundationDatePages = {
    DateHomePage: {
        screen: DateHomePage,
        navigationOptions: () => ({
            title: `DateHomePage`,
        }),
    },
    DateFormatterPage: {
        screen: DateFormatterPage,
        navigationOptions: () => ({
            title: `DateFormatter`,
        }),
    },
    DateElementPage: {
        screen: DateElementPage,
        navigationOptions: () => ({
            title: `DateElementPage`,
        }),
    },
}
