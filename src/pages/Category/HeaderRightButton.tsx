import { RootState } from "@/models/index"
import { types } from "@babel/core"
import React from "react"
import {HeaderButtons,Item} from "react-navigation-header-buttons"
import { connect, ConnectedProps } from "react-redux"

const mapStateToProps = ({category}:RootState)=>{
    return {
        isEdit:category?.isEdit
    }

}
const connector = connect(mapStateToProps)
interface IProps extends ModelState {
    onSubmit:()=>void
}
type ModelState = ConnectedProps<typeof connector>
class HeaderRightButton extends React.Component<IProps> {
    render(){
        const {onSubmit,isEdit} = this.props
        return (
            <HeaderButtons>
                    <Item title={isEdit?'完成':"编辑"} onPress={()=>onSubmit()} />
            </HeaderButtons>
        )
    }
}

export default connector(HeaderRightButton)