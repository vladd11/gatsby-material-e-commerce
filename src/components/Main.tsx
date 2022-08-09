import React, {ReactNode, useEffect, useState} from 'react'
import {css} from "@emotion/react";
import {IGatsbyImageData} from "gatsby-plugin-image";
import IsLargeScreen from '../isMobile'

import Menu from "./Menu";
import CartMenuProduct from "./cart/CartMenuProduct";
import Appbar from "./ui/Appbar";
import IconButton from "./ui/IconButton";
import Badge from "./ui/Badge";
import MenuIcon from "@mui/icons-material/Menu";

import queries from "../queries";

import Product from "../types/product";

import {getCachedUser} from "../api/utils";

const menuWidth = 330;

export type MainProps = {
    info: Queries.SiteMetadata,

    getImage: (imageUri: string) => IGatsbyImageData,

    cartProducts: Array<Product>,
    setCartProducts: (value: any) => void,

    children: ReactNode
}

export default function Main(props: MainProps) {
    const isMobile = IsLargeScreen();
    const [isDrawerOpened, setDrawerOpened] = useState(!isMobile)

    useEffect(() => {
        setDrawerOpened(!isMobile)
    }, [isMobile])

    function renderCartProducts() {
        return props.cartProducts?.map((cartProduct, index) => {
            return <CartMenuProduct
                getImage={props.getImage}
                product={cartProduct}
                onDelete={() => {
                    props.setCartProducts(props.cartProducts.filter((value, arrIndex) => {
                        return index !== arrIndex;
                    }));
                }}/>
        })
    }

    return (<>
        <Appbar css={css`
          padding-left: ${menuWidth + 16}px;

          ${queries.notLarge} {
            padding-left: 0
          }
        `} title={props.info.title}>
            {(isMobile) ?
                <IconButton
                    onClick={() => {
                        setDrawerOpened(true)
                    }}>
                    <Badge marker={props.cartProducts?.length}>
                        <MenuIcon/>
                    </Badge>
                </IconButton> : null}
        </Appbar>

        <Menu
            info={props.info}

            isDrawerOpened={isDrawerOpened}
            onClose={() => {
                setDrawerOpened(false)
            }}
            isCartEmpty={!(props.cartProducts?.length)}

            orderLinkState={{cartProducts: props.cartProducts}}
            shouldNotExpand={isMobile}

            user={getCachedUser()}>

            {renderCartProducts()}
        </Menu>

        <div css={css`
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;

          ${queries.large} {
            margin-left: ${menuWidth - 5}px
          }
        `}>
            {props.children}
        </div>

    </>)
}
