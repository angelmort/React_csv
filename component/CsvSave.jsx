import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const CsvSave = ({ csvData }) => {
  // CSVを保存する関数
  const saveToCsv = () => {
    // `csvData`をCSV形式の文字列に変換
    const csv = Papa.unparse(csvData);

    // UTF-8のBOM（Byte Order Mark）を追加する
    // BOMを追加することで、Excelなどで文字化けしないようにする
    const bom = '\uFEFF'; // UTF-8のBOM文字列

    // CSVデータにBOMを付加し、Blobとして作成
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });

    // ファイルを保存する処理。ダウンロードされるファイル名は`products.csv`
    saveAs(blob, 'products.csv');
  };

  return (
    // ボタンクリックでCSVを保存
    <button type="button" onClick={saveToCsv} className="save-button">
      CSVに保存
    </button>
  );
};

export default CsvSave;