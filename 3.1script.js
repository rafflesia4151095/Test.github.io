// script.js
document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーボタン
  const btnTrigger = document.getElementById('btn01');

  btnTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('show-nav');
    btnTrigger.classList.toggle('active');
  });

  // 画面全体クリック（ドロワー外クリックで閉じる）
  window.addEventListener('click', (event) => {
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.overlay');
    if (
      !nav.contains(event.target) &&
      !btnTrigger.contains(event.target) &&
      document.body.classList.contains('show-nav')
    ) {
      document.body.classList.remove('show-nav');
      btnTrigger.classList.remove('active');
    }
  });

  // オーバーレイクリックで閉じる
  document.querySelector('.overlay').addEventListener('click', () => {
    document.body.classList.remove('show-nav');
    btnTrigger.classList.remove('active');
  });

  // ドロワーメニューリンククリックで閉じる
  const hrefLink = document.querySelectorAll('.nav a');
  hrefLink.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('show-nav');
      btnTrigger.classList.remove('active');
    });
  });
});
