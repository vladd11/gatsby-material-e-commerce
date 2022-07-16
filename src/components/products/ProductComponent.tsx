import React from "react";
import Slider from "@mui/material/Slider";

import type ProductType from "../../interfaces/product"

type ProductProps = {
    product: ProductType
}

export default function ProductComponent(props: ProductProps) {
    return <Slider>

    </Slider>
}