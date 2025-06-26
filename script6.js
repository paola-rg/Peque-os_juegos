 const emojisOriginal = ['🌓', '☄️', '🌠', '⭐', '🌟', '💫', '🪐', '✨'];
    let gameBoard = document.getElementById('gameBoard');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    function iniciarJuego() {
      // Reset
      gameBoard.innerHTML = '';
      firstCard = null;
      secondCard = null;
      lockBoard = false;
      matchedPairs = 0;

      // Duplicar y mezclar emojis
      let emojis = [...emojisOriginal, ...emojisOriginal].sort(() => 0.5 - Math.random());

      // Crear cartas
      emojis.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="front">❓</div>
          <div class="back">${emoji}</div>
        `;

        card.addEventListener('click', () => {
          if (lockBoard || card.classList.contains('flipped')) return;

          card.classList.add('flipped');

          if (!firstCard) {
            firstCard = card;
          } else {
            secondCard = card;
            lockBoard = true;

            const firstEmoji = firstCard.querySelector('.back').textContent;
            const secondEmoji = secondCard.querySelector('.back').textContent;

            if (firstEmoji === secondEmoji) {
              firstCard.classList.add('matched');
              secondCard.classList.add('matched');
              matchedPairs++;

              if (matchedPairs === emojisOriginal.length) {
                setTimeout(() => {
                  alert('¡Felicidades! Has completado el juego.');
                }, 500);
              }

              resetBoard();
            } else {
              setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetBoard();
              }, 1000);
            }
          }
        });

        gameBoard.appendChild(card);
      });
    }

    function resetBoard() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    // Iniciar al cargar
    iniciarJuego();