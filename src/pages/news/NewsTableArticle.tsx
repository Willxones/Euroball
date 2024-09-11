import { formatDate } from "../../components/formatDate";
import { Article } from "./NewsTable";

export function NewsTableArticle({ article }: { article: Article | undefined }) {
  if (!article) {
    return <div className="text-center dark:text-white">Error Fetching Article</div>
  }
  return (
    <>
    <a href={`/article/${article.sys.id}`}>
    <div className="h-[400px] w-full cursor-pointer rounded-lg shadow-md hover:shadow-xl dark:border dark:border-gray-700 dark:text-white sm:h-[500px] lg:max-w-sm">
      <img src={article.headerImage.url} className="h-52 w-full rounded-t-lg object-cover object-center sm:h-72"/>
      <div className=" p-5">
    <h5 className="line-clamp-4 h-32 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {article.title}
      </h5>
      <div className="flex w-full pt-2 text-sm sm:text-base">
        <div className="flex h-6 w-full gap-2 overflow-hidden">
          <img className="size-5 rounded-full sm:size-6" src={article.author.avatar.url}/>
          <p className="line-clamp-1 pr-2">By <span className="font-semibold">{article.author.firstName} {article.author.lastName}</span></p>
        </div>
        <p className="ml-auto mr-0 whitespace-nowrap">{formatDate(article.sys.firstPublishedAt)}</p>
      </div>
      </div>
      </div>
      </a>
    </>
  );
}
