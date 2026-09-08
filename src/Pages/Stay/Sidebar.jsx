import PriceSlider from "./PriceSlider";

export const Sidebar = ({ onSortChange, onPriceRangeChange }) => {

const handlePriceChange = (e) => {
  onSortChange({ field: "price", direction: e.target.value });
};
 
  const handleRatingChange = (e) => {
    onSortChange({ field: "rating", direction: e.target.value });
  };

  return (
    <div>
      <h3>Sort by price</h3>
      <div onChange={handlePriceChange} >
        <input
          type="radio"
          name="price"
          value={"asc"}
          id="price-low"
        />
        <label htmlFor="price-low">Low to High</label>
        <br />
        <input
          type="radio"
          name="price"
          value={"desc"}
          id="price-high"
        />
        <label htmlFor="price-high">High to Low</label>
      </div>
      <br />
      <br />
      <h3>Sort by rating</h3>
      <div onChange={handleRatingChange}>
        <input
          type="radio"
          name="rating"
          value={"asc"}
          id="rating-low"
        />
        <label htmlFor="rating-low">Low to High</label>
        <br />
        <input
          type="radio"
          name="rating"
          value={"desc"}
          id="rating-high"
        />
        <label htmlFor="rating-high">High to Low</label>
      </div>
      <br/>
      <br/>
      <br/>
      <div>
        <PriceSlider onChange={onPriceRangeChange} />
      </div>
    </div>
  );
};

export default Sidebar;
