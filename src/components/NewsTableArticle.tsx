import { Card } from "flowbite-react";
import { formatDate } from "./formatDate";
import { Article } from "./NewsTable";

export function NewsTableArticle({ article }: { article: Article }) {
  return (
    <Card
      className="w-full cursor-pointer hover:shadow-xl lg:max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={article.headerImage.url}
      href="/article"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {article.title}
      </h5>
      <p className="text-gray-700 dark:text-gray-400">
        {formatDate(article.sys.firstPublishedAt)}
      </p>
    </Card>
  );
}
