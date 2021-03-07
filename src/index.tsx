import React from "react"
import Home from "@/pages/Home/index"
import Navigators from '@/navigator/index';
import { Provider } from "react-redux"
import store from "@/config/dva"
import { StatusBar } from "react-native"
export default class extends React.Component {
    render() {
        return (
            <Provider store={store}>
                  <StatusBar
                    backgroundColor="transparent"
                    barStyle="dark-content"
                    translucent
                />
                <Navigators />
              
            </Provider>
        )
    }
}