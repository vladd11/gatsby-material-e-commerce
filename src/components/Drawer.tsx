import React from "react";
import {css, Global} from "@emotion/react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import {BaseProps} from "./ui/BaseProps";

type DrawerProps = BaseProps & {
    isDrawerOpened?: boolean,
    shouldNotExpand?: boolean,
    onClose?: () => void
}

const Drawer = (props: DrawerProps) => {
    return (
        <>
            <Global styles={(props.isDrawerOpened && props.shouldNotExpand) ? css`
              body {
                overflow-y: clip;
              }
            ` : null}/>
            <div
                css={css`
                  display: ${(props.isDrawerOpened) ? "block" : "none"};
                  position: fixed;
                  top: 0;
                  left: 0;

                  background: #fff;
                  border-right: rgba(0, 0, 0, 0.12) solid 1px;

                  z-index: 1;

                  height: 100%;
                  overflow-y: auto;
                `}
                className={props.className}>
                <div css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;

                  height: 100%;
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
        </>
    )
}

export default Drawer;