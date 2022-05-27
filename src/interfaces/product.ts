export default interface Product {
    Popularity?: number;
    ProductID: string,
    Title: string,
    Description: string,

    Category: number,
    Price: number,

    ImageURI: string,
    Image?, // Gatsby Image type

    count?: number
}

export interface ProductPopularity {
    ProductID: String,
    popularity: number
}
