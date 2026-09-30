import { shampooData, treatmentData, skinCareData, hairToolData } from './items-data.js';

// データをHTMLに展開する共通関数
function renderItems(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<p class="no-item">準備中</p>';
    return;
  }

  const htmlString = data.map(item => `
    <div class="items">
      <h3 class="items-title">${item.name}</h3>
      <a class="items-img" href="${item.link}"><img src="${item.image}" alt="${item.name}"></a>
      <p class="items-desc">${item.description}</p>
    </div>
  `).join('');

  container.innerHTML = htmlString;
}

// ページ読み込み時に各セクションへ流し込む
window.addEventListener('DOMContentLoaded', () => {
  renderItems(shampooData, 'shampoo-items');
  renderItems(treatmentData, 'treatment-items');
  renderItems(skinCareData, 'skincare-items');
  renderItems(hairToolData, 'tool-items');
});