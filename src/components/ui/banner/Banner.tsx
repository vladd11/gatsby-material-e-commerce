import React, {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import {css} from "@emotion/react";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import {ButtonWrapper, Root} from "./styles"

type BannerProps = {
    image?: string
    children: ReactNode,

    onHide: () => void,
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default function Banner(props: BannerProps) {
    const {children, image, onHide, ...rest} = props;

    return <>
        <Root {...rest}>
            <span css={css`
              padding-left: 16px;
            `}>
                {children}
            </span>

            <ButtonWrapper>
                <Button variant="text" onClick={onHide}>
                    Закрыть
                </Button>
            </ButtonWrapper>
        </Root>
        <Divider/>
    </>
}