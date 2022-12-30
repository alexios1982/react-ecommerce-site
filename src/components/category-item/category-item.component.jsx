import React from "react";
import "./category-container.style.scss";

function CategoryItem({ category }) {
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <h3>Shop now!</h3>
      </div>
    </div>
  );
}

export default CategoryItem;
