import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/api", "/login", "/dashboard"],
        },
        sitemap: "https://mhdshameem.in/sitemap.xml",
    };
}
