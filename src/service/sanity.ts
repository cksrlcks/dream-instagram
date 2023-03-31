import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const clientConfig = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATA_SET,
    apiVersion: "2022-03-25",
    useCdn: false,
    token: process.env.SANITY_TOKEN,
};

export const client = createClient(clientConfig);

export const builder = createImageUrlBuilder(client);
