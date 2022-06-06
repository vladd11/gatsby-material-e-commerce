import React, {ReactNode} from "react";
import {css} from "@emotion/react";

interface TimeComponentProps {
    children: ReactNode
}

export function ToTime(props: TimeComponentProps) {
    return <span css={css`
      display: flex;
      justify-content: space-between;

      flex: 1;

      padding-left: 16px;
      padding-right: 16px;
      margin-top: 16px;
    `}>
                до
                <span css={css`
                  padding-left: 8px;
                  font-weight: bold;
                `}>
                    {props.children}
                </span>
            </span>
}

export function FromTime() {
    return <span css={css`
      padding-left: 16px;
      padding-right: 16px;
      margin-top: 16px;
    `}>
                с
            </span>
}
