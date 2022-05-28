import React from "react"
import {animationContext} from "./SpeedDial";
import {css} from "@emotion/react";

type SpeedDialProps = BaseProps & {
    tooltipText?,
    onClick?,
    disabled?: boolean
}

const speedDialShadow = "rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0";

export default function SpeedDialButton(props: SpeedDialProps) {
    const context = React.useContext(animationContext)

    return <button css={css`
      display: inline-flex;

      transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s ease 0s;

      justify-content: center;
      align-items: center;

      outline: none;
      border: none;

      background: ${(props.disabled) ? "#D8D8D8" : "#ffffff"};

      width: 40px;
      height: 40px;
      margin: 8px;

      border-radius: 50%;
      box-shadow: ${speedDialShadow};

      color: rgba(0, 0, 0, 0.6);

      cursor: pointer;

      &:hover {
        background: #D8D8D8
      }
    `}
                   className={props.className}
                   style={{transform: (context) ? "scale(0)" : "scale(1)"}}
                   onClick={(event) => {
                       if (!props.disabled) props.onClick(event);
                   }}>
        <span css={css`
          font-size: 0.6875rem;

          background: rgba(97, 97, 97, 0.92);
          color: #fff;

          border-radius: 4px;

          padding: 4px 8px;
          position: absolute;
          right: 64px;
        `}>
            {props.tooltipText}
        </span>
        {props.children}
    </button>
}