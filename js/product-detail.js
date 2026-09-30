import { shampooData, treatmentData, skinCareData, hairToolData } from './items-data.js';

// すべてのデータを結合して検索しやすくする
const allProducts = [...shampooData, ...treatmentData, ...skinCareData, ...hairToolData];

// URLのクエリパラメータ (?id=xxx) を取得
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// 一致する商品を検索
const product = allProducts.find(item => item.id === productId);

if (product && product.detail) {
  // データの流し込み
  document.getElementById('detail-title').innerHTML = product.detail.title;
  document.getElementById('detail-image').src = product.detail.image;
  document.getElementById('detail-image').alt = product.name;
  document.getElementById('detail-overview').innerHTML = product.detail.overview;
  
  // 特徴リストの生成
  const featureContainer = document.getElementById('detail-features');
  featureContainer.innerHTML = product.detail.features.map(f => `
    <li>
      <strong>${f.title}</strong>
      <p>${f.text}</p>
    </li>
  `).join('');

  document.getElementById('detail-usage').innerHTML = product.detail.usage;

  // ▼ hairToolDataに含まれている商品か判定して切り替え
  const ingredientsTitle = document.getElementById('ingredients-title');
  const ingredientsText = document.getElementById('detail-ingredients');

  const isHairTool = hairToolData.some(item => item.id === product.id);

  if (isHairTool) {
    ingredientsTitle.textContent = '詳細';
    // ドライヤー等の ingredients に入っている仕様情報をそのまま表示
    ingredientsText.innerHTML = product.detail.ingredients;
  } else {
    ingredientsTitle.textContent = '配合成分';
    ingredientsText.textContent = product.detail.ingredients;
  }

} else {
  document.querySelector('.product-detail').innerHTML = '<h2>商品が見つかりませんでした。</h2><p><a href="product-items.html">商品一覧へ戻る</a></p>';
}