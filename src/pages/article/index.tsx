import { useParams } from "react-router-dom";
import { GET_ARTICLE_BY_ID } from "../../queries";
import { useQuery } from "@apollo/client";
import { formatDate } from "../../components/formatDate";
import { Document } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import ArticleHTML from "./ArticleHTML";
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
      json: Document;
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
  
  interface GetArticleResponse {
    article: Article;
  }

export default function Article() {
    const {id} = useParams()
    const { data, loading, error } = useQuery<GetArticleResponse>(GET_ARTICLE_BY_ID, {
        variables: { id },
      });
    
      if (loading) return <div>Loading...</div>;
      if (error) {
        console.error("Error loading article:", error);
        return <div>Error loading article</div>;
      }
    
      const article = data?.article;
      const contentJson: Document = article?.content.json as Document
      const options = {
        preserveWhitespace: true,
      };
      const htmlString: string = documentToHtmlString(contentJson, options)
    return (
        <>
        <div className="my-2 flex flex-col gap-5 lg:flex-row">
            <div className="max-w-screen-md text-gray-700 dark:text-white">
                <img className="max-h-[450px] w-full rounded-xl object-cover " alt="header image" src={article?.headerImage.url}/>
                <p className=" pb-2 pt-5 text-4xl font-semibold text-gray-700 dark:text-white">{article?.title}</p>
                <div className="flex">
                <p className="pb-5">By Brad Duff</p>
                <p className="ml-auto font-thin">{formatDate(article?.sys.firstPublishedAt || "")}</p>
                </div>
                <div className="">
                    <ArticleHTML content={htmlString}/>
                </div>
            </div>
            <div className="w-full flex-1 rounded-xl bg-black text-white lg:min-w-72">
                ad
            </div>
        </div>
        </>
    )
}