import {IGatsbyImageData} from "gatsby-plugin-image";

export default interface Product {
    Popularity?: number;
    ProductID: string,
    Title: string,
    Description: string,

    Category: number,
    Price: number,

    ImageURI: string,
    Image?: IGatsbyImageData, // Gatsby Image type

    count?: number
}

export interface ProductPopularity {
    ProductID: String,
    popularity: number
}
