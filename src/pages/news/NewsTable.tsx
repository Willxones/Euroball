import { useQuery } from "@apollo/client";
import { NewsTableArticle } from "./NewsTableArticle";
import { Pagination, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { GET_ARTICLES_BY_LEAGUE, GET_ALL_ARTICLES } from "../../queries";
import { League } from "./LeaguePicker"; // Ensure to import League type

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

interface NewsTableProps {
  selectedLeague: League | null;
  searchQuery: string;
}

export default function NewsTable({ selectedLeague, searchQuery }: NewsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Adjust as needed
  const skip = (currentPage - 1) * limit;

  // Determine which query to use based on selected league
  const { data, loading, error } = useQuery<GetArticlesResponse>(
    selectedLeague?.name === 'All Leagues' ? GET_ALL_ARTICLES : GET_ARTICLES_BY_LEAGUE,
    {
      variables: {
        limit,
        skip,
        leagueName: selectedLeague?.name === 'All Leagues' ? null : selectedLeague?.name,
        searchQuery: searchQuery || '', // Pass searchQuery to the query
      },
    }
  );

  // Reset current page when league or searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLeague, searchQuery]);

  const onPageChange = (page: number) => setCurrentPage(page);

  if (loading) return <div className="py-12 text-center"><Spinner aria-label="Default status example" size="xl" /></div>;
  if (error) return <div>Error loading articles</div>;

  // Calculate total pages based on the total count of articles for the current filter
  const totalArticles = data?.articleCollection.total || 0;
  const totalPages = Math.ceil(totalArticles / limit || 1);

  // Get filtered articles to display on the current page
  const filteredArticles = data?.articleCollection.items || [];

  return (
    <>
      <div className="my-5 flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article: Article) => (
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
