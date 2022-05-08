import React from "react"
import * as listItemIconStyles from "../../styles/ui/list-item-icon.module.sass"

type ListItemIconProps = BaseProps

const ListItemIcon = (props: ListItemIconProps) => {
  return <div className={`${listItemIconStyles.menuIcon} ${props.className}`}>
      {props.children}
  </div>
}

export default ListItemIcon