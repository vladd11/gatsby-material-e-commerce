import React, {ReactNode, useEffect} from 'react'

import IsMobile from '../isMobile'

import Menu from "./Menu";
import CartMenuProduct from "./cart/CartMenuProduct";
import Appbar from "./ui/Appbar";
import IconButton from "./ui/IconButton";
import Badge from "./ui/Badge";

import MenuIcon from "@mui/icons-material/Menu";

import {css} from "@emotion/react";

import queries from "../queries";

import Product from "../interfaces/product";
import {SiteInfo} from "../interfaces/data";

import {getCachedUser} from "../api/utils";

const menuWidth = 330;

interface MainProps {
    info: SiteInfo,

    cartProducts: Array<Product>,
    setCartProducts: (value: any) => void,

    children: ReactNode
}

export default function Main(props: MainProps) {
    const isMobile = IsMobile();
    const [isDrawerOpened, setDrawerOpened] = React.useState(!isMobile)

    useEffect(() => {
        setDrawerOpened(!isMobile)
    }, [isMobile])

    function renderCartProducts() {
        return props.cartProducts?.map((cartProduct, index) => {
            return <CartMenuProduct product={cartProduct}
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
            margin-left: ${menuWidth}px
          }
        `}>
            {props.children}
        </div>

    </>)
}
