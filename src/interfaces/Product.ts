export default interface Product {
    ProductID: string,
    Title: string,
    Description: string,

    Category: number,
    Price: number,

    ImageURI: string,
    Image?, // Gatsby Image type

    count?: number
}