import React, {useLayoutEffect, useRef} from "react";
import {css} from "@emotion/react";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import {controlsStyles, Elements, Root} from "./carouselStyles";

type CarouselProps = {
    elements: {
        image: IGatsbyImageData,
        alt: string
    }[]
};

export default function CarouselComponent(props: CarouselProps) {
    let currentElement = 0;
    const root = useRef<HTMLDivElement>(null)

    const update = () => {
        return root.current!.scrollLeft = root.current!.clientWidth * currentElement;
    }

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
                return <GatsbyImage draggable="false"
                                    objectFit="contain"
                                    css={css`
                                      min-width: 100%;
                                    `}
                                    image={value.image} alt={value.alt}/>
            })}
        </Elements>

        <ChevronLeftIcon onSelect={(event) => event.preventDefault()}
            onClick={goLeft}
                         className="icon"
                         css={css`
                           ${controlsStyles};
                           left: 0;
                         `}/>

        <ChevronRightIcon className="icon"
                          onClick={goRight}
                          css={css`
                            ${controlsStyles};
                            right: 0;
                          `}/>
    </Root>
}