import {IGatsbyImageData} from "gatsby-plugin-image";

export default interface Product {
    Popularity?: number;
    ProductID: string,
    Title: string,
    Description: string,
    Category: number,

    Price: number,

    ImageURI: string,
    Images?: Images[];
    Image?: IGatsbyImageData, // Gatsby ImageFile type

    count?: number
}

export type Images = {
    alt: string,
    image_uri: string,
}

export interface ProductPopularity {
    ProductID: String,
    popularity: number
}
