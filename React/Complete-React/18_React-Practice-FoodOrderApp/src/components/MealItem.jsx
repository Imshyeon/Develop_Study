export default function MealItem() {
  return (
    <div className="meal-item">
      <article>
        <img src="meal img" alt="meal item image" />
        <h3>Meal Name</h3>
        <div>
          <p className="meal-item-price">$10</p>
          <p className="meal-item-description">meal item description</p>
          <button className="meal-item-actions button">+ Add to Cart</button>
        </div>
      </article>
    </div>
  );
}
