import React from 'react';

// 商品リスト表示用コンポーネント
function ProductList({ products, onDeleteProduct }) {
  return (
    <ul className="product-list">
      {/* 商品リストをmapで表示 */}
      {products.map((product, index) => (
        <li key={product.productCode || index} className="product-item">{/*product.productCode が存在する場合はそれを key に使用し、存在しない場合は index を使用*/}
          {/* 商品情報の表示 */}
          {product.productName}, {product.productCode}, {product.description}
          {/* 削除ボタン */}
          <button onClick={() => onDeleteProduct(index)} className="delete-button">
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;