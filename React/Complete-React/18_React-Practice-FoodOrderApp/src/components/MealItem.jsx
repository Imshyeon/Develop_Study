export default function MealItem({ item, onAddCart }) {
  return (
    <div className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${item.image}`}
          alt="meal item image"
        />
        <h3>{item.name}</h3>
        <div>
          <p className="meal-item-price">{item.price}</p>
          <p className="meal-item-description">{item.description}</p>
          <button
            className="meal-item-actions button"
            onClick={() => onAddCart(item, item.count)}
          >
            + Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
