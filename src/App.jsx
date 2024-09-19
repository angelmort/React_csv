import React, { useState } from 'react';
import './App.css';
import ProductForm from '../component/ProductForm'; // 商品登録フォーム用コンポーネント
import ProductList from '../component/ProductList'; // 商品リスト表示用コンポーネント
import CsvLoad from '../component/CsvLoad'; // CSV読み込み用コンポーネント
import CsvSave from '../component/CsvSave'; // CSV保存用コンポーネント

function App() {
  // CSVデータを管理するための状態
  const [csvData, setCsvData] = useState([]);

  // 新しい商品をリストに追加する関数
  const handleAddProduct = (newProduct) => {
    setCsvData([...csvData, newProduct]); // 既存のデータに新しい商品を追加
  };

  // 商品をリストから削除する関数
  const handleDeleteProduct = (index) => {
    const updatedData = csvData.filter((_, i) => i !== index); // 削除する商品のインデックスを除外
    setCsvData(updatedData); // 更新されたデータを状態に設定
  };

  // CSVファイルから読み込まれたデータを設定する関数
  const handleCsvDataLoad = (data) => {
    setCsvData(data); // 読み込まれたデータを状態に設定
  };

  return (
    <div className="App">
      <h1>商品登録フォーム</h1>

      {/* 商品登録フォームコンポーネント */}
      <ProductForm onAddProduct={handleAddProduct} />

      {/* CSV読み込み用コンポーネント */}
      <CsvLoad onCsvDataLoad={handleCsvDataLoad} />

      <h2>登録された商品</h2>

      {/* 商品リスト表示用コンポーネント */}
      <ProductList products={csvData} onDeleteProduct={handleDeleteProduct} />

      {/* CSV保存用コンポーネント */}
      <CsvSave csvData={csvData} />
    </div>
  );
}

export default App;