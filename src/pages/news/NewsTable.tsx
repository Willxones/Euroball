import { useQuery } from "@apollo/client";
import { NewsTableArticle } from "./NewsTableArticle";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
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
    json: string;
  };
  author: {
    firstName: string;
    lastName: string;
    avatar: {
      url: string;
    }
  }
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
  limit: number;
  currentPage: number | null;    // Added pagination props
  onPageChange: (page: number) => void | null;
  setTotalPages: (totalPages: number) => void | null;  // To set total pages
  isSidebar: boolean;
  currentArticleId: string | undefined;
}
export default function NewsTable({ 
  selectedLeague, 
  searchQuery, 
  limit, 
  currentPage, 
  onPageChange, 
  setTotalPages, 
  isSidebar,
  currentArticleId // New prop to identify the current article
}: NewsTableProps) {
  let skip = 0;
  if (currentPage) {
    skip = (currentPage - 1) * limit;
  }

  const { data, loading, error } = useQuery<GetArticlesResponse>(
    selectedLeague?.name === 'All Leagues' ? GET_ALL_ARTICLES : GET_ARTICLES_BY_LEAGUE,
    {
      variables: {
        limit,
        skip,
        leagueName: selectedLeague?.name === 'All Leagues' ? null : selectedLeague?.name,
        searchQuery: searchQuery || '',
      },
    }
  );

  useEffect(() => {
    onPageChange(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeague, searchQuery]);

  if (loading) return <div className="py-12 text-center"><Spinner aria-label="Loading status" size="xl" /></div>;
  if (error) return <div className="py-12 text-center text-gray-800 dark:text-white">Sorry, there has been a problem loading this page. Please try reloading the page.</div>;

  const totalArticles = data?.articleCollection.total || 0;
  const totalPages = Math.ceil(totalArticles / limit || 1);
  setTotalPages(totalPages);

  let filteredArticles = data?.articleCollection.items || [];

  // If isSidebar is true and currentArticleId is defined, filter out the current article
  if (isSidebar && currentArticleId !== undefined) {
    filteredArticles = filteredArticles.filter(article => article.sys.id !== currentArticleId);
  }

  return (
    <div className={`my-2 flex gap-5 ${isSidebar ? 'my-0 flex-col' : 'flex-col sm:grid sm:grid-cols-2 sm:flex-row lg:grid-cols-3'}`}>
      {filteredArticles.map((article: Article) => (
        <NewsTableArticle key={article.sys.id} article={article} />
      ))}
    </div>
  );
}
