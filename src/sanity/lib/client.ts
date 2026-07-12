import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityIsConfigured } from "../env";

export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export { sanityIsConfigured };
