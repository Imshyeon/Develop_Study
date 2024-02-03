export default function MealItem({
  id,
  image,
  name,
  price,
  description,
  onAddCart,
}) {
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt="meal item image" />
        <h3>{name}</h3>
        <div>
          <p className="meal-item-price">{price}</p>
          <p className="meal-item-description">{description}</p>
          <button
            className="meal-item-actions button"
            onClick={() => onAddCart(id, name)}
          >
            + Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
