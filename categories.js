import Pizza from "./icons/pizza.svg"
import Shawarma from "./icons/shawarma.svg"
import Star from "./icons/star.svg"
import Coffee from "./icons/coffee.svg"
import Lemonade from "./icons/lemonade.svg"

import React from "react"

const categories = [
    {
        "id": 0,
        icon: <Star/>,
        "name": "Популярное"
    },
    {
        "id": 1,
        "icon": <Pizza/>,
        "name": "Пицца"
    },
    {
        "id": 2,
        icon: <Shawarma/>,
        "name": "Шаурма"
    },
    {
        "id": 4,
        icon: <Lemonade/>,
        "name": "Лимонады"
    },
    {
        "id": 3,
        icon: <Coffee/>,
        "name": "Кофе"
    }
]

export default categories;
