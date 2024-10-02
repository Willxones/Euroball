import { Pagination } from "flowbite-react";

interface NewsPaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NewsPaginator({
  currentPage,
  totalPages,
  onPageChange,
}: NewsPaginatorProps) {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="navigation"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
