import React from "react"
import * as listItemIconStyles from "../../styles/ui/list-item-icon.module.sass"

const ListItemIcon = ({children}) => {
  return <div className={listItemIconStyles.menuIcon}>
      {children}
  </div>
}

export default ListItemIcon