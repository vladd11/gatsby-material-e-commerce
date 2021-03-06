import React, {ReactNode, useEffect, useState} from "react";
import {css} from "@emotion/react";

import theme from "../../theme"
import {BaseProps} from "./BaseProps";

import NotificationType from "../../types/notification";
import Banner from "./banner/Banner";

type AppbarProps = BaseProps & {
    title: ReactNode
}

const Appbar = (props: AppbarProps) => {
    const [notification, setNotification] = useState<NotificationType>();

    useEffect(() => {
        document.addEventListener("notificationReceived", (evt: Event) => {
            // @ts-ignore
            setNotification(evt.detail)
        })
    }, [])

    return <>
        <div className={props.className} css={css`
          background: ${theme.palette.primary.main};
          color: #ffffff;

          box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

          display: flex;
          flex-direction: column;
          
          z-index: 2;
        `}>
            <div css={css`
              padding: 0 16px;

              height: 56px;

              display: flex;
              align-items: center;
            `}>
                {props.children}
                <h1 css={css`
                  font-weight: 500;
                  font-size: 1.25rem;
                  line-height: 1.6;
                `}>
                    {props.title}
                </h1>
            </div>
        </div>
        {(notification)
            ? <Banner className={props.className}
                      onHide={() => setNotification(undefined)}>
                {notification.text}
            </Banner>
            : undefined}
    </>
}

export default Appbar;
