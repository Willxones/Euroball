import { useQuery } from "@apollo/client";
import { NewsTableArticle } from "./NewsTableArticle"
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { GET_ARTICLES } from "../queries";

export interface Article {
  sys: {
    id: string;
    firstPublishedAt: string;
  };
  title: string;
  headerImage: {
    url: string;
  };
  content: {
    json: string; // Consider defining a more specific type if possible
  };
  leagueCollection: {
    items: {
      name: string;
      logo: {
        url: string;
      };
    }[];
  };
}

export interface ArticleCollection {
  items: Article[];
  total: number;
}

export interface GetArticlesResponse {
  articleCollection: ArticleCollection;
}

export default function NewsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 1;
  const skip = (currentPage - 1) * limit;

  const { data, loading, error } = useQuery(GET_ARTICLES, {
    variables: { limit, skip },
  });

  useEffect(() => {
    if (data) {
      // Handle any side effects when data changes
    }
  }, [data]);

  const onPageChange = (page: number) => setCurrentPage(page);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles</div>;

  const totalPages = Math.ceil(data.articleCollection.total / limit);

  return (
    <>
      <div className="my-5 flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {data?.articleCollection.items.map((article: Article) => (
          <NewsTableArticle key={article.sys.id} article={article} />
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  );
}