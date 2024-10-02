import { formatDate } from "../../components/formatDate";
import { Article } from "../article";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <>
      <a href={`/article/${article.sys.id}`} className="w-full">
        <div className="flex size-full flex-col gap-2">
          <img
            className="h-72 rounded-xl object-cover shadow-md md:h-3/4"
            src={article.headerImage.url}
            alt="Featured"
          />
          <div className="h-24 overflow-hidden">
            <div className="flex">
              <div className="flex gap-2">
                <img
                  className="size-6 rounded-full"
                  src={article.author.avatar.url}
                />
                <p>
                  By{" "}
                  <span className="font-semibold">
                    {article.author.firstName} {article.author.lastName}
                  </span>
                </p>
              </div>
              <p className="mx-2 ml-auto">
                {formatDate(article.sys.firstPublishedAt)}
              </p>
            </div>
            <h2 className="line-clamp-2 text-2xl font-bold">{article.title}</h2>
          </div>
        </div>
      </a>
    </>
  );
}
