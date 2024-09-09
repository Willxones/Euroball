import NewsTable from "../news/NewsTable";

interface RecentNewsSectionProps {
    isSidebar: boolean;
    currentArticleId: string | undefined
}

export default function RecentNewsSection({isSidebar, currentArticleId}: RecentNewsSectionProps) {
    const selected = null;
    const searchQuery = "";
    const currentPage = 0;
    const limit = isSidebar ? 5 : 6;
    
    return (
        <>
            <h2 className={`mt-4 text-lg font-bold dark:text-white ${isSidebar ? 'hidden': ''}`}>Recent News 🗞️</h2>
            <NewsTable
                selectedLeague={selected}
                searchQuery={searchQuery}
                limit={limit}
                currentPage={currentPage}
                onPageChange={() => {}} // No-op function
                setTotalPages={() => {}} // No-op function
                isSidebar={isSidebar}
                currentArticleId={currentArticleId}
            />
        </>
    );
}
