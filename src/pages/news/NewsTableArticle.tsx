import { formatDate } from "../../components/formatDate";
import { Article } from "./NewsTable";

export function NewsTableArticle({ article }: { article: Article }) {
  return (
    <>
    <a href={`/article/${article.sys.id}`}>
    <div className="h-[420px] w-full cursor-pointer rounded-lg shadow-md hover:shadow-xl dark:border dark:border-gray-700 sm:h-[500px] lg:max-w-sm">
      <img src={article.headerImage.url} className="h-52 w-full rounded-t-lg object-cover object-center sm:h-72"/>
      <div className="h-full p-5">
    <h5 className="line-clamp-4 h-32 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {article.title}
      </h5>
      <p className="mt-3 text-gray-700 dark:text-gray-400">
        {formatDate(article.sys.firstPublishedAt)}
      </p>
      </div>
      </div>
      </a>
    </>
  );
}
