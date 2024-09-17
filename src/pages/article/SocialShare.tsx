import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faLinkedinIn, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faClipboard } from '@fortawesome/free-solid-svg-icons';

interface SocialShareProps {
  url: string | undefined;
  title: string | undefined;
  text: string | undefined;
  hashtag?: string | undefined;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, text, hashtag }) => {
  
  const encodedUrl = encodeURIComponent(url!);
  const encodedTitle = encodeURIComponent(title!);
  const encodedText = encodeURIComponent(text!);
  const encodedHashtag = hashtag ? encodeURIComponent(`#${hashtag}`) : '#Euroball';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url!)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => alert('Failed to copy URL: ' + err));
  };

  return (
    <div className="flex space-x-4">
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="text-blue-600 hover:text-blue-800"
      >
        <FontAwesomeIcon icon={faFacebookF} size="2x" />
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedHashtag}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="text-blue-400 hover:text-blue-600"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="text-blue-700 hover:text-blue-900"
      >
        <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="text-green-500 hover:text-green-700"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`}
        aria-label="Share via Email"
        className="text-gray-600 hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
      </a>

      {/* Clipboard */}
      <button
        onClick={handleCopyToClipboard}
        aria-label="Copy URL to Clipboard"
        className="text-gray-600 hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faClipboard} size="2x" />
      </button>
    </div>
  );
};

export default SocialShare;
