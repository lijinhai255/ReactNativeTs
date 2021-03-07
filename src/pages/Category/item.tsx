import { ICategory } from "@/models/category"
import { viewportWidth } from "@/utils/index";
import React from "react"
import { View, Text, StyleSheet } from "react-native"
interface IProps {
    selected: boolean,
    isEdit: boolean,
    data: ICategory,
    disabled?:boolean
}
export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const childrenHeight = 48;
export const margin = 5;
class Item extends React.Component<IProps>{
    render() {
        const { data, selected, isEdit,disabled } = this.props
        return <View
            key={data.id}
            style={{
                width: itemWidth,
                height: 48,
            }}
        >
            <View style={[styles.item,disabled&&styles.disabled]}>
                <Text>{data.name}</Text>
                {
                    isEdit && !disabled&&(
                        <View style={styles.icon}>
                            <Text style={styles.iconText}>
                                {
                                    selected ? "+" : "-"
                                }
                            </Text>
                        </View>
                    )
                }
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: "#fff",
        margin: margin,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },
    icon: {
        position: "absolute",
        top: -5,
        right: -5,
        height: 16,
        width: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f86442",
        textAlign: "center",
        color: "#fff",
        borderRadius: 50,

    },
    iconText: {
        lineHeight: 15,
        color: '#fff',
      },
    disabled:{
        backgroundColor:"#e2e2e2"
    }
})

export default Item