
const CategoryCard = ({ category={} }) => {
  return (
    <div className="space-y-6 xl:space-y-10">
      <img
         className="mx-auto h-40 w-40 rounded-full xl:w-50 xl:h-50"
        src={category.imageUrl}
        
      />
      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
        <div className="font-medium text-lg mx-auto leading-6 space-y-1">
          <h3 className="text-gray-700">{category.name}</h3>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
