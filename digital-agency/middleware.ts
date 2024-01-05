import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de", "fr", "cs"], // A list of all locales that are supported
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(de|en|cs|fr)/:path*"],
};
