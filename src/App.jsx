import React, { useState } from 'react';
import './App.css';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

function App() {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [csvData, setCsvData] = useState([]);

  // 入力変更を処理する関数
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productName') setProductName(value);
    if (name === 'productCode') setProductCode(value);
    if (name === 'description') setDescription(value);
  };

  // 入力を更新する関数
  const handleSubmit = (e) => {
    e.preventDefault();
    // 新しい商品のデータを作成

    // 追加の処理が必要な場合はここに記述
  };

  // CSVに保存する関数
  const saveToCsv = () => {
    const newData = [{ productName, productCode, description }];
    setCsvData([...csvData, ...newData]);
    const csv = Papa.unparse([...csvData, ...newData]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
  };

  // CSVからデータを読み込む関数
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
    });
  };

  return (
    <div className="App">
      <h1>商品登録フォーム</h1>
      <form>
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
        <button type="button" onClick={saveToCsv}>
          CSVに保存
        </button>
      </form>
      <h2>CSVファイルを読み込む</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <h2>登録された商品</h2>
      <ul>
        {csvData.map((item, index) => (
          <li key={index}>
            {item.productName}, {item.productCode}, {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
