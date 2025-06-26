const filas = 8;
    const columnas = 8;
    const totalMinas = 10;
    let celdas = [];

    const tablero = document.getElementById("tablero");
    const botonReiniciar = document.getElementById("reiniciar");

    botonReiniciar.addEventListener("click", crearTablero);

    function crearTablero() {
      tablero.innerHTML = "";
      celdas = [];

      for (let i = 0; i < filas; i++) {
        celdas[i] = [];
        for (let j = 0; j < columnas; j++) {
          const celda = document.createElement("div");
          celda.classList.add("celda");
          celda.dataset.fila = i;
          celda.dataset.columna = j;
          celda.addEventListener("click", revelarCelda);
          tablero.appendChild(celda);

          celdas[i][j] = {
            elemento: celda,
            mina: false,
            revelada: false,
            minasCerca: 0
          };
        }
      }

      colocarMinas();
      contarMinasCercanas();
    }

    function colocarMinas() {
      let colocadas = 0;
      while (colocadas < totalMinas) {
        const i = Math.floor(Math.random() * filas);
        const j = Math.floor(Math.random() * columnas);
        if (!celdas[i][j].mina) {
          celdas[i][j].mina = true;
          colocadas++;
        }
      }
    }

    function contarMinasCercanas() {
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
          if (celdas[i][j].mina) continue;
          let total = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              const ni = i + x;
              const nj = j + y;
              if (ni >= 0 && ni < filas && nj >= 0 && nj < columnas) {
                if (celdas[ni][nj].mina) total++;
              }
            }
          }
          celdas[i][j].minasCerca = total;
        }
      }
    }

    function revelarCelda(e) {
      const i = parseInt(e.target.dataset.fila);
      const j = parseInt(e.target.dataset.columna);
      const celda = celdas[i][j];

      if (celda.revelada) return;

      celda.revelada = true;
      celda.elemento.classList.add("revelada");

      if (celda.mina) {
        celda.elemento.textContent = "💣";
        celda.elemento.classList.add("mina");
        mostrarTodasLasMinas();
      } else if (celda.minasCerca > 0) {
        celda.elemento.textContent = celda.minasCerca;
      } else {
        celda.elemento.textContent = "";
      }
    }

    function mostrarTodasLasMinas() {
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
          const celda = celdas[i][j];
          if (celda.mina) {
            celda.elemento.textContent = "💣";
            celda.elemento.classList.add("mina");
          }
        }
      }
    }

    crearTablero();