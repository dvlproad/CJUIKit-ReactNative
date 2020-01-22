
import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TSHelloWorld from './uihome/helloworld/TSHelloWorld';
import Page1 from './uihome/helloworld/TSHelloWorld';
import Page2 from './uihome/helloworld/TSHelloWorld';
import Page3 from './uihome/helloworld/TSHelloWorld';
import Page4 from './uihome/helloworld/TSHelloWorld';
import TSActionSheetPage from "./uihome/actionsheet/TSActionSheetPage";
import TSCycleCollectionPage from './uihome/helloworld/TSCycleCollectionPage';
import TSVerticalMenuCollectionPage from './uihome/helloworld/TSVerticalMenuCollectionPage';
import TSExcelHomePage from './uihome/excel/TSExcelHomePage';
import TSRefreshHomePage from './uihome/refresh/TSRefreshHomePage';
import TSSegmentedPage from './uihome/helloworld/TSSegmentedPage';
import PickerDateHomePage, { PickerDateChildPages } from './uihome/picker/date/PickerDateHomePage';
import TSPickerAllHomePage, { PickerChildHomePages } from './uihome/picker/TSPickerAllHomePage';
import TSAreaPickerShowPage from './uihome/picker/area/TSAreaPickerShowPage';
import TSMenuPage from './uihome/helloworld/TSMenuPage';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text>Home Screen</Text>
                <Button
                    title='goto details'
                    onPress={()=>this.props.navigation.navigate('Details')}
                />
                <Button
                    title='goto helloWorld'
                    onPress={()=>this.props.navigation.navigate('TSHelloWorld')}
                />
                <Button
                    title='goto Page1'
                    onPress={()=>this.props.navigation.navigate('Page1')}
                />
                <Button
                    title='goto Page2'
                    onPress={()=>this.props.navigation.navigate('Page2')}
                />
                <Button
                    title='goto Page3'
                    onPress={()=>this.props.navigation.navigate('Page3')}
                />
                <Button
                    title='goto Page4'
                    onPress={()=>this.props.navigation.navigate('Page4')}
                />
                <Button
                    title='goto TSActionSheetPage'
                    onPress={()=>this.props.navigation.navigate('TSActionSheetPage')}
                />
                <Button
                    title='goto TSCycleCollectionPage'
                    onPress={()=>this.props.navigation.navigate('TSCycleCollectionPage')}
                />
                <Button
                    title='goto TSVerticalMenuCollectionPage'
                    onPress={()=>this.props.navigation.navigate('TSVerticalMenuCollectionPage')}
				/>
				<Button
                    title='goto TSExcelHomePage'
                    onPress={()=>this.props.navigation.navigate('TSExcelHomePage')}
				/>
				<Button
                    title='goto TSRefreshHomePage'
                    onPress={()=>this.props.navigation.navigate('TSRefreshHomePage')}
                />
                <Button
                    title='goto TSSegmentedPage'
                    onPress={()=>this.props.navigation.navigate('TSSegmentedPage')}
                />
                <Button
                    title='goto TSPickerAllHomePage'
                    onPress={()=>this.props.navigation.navigate('TSPickerAllHomePage')}
                />
                <Button
                    title='goto TSAreaPickerShowPage'
                    onPress={()=>this.props.navigation.navigate('TSAreaPickerShowPage')}
                />
                <Button
                    title='goto TSMenuPage'
                    onPress={()=>this.props.navigation.navigate('TSMenuPage')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title='goto home'
                    onPress={()=>this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
        TSHelloWorld: TSHelloWorld,
        Page1: Page1,
        Page2: Page2,
        Page3: Page3,
        Page4: Page4,
        TSActionSheetPage: TSActionSheetPage,
        TSCycleCollectionPage: TSCycleCollectionPage,
        TSVerticalMenuCollectionPage: TSVerticalMenuCollectionPage,
        TSExcelHomePage: TSExcelHomePage,
        TSRefreshHomePage: TSRefreshHomePage,
        TSSegmentedPage: TSSegmentedPage,
        TSPickerAllHomePage: TSPickerAllHomePage,
        ...PickerChildHomePages,
        TSAreaPickerShowPage: TSAreaPickerShowPage,
        TSMenuPage: TSMenuPage,
    },
    {
        initialRouteName: 'Home',
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
