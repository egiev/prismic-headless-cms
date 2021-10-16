import Prismic from "@prismicio/client";

export const ref = "YWqA0RIAALuk7-lg";
const apiEndpoint = "https://musicology.prismic.io/api/v2/";
const accessToken = ""; // This is where you would add your access token for a Private repository

export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  console.log(req, accessToken);
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};

  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

export const linkResolver = (doc) => {
  console.log(doc, "doc");
  if (doc.type === "homepage") {
    return `/homepage/${doc.uid}/`;
  }

  return `/doc/${doc.uid}`;
};
