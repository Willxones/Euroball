import {
  GET_ARTICLE_BY_ID,
  GET_ASSETS_BY_IDS,
  GET_TWEETS_BY_IDS,
} from "../../queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { formatDate } from "../../components/formatDate";
import { Document } from "@contentful/rich-text-types";
import { Spinner } from "flowbite-react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import RecentNewsSection from "../home/RecentNewsSection";
import { Tweet } from "react-tweet";
import { useParams } from "react-router-dom";

export interface Article {
  sys: {
    id: string;
    firstPublishedAt: string;
  };
  title: string;
  headerImage: {
    url: string;
  };
  author: {
    firstName: string;
    lastName: string;
    role: string;
    avatar: {
      url: string;
    };
    bio: string | null;
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

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  title: string;
  contentType: string;
  description: string;
}

interface TweetEntry {
  sys: {
    id: string;
  };
  tweetId: string;
}

export default function Article() {
  const { id } = useParams<{ id: string }>(); // Using object destructuring for types
  const { data, loading, error } = useQuery<GetArticleResponse>(
    GET_ARTICLE_BY_ID,
    {
      variables: { id },
    },
  );

  const [fetchAssets, { data: assetsData }] = useLazyQuery(GET_ASSETS_BY_IDS);
  const [fetchTweets, { data: tweetsData }] = useLazyQuery(GET_TWEETS_BY_IDS);

  const [assetMap, setAssetMap] = useState<{ [key: string]: Asset }>({});
  const [tweetMap, setTweetMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data?.article?.content?.json) {
      const assetIds = new Set<string>();
      const tweetIds = new Set<string>();
      const content = data.article.content.json;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const findEmbeddedIds = (node: any) => {
        if (node.nodeType === "embedded-asset-block") {
          assetIds.add(node.data.target.sys.id);
        }
        if (node.nodeType === "embedded-entry-block") {
          tweetIds.add(node.data.target.sys.id);
        }
        if (node?.content) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          node.content.forEach((child: any) => findEmbeddedIds(child));
        }
      };

      findEmbeddedIds(content);

      if (assetIds.size > 0) {
        fetchAssets({ variables: { ids: Array.from(assetIds) } });
      }
      if (tweetIds.size > 0) {
        fetchTweets({ variables: { ids: Array.from(tweetIds) } });
      }
    }
  }, [data, fetchAssets, fetchTweets]);

  useEffect(() => {
    if (assetsData?.assets?.items) {
      const map: { [key: string]: Asset } = {};
      assetsData.assets.items.forEach((asset: Asset) => {
        map[asset.sys.id] = asset;
      });
      setAssetMap(map);
    }
  }, [assetsData]);

  useEffect(() => {
    if (tweetsData?.tweetCollection?.items) {
      const map: { [key: string]: string } = {};
      tweetsData.tweetCollection.items.forEach((tweet: TweetEntry) => {
        map[tweet.sys.id] = tweet.tweetId;
      });
      setTweetMap(map);
    }
  }, [tweetsData]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Spinner aria-label="Loading" size="xl" />
      </div>
    );
  if (error) {
    console.error("Error loading article:", error);
    return (
      <div className="py-12 text-center text-gray-800 dark:text-white">
        Sorry, there has been a problem loading this page. Please try reloading
        the page.
      </div>
    );
  }

  const article = data?.article;
  const contentJson: Document = article?.content.json as Document;

  const options: Options = {
    preserveWhitespace: true,
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (
          !node.content ||
          (node.content.length === 1 &&
            node.content[0].nodeType === "text" &&
            node.content[0].value === "")
        ) {
          return <br />;
        }
        return <p className="lg:text-lg">{children}</p>;
      },
      [BLOCKS.HEADING_1]: (_node, children) => (
        <h1 className="text-4xl font-bold">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node, children) => (
        <h2 className="text-3xl font-semibold">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node, children) => (
        <h3 className="text-2xl font-medium">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node, children) => (
        <h4 className="text-xl font-normal">{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node, children) => (
        <h5 className="text-lg font-light">{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node, children) => (
        <h6 className="text-base font-thin">{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className="list-disc pl-5">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className="list-decimal pl-5">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => (
        <li className="pl-1">{children}</li>
      ),
      [BLOCKS.TABLE]: (_node, children) => (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <tbody>{children}</tbody>
        </table>
      ),
      [BLOCKS.TABLE_ROW]: (_node, children) => (
        <tr className="border border-gray-300">{children}</tr>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
        <th className="border border-gray-300 bg-gray-100 p-2 font-bold dark:text-gray-700">
          {children}
        </th>
      ),
      [BLOCKS.TABLE_CELL]: (_node, children) => (
        <td className="border border-gray-300 p-2">{children}</td>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node.data.target.sys.id;
        const asset = assetMap[assetId];
        if (asset) {
          const mimeType = asset.contentType;
          const url = asset.url;
          if (mimeType.startsWith("image/")) {
            return (
              <div>
                <img
                  src={url}
                  alt={asset.description}
                  className="my-4 max-h-[500px] w-full object-contain"
                />
                <sub>{asset.description}</sub>
              </div>
            );
          } else if (mimeType.startsWith("video/")) {
            return (
              <div>
                <video
                  controls
                  src={url}
                  className="my-4 max-h-[500px] w-full object-contain"
                />
                <sub>{asset.description}</sub>
              </div>
            );
          } else if (mimeType.startsWith("audio/")) {
            return <audio controls src={url} className="my-4" />;
          } else {
            return (
              <a href={url} className="text-blue-500 underline">
                {asset.title}
              </a>
            );
          }
        }
        return null;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const entryId = node.data.target.sys.id;
        const tweetId = tweetMap[entryId];
        if (tweetId) {
          return (
            // eslint-disable-next-line tailwindcss/no-custom-classname
            <div className="light dark:dark">
              <Tweet id={tweetId} />
            </div>
          );
        }
        return (
          <div className="text-center">
            <Spinner aria-label="Loading" size="xl" />
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a href={uri} className="text-blue-500 underline">
            {children}
          </a>
        );
      },
    },
  };

  ReactGA.send({
    hitType: "pageview",
    page: `/article/${id}`,
    title: `Article: ${article?.title}`,
  });

  return (
    <>
      <div className=" my-2 flex flex-col gap-5 lg:flex-row">
        <div className="max-w-screen-lg flex-1 text-gray-700 dark:text-white lg:min-w-[600px]">
          <img
            className="max-h-[450px] w-full rounded-xl object-cover"
            alt="header image"
            src={article?.headerImage.url}
          />
          <p className="pt-5 text-4xl font-semibold text-gray-700 dark:text-white">
            {article?.title}
          </p>
          <div className="flex py-2">
            <div className="flex gap-2">
              <img
                src={article?.author.avatar.url}
                className="size-[40px] rounded-full"
                alt={`Image of author ${article?.author.firstName} ${article?.author.lastName}`}
              />
              <div>
                <p className="">
                  {article?.author.firstName} {article?.author.lastName}
                </p>
                <p className="text-sm text-gray-400">{article?.author.role}</p>
              </div>
            </div>
            <p className="ml-auto pb-5 font-thin">
              {formatDate(article?.sys.firstPublishedAt || "")}
            </p>
          </div>
          <div className="flex flex-col gap-7">
            {documentToReactComponents(contentJson, options)}
          </div>
        </div>
        <div className="mt-10 w-full dark:text-white lg:mt-0 lg:w-80">
          <RecentNewsSection isSidebar={true} currentArticleId={id} />
        </div>
      </div>
    </>
  );
}
