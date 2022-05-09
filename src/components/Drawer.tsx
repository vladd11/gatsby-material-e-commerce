import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {css} from "@emotion/react";

type DrawerProps = BaseProps & {
    isDrawerOpened?,
    onClose?,
    shouldNotExpand?
}

const Drawer = (props: DrawerProps) => {
    return (
        <div
            css={css`
              display: none;
              position: fixed;
              top: 0;
              left: 0;

              background: #fff;
              border-right: rgba(0, 0, 0, 0.12) solid 1px;

              z-index: 1;

              height: 100%;
              overflow-y: auto;
            `}
            className={props.className}
            style={(props.isDrawerOpened || !props.shouldNotExpand) ? {display: "block"} : null}>
            <div css={css`
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              height: 100%;
              max-width: 330px;
            `}>
                {(props.shouldNotExpand) ?
                    <button onClick={props.onClose} css={css`
                      display: flex;
                      align-items: center;
                      justify-content: end;

                      min-height: 55px;

                      padding: 0 16px 0 0;

                      cursor: pointer;

                      border: none;
                      border-bottom: rgba(0, 0, 0, 0.12) solid 1px;
                    `}>
                        <ChevronLeftIcon/>
                    </button>
                    : null}

                {props.children}
            </div>
        </div>
    )
}

export default Drawer;