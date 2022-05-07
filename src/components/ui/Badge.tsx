import React from "react";
import * as badgeStyles from "../../styles/ui/badges.module.sass"

const Badge = ({children, marker}) => {
  if(!marker) return children;

  return <div className={badgeStyles.badge}>
    <div className={badgeStyles.badgeMarker}>
      {marker}
    </div>
    {children}
  </div>
}

export default Badge;
