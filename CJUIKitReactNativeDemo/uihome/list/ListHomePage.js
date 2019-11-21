//ListHomePage.js
import {
    LKDemoTableHomeComponent
} from "../../lkcui/lkcui";

export default class ListHomePage extends LKDemoTableHomeComponent {
    constructor(props) {
        super(props);

        this.state = {
            sectionDataModels: [
                { key: "List",
                    data: [
                        { title: "FlatListEasyPage", page: "FlatListEasyPage" },
                        { title: "SectionListEasyPage", page: "SectionListEasyPage" },
                    ]
                }
            ],
        }
    }
}


// list
import FlatListEasyPage from './FlatListEasyPage';
import SectionListEasyPage from './SectionListEasyPage';


// ListPages
export const ListRoutePage = 'ListHomePage';
export const ListPages = {
    ListHomePage: {
        screen: ListHomePage,
        navigationOptions: () => ({
            title: `ListHomePage`,
        }),
    },

    FlatListEasyPage: {
        screen: FlatListEasyPage,
        navigationOptions: () => ({
            title: `列表的简单使用`,
        }),
    },
    SectionListEasyPage: {
        screen: SectionListEasyPage,
        navigationOptions: () => ({
            title: `分区列表的简单使用`,
        }),
    },
};
