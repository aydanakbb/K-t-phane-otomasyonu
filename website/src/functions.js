// Kitap ekleme fonksiyonu
function kitapEkle() {
  var kadi = document.getElementById('kitapadi').value;
  var tur = document.getElementById('kitapturu').value;
  var sayfasayisi = document.getElementById('kitapsayfasayisi').value;
  var kimg = document.getElementById('kimg').value;

  if (kadi === '' || tur === '' || sayfasayisi === '' || kimg === '') {
    document.getElementById('result').innerHTML = 'Boş alan bırakamazsınız.';
    document.getElementById('result').className = 'error';
  } else {
    var book = {
      kitapAdi: kadi,
      kitapTuru: tur,
      sayfaSayisi: sayfasayisi,
      kitapKapagi: kimg
    };

    // Önce localStorage'dan mevcut kitapları alın
    var books = JSON.parse(localStorage.getItem('books')) || [];

    // Yeni kitabı kitap listesine ekleyin
    books.push(book);

    // Güncellenmiş kitap listesini localStorage'a kaydedin
    localStorage.setItem('books', JSON.stringify(books));

    document.getElementById('result').innerHTML = 'Kitap başarılı bir şekilde eklendi.';
    document.getElementById('result').className = 'success';

    // Kitap listesini güncelleyin
    showBookList();
  }
}

// Kitap listesini gösteren fonksiyon
function showBookList() {
  var bookContainer = document.getElementById('book-container');
  var books = JSON.parse(localStorage.getItem('books')) || [];

  // Kitap listesini temizleyin
  bookContainer.innerHTML = '';

  // Her bir kitap için bir kart oluşturun ve kitap listesine ekleyin
  books.forEach(function(book) {
    var card = createBookCard(book);
    bookContainer.appendChild(card);
  });
}

// Kitap kartı oluşturan yardımcı fonksiyon
function createBookCard(book) {
  var card = document.createElement('div');
  card.classList.add('card', 'text-white', 'mb-3');

  var cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  var title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = book.kitapAdi;

  var subtitle = document.createElement('h6');
  subtitle.classList.add('card-subtitle', 'mb-2', 'text-muted');
  subtitle.textContent = book.kitapTuru;

  var pageCount = document.createElement('p');
  pageCount.classList.add('card-text');
  pageCount.textContent = 'Sayfa Sayısı: ' + book.sayfaSayisi;

  var image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = book.kitapKapagi;
  image.alt = book.kitapAdi;

  cardBody.appendChild(title);
  cardBody.appendChild(subtitle);
  cardBody.appendChild(pageCount);
  card.appendChild(image);
  card.appendChild(cardBody);

  return card;
}

// Sayfa yüklendiğinde kitap listesini gösterin
window.onload = function() {
  showBookList();
};