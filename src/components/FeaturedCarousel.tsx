import { Carousel } from "flowbite-react";

export function FeaturedCarousel() {
  return (
    <div className="flex flex-col gap-6 xl:flex-row">
    <div className="h-56 sm:h-64 xl:h-96 xl:flex-1 2xl:h-96">
      <Carousel>
        <div className="flex h-full bg-[url('football.jpeg')] bg-center dark:text-white">
        <div className="flex size-full items-end bg-gray-800 opacity-75">
          <div className="h-32 px-20 text-3xl font-semibold">
            <p>Jan 03</p>
            <p>Football article about football stuff</p>
          </div>
        </div>
        </div>
        
      </Carousel>
    </div>
    <div className="h-44 w-full rounded-lg bg-gray-400 dark:bg-gray-700 dark:text-white xl:h-auto xl:w-72">
        Ad
    </div>
    </div>
  );
}