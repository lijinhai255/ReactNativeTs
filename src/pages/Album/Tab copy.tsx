import React from "react"
import { View, Text } from "react-native"
import { TabView } from "react-native-tab-view"
import Introduction from "./Introduction"
import List from "./LIst/index"
interface IRoute {
    key: string,
    title: string
}
class Tab extends React.Component {
    state = {
        index: 1,
        routes: [
            { key: 'introduction', title: '简介' },
            { key: 'albums', title: '节目' },
        ],
    };
    onIndexChange = (index: number) => {
        this.setState({
            index
        })
    }
    renderScene = ({ route }: { route: IRoute }) => {
        console.log(1212121,route.key==="albums")
        switch (route.key) {
            case "introduction":
                return <Introduction />
            case "albums":
                return <List />
        }
    }
    render() {
        return (
                <TabView
                navigationState={this.state}
                onIndexChange={this.onIndexChange}
                renderScene={this.renderScene}

            />
        )
    }
}

export default Tab