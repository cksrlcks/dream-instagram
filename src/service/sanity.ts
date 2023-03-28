import { createClient } from "next-sanity";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATA_SET,
    apiVersion: "2022-03-25",
    useCdn: false,
    token: process.env.SANITY_TOKEN,
});
