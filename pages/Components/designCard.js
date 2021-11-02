const DesignCard = ({ handleStartUsingDesignClick, design = {} }) => {
  return (
    <div
      className="space-y-6 "
      onClick={() => handleStartUsingDesignClick(design)}
    >
      <img
        className="mx-auto h-50 w-50 rounded-t  xl:w-full xl:h-96"
        src={design.imageUrl}
        alt=""
      />
      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
        <div className="font-medium text-lg mx-4 leading-6 space-y-1">
          <h3 className="text-gray-600">{design.name}</h3>
          {/* <p className="text-indigo-400">{Item.role}</p> */}
        </div>
        <div>
          <span
            className="px-3 border py-2 mx-4 text-gray-800"
            onClick={() => handleStartUsingDesignClick(design)}
          >
            Start Using
          </span>
        </div>
      </div>
    </div>
  );
};
export default DesignCard;
