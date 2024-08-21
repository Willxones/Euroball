import { FaFacebook, FaInstagram, FaLink, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface SocialSharingProps {
    title: string | undefined;
    url: string;
}

export default function SocialSharing({title, url}: SocialSharingProps) {
    function copy(text: string){
        navigator.clipboard.writeText(text)
      }
      console.log(title)
    return (
        <>
            <div>
                <div className="flex gap-2 pb-2">
                    <a className="cursor-pointer" href={`https://www.facebook.com/sharer.php?u=${url}`}>
                        <FaFacebook/>
                    </a>
                    <a className="cursor-pointer" href="">
                        <FaInstagram/>
                    </a>
                    <a className="cursor-pointer">
                        <FaTwitter/>
                    </a>
                    <a className="cursor-pointer">
                        <FaWhatsapp/>
                    </a>
                    <a className="cursor-pointer" onClick={() => copy(url)}>
                        <FaLink/>
                    </a>
                </div>
            </div>
        </>
    )
}