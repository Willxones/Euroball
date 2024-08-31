import { useQuery } from "@apollo/client";
import { GET_FEATURED_ARTICLES, GET_ALL_ARTICLES } from "../../queries";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedSideArticle from "./FeaturedSideArticle";
import { Article } from "../article";
import { Spinner } from "flowbite-react";

export default function FeaturedNewsSection() {
    const { data: featuredData, loading: featuredLoading, error: featuredError } = useQuery(GET_FEATURED_ARTICLES);
    const { data: allData, loading: allLoading, error: allError } = useQuery(GET_ALL_ARTICLES, {
        variables: { limit: 3, skip: 0, searchQuery: "" }
    });

    if (featuredLoading || allLoading) return <div className="py-12 text-center"><Spinner aria-label="Default status example" size="xl" /></div>;
    if (featuredError || allError) return <p>Error loading articles.</p>;

    const featuredArticles = featuredData?.articleCollection?.items || [];
    const recentArticles = allData?.articleCollection?.items || [];

    // Combine featured and recent articles, ensuring no duplicates, and limiting to 3 articles
    const combinedArticles = [...featuredArticles];

    if (combinedArticles.length < 3) {
        const nonDuplicateRecentArticles = recentArticles.filter((article: Article) => 
            !combinedArticles.some(featured => featured.sys.id === article.sys.id)
        );

        combinedArticles.push(...nonDuplicateRecentArticles.slice(0, 3 - combinedArticles.length));
    }

    // If there are fewer than 3 articles in total, return null (do not render the section)
    if (combinedArticles.length < 3) {
        return null;
    }

    return (
    <>
    <h2 className="text-lg font-bold dark:text-white">Featured News 🔥</h2>
        <div className="my-2 flex w-full flex-col gap-2 overflow-hidden dark:text-white md:h-96 md:flex-row lg:h-[400px]">
            <FeaturedArticle article={combinedArticles[0]} />
            <div className="flex w-full flex-col gap-2 md:h-40 lg:h-full">
                {combinedArticles[1] && <FeaturedSideArticle article={combinedArticles[1]} />}
                {combinedArticles[2] && <FeaturedSideArticle article={combinedArticles[2]} />}
            </div>
        </div>
    </>
    );
}

