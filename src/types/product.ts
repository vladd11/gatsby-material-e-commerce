import {IGatsbyImageData} from "gatsby-plugin-image";

export default interface Product {
    Popularity?: number;
    ProductID: string,
    Title: string,
    Category: number,

    Price: number,
    ImageURI: string,

    DescriptionURI: string,

    ShortDescription?: string | null;
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
