import React, { useState } from 'react';
import './App.css';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

function App() {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [description, setDescription] = useState('');
  const [csvData, setCsvData] = useState([]);
  const fileInputRef = React.createRef(); // ファイル入力の参照

  // 入力変更を処理する関数
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productName') setProductName(value);
    if (name === 'productCode') setProductCode(value);
    if (name === 'description') setDescription(value);
  };

  // 新しい商品をリストに追加する関数
  const handleAddProduct = () => {
    if (productName && productCode && description) {
      const newData = { productName, productCode, description };
      setCsvData([...csvData, newData]);
      // 入力フィールドをクリア
      setProductName('');
      setProductCode('');
      setDescription('');
    } else {
      alert('すべてのフィールドを入力してください。');
    }
  };

  // CSVに保存する関数
  const saveToCsv = () => {
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
  };

  // CSVからデータを読み込む関数
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data.filter(row => row.productName); // フィルタリング
        setCsvData(data);
        fileInputRef.current.value = ''; // ファイル選択をリセット
      },
      error: (error) => {
        console.error("CSV parse error:", error);
      }
    });
  };

  // 商品を削除する関数
  const handleDelete = (index) => {
    const updatedData = csvData.filter((_, i) => i !== index);
    setCsvData(updatedData);
  };

  return (
    <div className="App">
      <h1>商品登録フォーム</h1>
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

        {/* 登録ボタンを追加 */}
        <button type="button" onClick={handleAddProduct} className="add-button">
          登録
        </button>
      </form>

      {/* ファイル選択ボタン */}
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload} 
        ref={fileInputRef} // 参照を設定
      />

      <h2>登録された商品</h2>
      <ul>
        {csvData.map((item, index) => (
          <li key={item.productCode || index}>
            {item.productName}, {item.productCode}, {item.description}
            <button onClick={() => handleDelete(index)}>削除</button>
          </li>
        ))}
      </ul>

      {/* CSVに保存ボタンをリストの下に配置 */}
      <button type="button" onClick={saveToCsv} className="save-button">
        CSVに保存
      </button>
    </div>
  );
}

export default App;