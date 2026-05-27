import axios from "axios";
import MinimalTheme from "../components/themes/MinimalTheme";
import CyberpunkTheme from "../components/themes/CyberpunkTheme";
import GlassTheme from "../components/themes/GlassTheme";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === "undefined"
    ? "http://localhost:5000"
    : `${window.location.protocol}//${window.location.hostname}:5000`);

async function getPortfolio(slug: string) {
    try {
        const res = await axios.get(
            `${apiBaseUrl}/portfolio/${slug}`
        );

        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default async function PortfolioPage({
    params,
}: {
    params: { slug: string };
}) {

    const portfolio = await getPortfolio(params.slug);

    if (!portfolio) {
        return (
            <div className="p-10 text-2xl">
                Portfolio not found
            </div>
        );
    }

    if (portfolio.theme === "cyberpunk") {
        return <CyberpunkTheme portfolio={portfolio} />;
    }

    if (portfolio.theme === "glass") {
        return <GlassTheme portfolio={portfolio} />;
    }

    return <MinimalTheme portfolio={portfolio} />;
}