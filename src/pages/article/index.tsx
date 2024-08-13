import ArticleHTML from "./ArticleHTML";

export default function Article() {
    return (
        <>
        <div className="my-2 flex flex-col gap-5 lg:flex-row">
            <div className="max-w-screen-md text-gray-700 dark:text-white">
                <img className="max-h-[450px] w-full rounded-xl object-cover " alt="header image" src="https://www.liveu.tv/wp-content/uploads/2023/07/European-League-of-Football-ELF-scaled.jpg"/>
                <p className=" pb-2 pt-5 text-4xl font-semibold text-gray-700 dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="flex">
                <p className="pb-5">By Brad Duff</p>
                <p className="ml-auto font-thin">Jun 24, 2024</p>
                </div>
                <div className="">
                    <ArticleHTML content='<p>kjfdskfndsk kdsjfkjdsf kdjfghdkfhgkdfgnkdfngkjdfngk jdfsdoifjlsdkjflsd jfldsn flkds fkdshflksdjflksjflsdk flsd flsdflk fdjkshfkdjhfdkj kjdfhgkjdf gkjfdhgkjg hdflkghdl si</p> <p><img src="https://firebasestorage.googleapis.com/v0/b/euroball-app.appspot.com/o/Articles%2Fzzzzzzzzzzzzzzzzzzzy%2Fcontent%2FQuG5M9hgzkffEPYJhBUt-football.jpeg?alt=media&amp;token=6a86059f-2330-4957-a9a6-096c8dd5a28f" alt="football.jpeg" width="1000" height="667" />ccxcv,dnvkxcnv</p> <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Touchdown for the Sea Devils 🙌<br><br>📺 Watch <a href="https://twitter.com/hashtag/HSDatFGY?src=hash&amp;ref_src=twsrc%5Etfw">#HSDatFGY</a> live NOW with the ELF Game Pass <a href="https://t.co/lfLXqxYqfk">pic.twitter.com/lfLXqxYqfk</a></p>&mdash; European League of Football (@ELF_Official) <a href="https://twitter.com/ELF_Official/status/1807462917173854242?ref_src=twsrc%5Etfw">June 30, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'/>
                </div>
            </div>
            <div className="w-full flex-1 rounded-xl bg-black text-white lg:min-w-72">
                ad
            </div>
        </div>
        </>
    )
}