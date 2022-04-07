(function() {
  const noBtn = document.querySelector('#no-btn');

  const x = {a: 1}

  const y = x?.b

  noBtn.addEventListener('click', () => {
    alert('CLICKED');
  })


})();
