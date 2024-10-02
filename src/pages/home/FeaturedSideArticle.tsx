import { formatDate } from "../../components/formatDate";
import { Article } from "../article";

interface FeaturedSideBarProps {
  article: Article;
}

export default function FeaturedSideArticle({ article }: FeaturedSideBarProps) {
  return (
    <>
      <a href={`/article/${article.sys.id}`}>
        <div className="flex size-full rounded-lg border shadow-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="w-24 rounded-l-lg object-cover sm:w-32 lg:h-48 lg:w-56">
            <img
              className="size-full rounded-l-lg object-cover"
              src={article.headerImage.url}
            />
          </div>
          <div className="w-full overflow-hidden px-4 py-2 sm:p-4 ">
            <h2 className=" mb-2 line-clamp-2 h-12 overflow-hidden font-bold sm:line-clamp-3 sm:h-[90px] sm:text-xl lg:line-clamp-4 lg:h-32 lg:text-2xl">
              {article.title}
            </h2>
            <div className="flex w-full text-sm sm:text-base">
              <div className="flex h-6 w-full gap-2 overflow-hidden">
                <img
                  className="size-5 rounded-full sm:size-6 "
                  src={article.author.avatar.url}
                />
                <p className="line-clamp-1 pr-2">
                  By{" "}
                  <span className="font-semibold">
                    {article.author.firstName} {article.author.lastName}
                  </span>
                </p>
              </div>
              <p className="ml-auto mr-0 whitespace-nowrap">
                {formatDate(article.sys.firstPublishedAt)}
              </p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
