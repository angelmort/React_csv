import React, { useState } from 'react';

// 商品登録フォームコンポーネント
function ProductForm({ onAddProduct }) {
  // フォームの入力フィールドの状態を管理するためのuseStateフック
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');

  // 入力フィールドの値が変更されたときに呼ばれる関数
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 入力フィールドの名前に応じて、対応する状態を更新
    if (name === 'productName') setProductName(value);
    if (name === 'productCode') setProductCode(value);
    if (name === 'description') setDescription(value);
  };

  // 商品をリストに追加するための関数
  const handleAddProduct = () => {
    // 入力フィールドが空でないか確認
    if (productName && productCode && description) {
      const newProduct = { productName, productCode, description }; // 新しい商品データを作成
      onAddProduct(newProduct); // 親コンポーネントの関数を呼び出し、新しい商品データを渡す

      // 入力フィールドをクリア
      setProductName('');
      setProductCode('');
      setDescription('');
    } else {
      // フィールドが空の場合はアラートを表示
      alert('すべてのフィールドを入力してください。');
    }
  };

  return (
    <form className="product-form">
      <input
        type="text"
        name="productName"
        value={productName}
        onChange={handleInputChange}
        placeholder="商品名"
      />
      <input
        type="text"
        name="productCode"
        value={productCode}
        onChange={handleInputChange}
        placeholder="商品コード"
      />
      <textarea
        name="description"
        value={description}
        onChange={handleInputChange}
        placeholder="説明"
      ></textarea>

      {/* 商品をリストに追加するためのボタン */}
      <button type="button" onClick={handleAddProduct} className="add-button">
        登録
      </button>
    </form>
  );
}

export default ProductForm;