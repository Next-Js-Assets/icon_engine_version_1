import { useRouter } from "next/router";
import { useEffect } from "react";

const CategoryCard = ({ category = {} }) => {
  const router = useRouter();
  const handleCategoryClick = (category) => {
    router.push({
      pathname: "/search",
      query: { type: "all", category: category.title },
    });
  };
  return (
    <div
      className="space-y-6 xl:space-y-10 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        handleCategoryClick(category);
      }}
    >
      <img
        className="mx-auto h-40 w-40 rounded-full xl:w-50 xl:h-50"
        src={category.thumbnail}
      />
      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
        <div className="font-medium text-lg mx-auto leading-6 space-y-1">
          <h3 className="text-gray-700">{category.title}</h3>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
