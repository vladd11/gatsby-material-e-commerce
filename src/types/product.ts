export default interface Product {
    Popularity?: number;
    ProductID: string,
    Title: string,
    Category: number,
    Price: number,

    ImageURI: string,
    DescriptionURI: string,

    Images?: Images[];
    count?: number
}

export type Images = {
    alt: string,
    image_uri: string,
}
