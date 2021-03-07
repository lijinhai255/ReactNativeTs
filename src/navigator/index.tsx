import React from "react"
import {
  Platform,
  StatusBar,
  StyleSheet,
  Animated
} from "react-native"
import {
  NavigationContainer, RouteProp,

} from "@react-navigation/native"
import {
  StackNavigationProp,
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack"
import BottonTabes from "./BottonTabes"
import Detail from "@/pages/Detaile"
import Category from "@/pages/Category/index"
import Album from "@/pages/Album/index"
import Icon from '@/assets/iconfont';
export type RootStackParamList = {
  BottonTabes: {
    srceen?: string
  },
  Category: undefined,
  Album: {
    item: {
      id: string,
      title: string,
      image: string
    },
    opacity?: Animated.Value
  },
}
export type RootStackNavigation = StackNavigationProp<RootStackParamList>
let Stack = createStackNavigator<RootStackParamList>()
/**
 * {
 *   Navigator,
 * Screen
 * }
*/
function getAlbumOptionsFn({ route }: {
  route: RouteProp<RootStackParamList, "Album">
}) {
  console.log(route.params.opacity, "route.params.opacity")
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: route.params.opacity
    },
    headerBackground: () => {
      return <Animated.View style={[style.headerBackground, { opacity: route.params.opacity }]} />
    }
  }
}
const style = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: "#fff",
    opacity: 0,
  }

})
function RootStackScreen() {
  return <Stack.Navigator
  headerMode="float"
  screenOptions={{
    headerTitleAlign: 'center',
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    ...Platform.select({
      android: {
        headerStatusBarHeight: StatusBar.currentHeight,
      },
    }),
    headerBackTitleVisible: false,
    headerTintColor: '#333',
    headerStyle: {
      ...Platform.select({
        android: {
          elevation: 0,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      }),
    },
    }}>
    <Stack.Screen
      name="BottonTabes"
      component={BottonTabes}
      options={{
        headerTitle: "首页",
        headerTransparent:true
      }}
    />
    <Stack.Screen
      name="Category"
      component={Category}
      options={{
        headerTitle: "分类",
        // headerStatusBarHeight: 30
      }}
    />
    <Stack.Screen
      name="Album"
      component={Album}
      options={getAlbumOptionsFn}
    />

  </Stack.Navigator>

}
export type ModalStackParamList = {
  Root: undefined,
  Detail: {
    id:string
  },

}
const ModalStack = createStackNavigator<ModalStackParamList>()
export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>
function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{ headerTitleAlign: "center" ,
      gestureEnabled:true,
      ...TransitionPresets.ModalSlideFromBottomIOS,
      headerBackTitleVisible:false,

    }}


    >
      <ModalStack.Screen name="Root"
        component={RootStackScreen}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen 
      name="Detail" 
      component={Detail}
      options={{
        // headerTintColor:"#fff",
        headerTitle:"",
        cardStyle: {backgroundColor: '#807c66'},
        headerBackImage: ({tintColor}) => (
          <Icon
            name="icon-down"
            size={30}
            color={tintColor}
            style={styles.headerBackImage}
          />
        ),
      }}
      
       />
    </ModalStack.Navigator>
  )
}
class Navigators extends React.Component {
  render() {
    return (
      <NavigationContainer>
        {ModalStackScreen()}
      </NavigationContainer >

    );

  }


}
const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});
export default Navigators;