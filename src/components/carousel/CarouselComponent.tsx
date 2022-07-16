import React, {useLayoutEffect, useRef} from "react";
import {css} from "@emotion/react";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import {Elements, Root} from "./carouselStyles";

type CarouselProps = {
    elements: {
        image: IGatsbyImageData,
        alt: string
    }[]
};

export default function CarouselComponent(props: CarouselProps) {
    let currentElement = 0;
    const root = useRef<HTMLDivElement>(null)

    const update = () => root.current!.scrollLeft = root.current!.clientWidth * currentElement;

    function goRight() {
        currentElement = (currentElement >= props.elements.length - 1) ? 0 : currentElement + 1
        update();
    }

    function goLeft() {
        currentElement = (currentElement === 0) ? props.elements.length - 1 : currentElement - 1;
        update();
    }

    useLayoutEffect(() => {
        window.addEventListener("resize", () => update())
    }, [root.current]);

    return <Root>
        <Elements ref={root}>
            {props.elements.map(value => {
                return <GatsbyImage css={css`
                  min-width: 100%;
                `} image={value.image} alt={value.alt}/>
            })}
        </Elements>

        <ChevronLeftIcon onClick={goLeft}
                         className="icon"
                         css={css`
                           position: absolute;
                           top: 0;
                           left: 0;

                           display: none;

                           height: 100%;
                           width: 72px;

                           color: white;

                           transition: opacity 300ms, background 300ms;

                           &:hover {
                             background: rgba(185, 185, 185, 0.37);
                           }
                         `}/>

        <ChevronRightIcon className="icon"
                          onClick={goRight}
                          css={css`
                            position: absolute;
                            top: 0;
                            right: 0;

                            display: none;

                            height: 100%;
                            width: 72px;

                            color: white;

                            transition: opacity 300ms, background 300ms;

                            &:hover {
                              background: rgba(185, 185, 185, 0.37);
                            }
                          `}/>
    </Root>
}