import React, { useRef } from 'react';
import Papa from 'papaparse';

const CsvLoad = ({ onCsvDataLoad }) => {
  // ファイル入力要素への参照を作成するためのuseRef
  const fileInputRef = useRef(null);

  // CSVファイルを読み込んで解析する関数
  const handleFileUpload = (e) => {
    // ファイル入力で選択された最初のファイルを取得
    const file = e.target.files[0];
    
    if (file) {
      // PapaParseライブラリを使ってCSVファイルを解析
      Papa.parse(file, {
        header: true, // CSVの1行目をヘッダーとして使う
        skipEmptyLines: true, // 空の行は無視する
        complete: (result) => {
          // 解析が完了したときに呼ばれる関数
          
          // productNameが存在する行のみをフィルタリングして抽出
          const data = result.data.filter(row => row.productName);
          
          // フィルタリングしたデータを親コンポーネントに渡す
          onCsvDataLoad(data);
          
          // ファイル入力要素をリセットして、同じファイルを再選択できるようにする
          fileInputRef.current.value = ''; 
        },
        error: (error) => {
          // CSV解析中にエラーが発生した場合にエラーメッセージを出力
          console.error("CSV parse error:", error);
        }
      });
    }
  };

  return (
    <div>
      {/* ファイル選択用の入力要素 */}
      <input 
        type="file" 
        accept=".csv" // CSVファイルのみ選択可能に設定
        onChange={handleFileUpload} // ファイルが選択された時にhandleFileUploadを呼び出す
        ref={fileInputRef} // input要素に参照を設定し、リセットを行う
      />
    </div>
  );
};

export default CsvLoad;