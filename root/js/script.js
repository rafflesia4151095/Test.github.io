/* 共通パーツ読み込み関数 */
async function includeHTML() {
  // --- フォルダ構成変更への対応 ---
  // URLに "products/" または "product/" が含まれているか確認
  const isProductPage = window.location.pathname.includes('products/') || window.location.pathname.includes('product/');
  
  // 共通パーツ（core）へのパスを決定
  // 商品ページ（productsまたはproductフォルダ内）からなら ../core/
  // トップページ（root）からなら core/
  const corePrefix = isProductPage ? '../core/' : 'core/';
  // -------------------------

  const parts = [
    { id: 'js-header', file: 'header.html' },
    { id: 'js-nav-area', file: 'nav.html' },
    { id: 'js-footer', file: 'footer.html' },
    { id: 'js-button-top', file: 'button-top.html'},
  ];

  for (const part of parts) {
    const el = document.getElementById(part.id);
    if (el) {
      // 一致させた変数名 corePrefix を使用
      const response = await fetch(corePrefix + part.file);
      const data = await response.text();
      el.innerHTML = data;
    }
  }

  // ★パーツがすべて画面に出現した「後」に、動きの設定を呼び出す
  initMenu();
  initPageTop();
}

// （これ以降の initMenu や initPageTop は変更なしでそのまま）

/**
 * ハンバーガーメニュー・ドロワーの制御
 */
function initMenu() {
  const btnTrigger = document.getElementById('btn01');
  const body = document.body;
  const overlay = document.querySelector('.overlay');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav a');

  if (!btnTrigger) return; 

  btnTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    body.classList.toggle('show-nav');
    btnTrigger.classList.toggle('active');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      body.classList.remove('show-nav');
      btnTrigger.classList.remove('active');
    });
  }

  window.addEventListener('click', (event) => {
    if (
      nav && !nav.contains(event.target) &&
      !btnTrigger.contains(event.target) &&
      body.classList.contains('show-nav')
    ) {
      body.classList.remove('show-nav');
      btnTrigger.classList.remove('active');
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('show-nav');
      btnTrigger.classList.remove('active');
    });
  });
}

/**
 * ページトップボタンの制御
 */
function initPageTop() {
  const button = document.querySelector('.page-top');
  if (!button) return;

  button.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth"
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      button.classList.add('is-active');
    } else {
      button.classList.remove('is-active');
    }
  });
}

// 最後に実行を開始する
includeHTML();