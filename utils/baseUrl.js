const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "map-locations-sigma.vercel.app";

export default baseUrl;
