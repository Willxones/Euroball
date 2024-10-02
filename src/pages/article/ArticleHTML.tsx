import { useEffect } from "react";
import DOMPurify from "dompurify";

interface ArticleHTMLProps {
  content: string;
}

export default function ArticleHTML({ content }: ArticleHTMLProps) {
  // Sanitize the content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);

  useEffect(() => {
    // Function to load the Twitter script
    const loadTwitterScript = () => {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      } else {
        // Assert the type of window.twttr to ensure type safety
        const twttr = window.twttr as { widgets: { load: () => void } };
        twttr.widgets.load();
      }
    };

    // Load the Twitter script
    loadTwitterScript();
  }, [sanitizedContent]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
