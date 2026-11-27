// Lista bruta de grids onde cada string representa uma linha (1 = preenchido, 0 = vazio).
const RAW_PUZZLES = {
    "5x5": [
        [
            "00100",
            "11111",
            "00100",
            "00100",
            "00100",
        ],
        [
            "01010",
            "11111",
            "11111",
            "01110",
            "00100",
        ],
        [
            "00100",
            "01110",
            "11111",
            "01110",
            "00100",
        ],
        [
            "11111",
            "10001",
            "10101",
            "10001",
            "11111",
        ],
        [
            "00100",
            "01110",
            "11111",
            "00100",
            "00100",
        ],
        [
            "10001",
            "01010",
            "00100",
            "01010",
            "10001",
        ],
    ],
    "10x10": [
        [
            "0001100000",
            "0011110000",
            "0111111000",
            "1111111100",
            "0111111000",
            "0011110000",
            "0111111000",
            "1110011110",
            "1100000110",
            "1000000010",
        ],
        [
            "0001111000",
            "0011111100",
            "0111111110",
            "1111111111",
            "1111111111",
            "0111111110",
            "0011111100",
            "0001111000",
            "0000110000",
            "0000010000",
        ],
    ],
    "15x15": [
        [
            "000001111100000",
            "000111111111000",
            "001111111111100",
            "011111111111110",
            "011111111111110",
            "111111111111111",
            "111111001111111",
            "111110000011111",
            "111100000001111",
            "111100000001111",
            "011110000011110",
            "001111000111100",
            "000111111111000",
            "000011111110000",
            "000000111000000",
        ],
        [
            "000000110000000",
            "000001111000000",
            "000011111100000",
            "000111111110000",
            "001111111111000",
            "011110110111100",
            "111100000001111",
            "111100000001111",
            "111100110001111",
            "011110110111100",
            "001111111111000",
            "000111111110000",
            "000011111100000",
            "000001111000000",
            "000000110000000",
        ],
    ],
};

// Converte as strings em matrizes booleanas para facilitar a validação posterior.
const PUZZLES = Object.fromEntries(
    Object.entries(RAW_PUZZLES).map(([key, puzzles]) => [
        key,
        puzzles.map((rows) => rows.map((row) => row.split("").map((cell) => cell === "1"))),
    ])
);

document.addEventListener("DOMContentLoaded", () => {
    // Resgata todos os elementos que o jogo manipula.
    const boardElement = document.getElementById("nonogram-board");
    if (!boardElement) {
        return;
    }

    const elements = {
        board: boardElement,
        columnHints: document.getElementById("col-hints"),
        rowHints: document.getElementById("row-hints"),
        difficulty: document.getElementById("dificuldade"),
        newGame: document.getElementById("novo-jogo"),
        clear: document.getElementById("limpar-tabuleiro"),
        verify: document.getElementById("verificar"),
        modeButtons: Array.from(document.querySelectorAll(".marcador")),
        message: document.getElementById("game-message"),
        wrapper: document.querySelector(".nonogram-wrapper"),
        gameContainer: document.querySelector(".game-container"),
        timer: document.getElementById("timer"),
        errors: document.getElementById("errors"),
    };

    // Estado central do jogo (dificuldade, puzzle atual, tabuleiro e interações).
    const state = {
        difficulty: "5x5",
        puzzleIndex: -1,
        solution: [],
        board: [],
        cells: [],
        mode: "fill",
        drag: {
            active: false,
            mode: "fill",
            applyState: null,
        },
        timerInterval: null,
        startTime: 0,
        elapsedTime: 0,
        isPlaying: false,
    };

    attachListeners();
    initializeGame();

    function initializeGame() {
        // Garante que o seletor reflita a dificuldade inicial e gera um puzzle.
        if (elements.difficulty.value !== state.difficulty) {
            elements.difficulty.value = state.difficulty;
        }
        loadNewPuzzle();
        setActiveModeButton(state.mode);
    }

    function attachListeners() {
        // Troca de dificuldade e geração de novos puzzles.
        elements.difficulty.addEventListener("change", (event) => {
            const chosen = event.target.value;
            if (!PUZZLES[chosen]) {
                updateMessage("Selecione uma dificuldade válida.", "danger");
                return;
            }
            state.difficulty = chosen;
            loadNewPuzzle(true);
        });

        elements.newGame.addEventListener("click", () => loadNewPuzzle(true));
        elements.clear.addEventListener("click", () => clearBoard());
        elements.verify.addEventListener("click", () => verifyBoard());

        // Seleção de modo (preencher ou cruz) por botão.
        elements.modeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const mode = button.dataset.mode;
                state.mode = mode;
                setActiveModeButton(mode);
            });
        });

        // Eventos globais de arraste e redimensionamento.
        document.addEventListener("mouseup", endDrag);
        window.addEventListener("resize", handleResize);
    }

    function loadNewPuzzle(forceNewIndex = false) {
        // Escolhe puzzle, constrói tabuleiro, recalcula dicas e limpa o estado visual.
        const { grid, index } = pickPuzzle(state.difficulty, forceNewIndex ? state.puzzleIndex : -1);
        state.solution = grid;
        state.puzzleIndex = index;
        buildBoard(grid.length);
        const hints = computeHints(grid);
        renderRowHints(hints.rows);
        renderColumnHints(hints.columns);
        clearBoard(true);
        
        resetTimer();
        // startTimer(); // Removido para iniciar apenas no primeiro clique
        resetErrors();
        
        updateMessage("Novo desafio criado!", "info");
    }

    function pickPuzzle(difficulty, excludeIndex) {
        // Sorteia um puzzle evitando repetir o anterior quando possível.
        const pool = PUZZLES[difficulty];
        if (!pool || pool.length === 0) {
            throw new Error(`Nenhum desafio configurado para ${difficulty}`);
        }
        let index = Math.floor(Math.random() * pool.length);
        if (excludeIndex >= 0 && pool.length > 1 && index === excludeIndex) {
            index = (index + 1) % pool.length;
        }
        return { grid: pool[index], index };
    }

    function buildBoard(size) {
        // Cria a grade do tabuleiro e associa listeners de interação por célula.
        elements.board.innerHTML = "";
        elements.board.style.gridTemplateColumns = `repeat(${size}, var(--nonogram-cell-size))`;
        state.board = Array.from({ length: size }, () => Array(size).fill("empty"));
        state.cells = Array.from({ length: size }, () => Array(size).fill(null));

        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                const cell = document.createElement("button");
                cell.className = "cell";
                cell.type = "button";
                cell.dataset.row = row;
                cell.dataset.col = col;
                addGridMarkers(cell, row, col, size);
                cell.addEventListener("mousedown", (event) => {
                    if (event.button === 0) {
                        event.preventDefault();
                        beginDrag(row, col, state.mode);
                    } else if (event.button === 2) {
                        event.preventDefault();
                        beginDrag(row, col, "cross");
                    }
                });
                cell.addEventListener("mouseenter", () => {
                    if (state.drag.active) {
                        applyDrag(row, col);
                    }
                });
                cell.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                });
                elements.board.appendChild(cell);
                state.cells[row][col] = cell;
            }
        }

        updateResponsiveSizing(size);
    }

    function addGridMarkers(cell, row, col, size) {
        // Destaca divisões de 5x5 para facilitar leitura visual.
        if (row % 5 === 0) {
            cell.classList.add("cell--bold-top");
        }
        if ((row + 1) % 5 === 0 || row === size - 1) {
            cell.classList.add("cell--bold-bottom");
        }
        if (col % 5 === 0) {
            cell.classList.add("cell--bold-left");
        }
        if ((col + 1) % 5 === 0 || col === size - 1) {
            cell.classList.add("cell--bold-right");
        }
    }

    function handleCellInteraction(row, col, mode, forcedState = null) {
        // Define qual estado aplicar em uma célula considerando cliques ou arrastes.
        const next = forcedState ?? getNextState(row, col, mode);
        setCellState(row, col, next);
    }

    function getNextState(row, col, mode) {
        // Alterna o estado da célula baseado no modo atual (preencher ou cruz).
        const current = state.board[row][col];
        if (mode === "fill") {
            return current === "filled" ? "empty" : "filled";
        }
        if (mode === "cross") {
            return current === "cross" ? "empty" : "cross";
        }
        return current;
    }

    function setCellState(row, col, value) {
        // Persiste o estado lógico e reflete o visual.
        if (state.board[row][col] === value) {
            syncCellAppearance(row, col);
            return;
        }
        state.board[row][col] = value;
        syncCellAppearance(row, col);
    }

    function beginDrag(row, col, mode) {
        // Inicia o timer no primeiro clique/interação
        startTimer();

        // Quando o usuário pressiona, começamos a arrastar e salvar o estado a aplicar.
        const nextState = getNextState(row, col, mode);
        state.drag.active = true;
        state.drag.mode = mode;
        state.drag.applyState = nextState;
        handleCellInteraction(row, col, mode, nextState);
    }

    function applyDrag(row, col) {
        // Aplica o mesmo estado para todas as células atravessadas durante o arraste.
        if (!state.drag.active || state.drag.applyState === null) {
            return;
        }
        handleCellInteraction(row, col, state.drag.mode, state.drag.applyState);
    }

    function endDrag() {
        // Finaliza o arraste ao soltar o botão do mouse.
        state.drag.active = false;
        state.drag.applyState = null;
    }

    function syncCellAppearance(row, col) {
        // Ajusta classes e texto da célula conforme o estado lógico.
        const cell = state.cells[row][col];
        const currentState = state.board[row][col];
        cell.classList.toggle("cell--filled", currentState === "filled");
        cell.classList.toggle("cell--cross", currentState === "cross");
        cell.textContent = currentState === "cross" ? "×" : "";
    }

    function clearBoard(skipMessage = false) {
        // Reseta todas as células para vazio.
        for (let row = 0; row < state.board.length; row += 1) {
            for (let col = 0; col < state.board[row].length; col += 1) {
                state.board[row][col] = "empty";
                syncCellAppearance(row, col);
            }
        }
        if (!skipMessage) {
            updateMessage("Tabuleiro limpo.", "info");
        }
    }

    function verifyBoard() {
        // Percorre o tabuleiro verificando erros e células faltantes.
        let errorCount = 0;
        let hasEmpty = false;

        for (let row = 0; row < state.solution.length; row += 1) {
            for (let col = 0; col < state.solution[row].length; col += 1) {
                const shouldFill = state.solution[row][col];
                const played = state.board[row][col];

                if (shouldFill) {
                    if (played === "filled") {
                        continue;
                    }
                    if (played === "cross") {
                        errorCount++;
                    } else {
                        hasEmpty = true;
                    }
                } else if (played === "filled") {
                    errorCount++;
                }
            }
        }

        updateErrorDisplay(errorCount);

        if (errorCount === 0 && !hasEmpty) {
            stopTimer();
            updateMessage("Parabéns! Você completou o nonogram.", "success");
            return;
        }

        if (errorCount > 0) {
            updateMessage(`Existem ${errorCount} marcações incorretas. Tente novamente!`, "danger");
        } else {
            updateMessage("Você está no caminho certo, mas ainda faltam células!", "info");
        }
    }

    function computeHints(grid) {
        // Gera as dicas horizontais e verticais a partir da solução.
        const rows = grid.map((row) => buildHints(row));
        const columns = [];
        for (let col = 0; col < grid[0].length; col += 1) {
            const column = grid.map((row) => row[col]);
            columns.push(buildHints(column));
        }
        return { rows, columns };
    }

    function buildHints(line) {
        // Agrupa sequências contínuas de células preenchidas em números.
        const hints = [];
        let count = 0;
        line.forEach((value) => {
            if (value) {
                count += 1;
            } else if (count > 0) {
                hints.push(count);
                count = 0;
            }
        });
        if (count > 0) {
            hints.push(count);
        }
        if (hints.length === 0) {
            hints.push(0);
        }
        return hints;
    }

    function renderRowHints(rows) {
        // Renderiza o bloco de dicas de cada linha.
        elements.rowHints.innerHTML = "";
        elements.rowHints.style.gridTemplateRows = `repeat(${rows.length}, var(--nonogram-cell-size))`;
        rows.forEach((rowHint) => {
            const block = document.createElement("div");
            block.className = "hint-block hint-block--row";
            rowHint.forEach((hint) => {
                const hintLine = document.createElement("span");
                hintLine.textContent = hint;
                block.appendChild(hintLine);
            });
            elements.rowHints.appendChild(block);
        });
    }

    function renderColumnHints(columns) {
        // Renderiza o bloco de dicas de cada coluna.
        elements.columnHints.innerHTML = "";
        elements.columnHints.style.gridTemplateColumns = `repeat(${columns.length}, var(--nonogram-cell-size))`;
        columns.forEach((columnHint) => {
            const block = document.createElement("div");
            block.className = "hint-block hint-block--col";
            columnHint.forEach((hint) => {
                const hintLine = document.createElement("span");
                hintLine.textContent = hint;
                block.appendChild(hintLine);
            });
            elements.columnHints.appendChild(block);
        });
    }

    function setActiveModeButton(mode) {
        // Indica visualmente qual modo está ativo.
        elements.modeButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.mode === mode);
        });
    }

    function updateMessage(text, variant = "info") {
        // Mostra avisos para o jogador com a cor adequada.
        elements.message.textContent = text;
        elements.message.classList.remove("text-success", "text-danger", "text-info");
        const targetClass = variant === "success" ? "text-success" : variant === "danger" ? "text-danger" : "text-info";
        elements.message.classList.add(targetClass);
    }

    function handleResize() {
        // Recalcula tamanhos quando a janela muda de largura.
        if (!state.board.length) {
            return;
        }
        updateResponsiveSizing(state.board.length);
    }

    function updateResponsiveSizing(size) {
        // Ajusta dinamicamente o tamanho das células e da fonte das dicas.
        const wrapper = elements.wrapper;
        if (!wrapper || !size) {
            return;
        }

        const viewportWidth = window.innerWidth || 0;
        const container = elements.gameContainer ?? wrapper.parentElement ?? wrapper;
        const availableWidth = Math.max(container.clientWidth || viewportWidth || 0, 240);
        const wrapperPadding = getHorizontalPadding(wrapper);
        const gap = getGridGap(wrapper);

        let { cell } = pickSizingPreset(size, viewportWidth);
        const totalGap = gap * (size + 1);
        const effectiveWidth = availableWidth - wrapperPadding - 4; // small buffer
        const columnsIncludingHints = size + 1.25; // board + hint column (with extra buffer for wider hints)
        const requiredWidth = cell * columnsIncludingHints + totalGap;

        if (requiredWidth > effectiveWidth) {
            const fitted = Math.floor((effectiveWidth - totalGap) / columnsIncludingHints);
            cell = Math.max(14, fitted);
        }

        const hintFont = calcHintFontSize(cell);

        document.body.dataset.nonogramSize = String(size);
        wrapper.style.setProperty("--nonogram-cell-size", `${cell}px`);
        wrapper.style.setProperty("--nonogram-hint-font-size", `${hintFont}rem`);
    }

    function pickSizingPreset(size, viewportWidth) {
        // Usa presets para manter legibilidade em diferentes tamanhos de grid e telas.
        if (size >= 15) {
            if (viewportWidth <= 360) return { cell: 21 };
            if (viewportWidth <= 480) return { cell: 23 };
            if (viewportWidth <= 768) return { cell: 26 };
            return { cell: 32 };
        }
        if (size >= 10) {
            if (viewportWidth <= 360) return { cell: 28 };
            if (viewportWidth <= 480) return { cell: 32 };
            if (viewportWidth <= 768) return { cell: 36 };
            return { cell: 40 };
        }
        if (viewportWidth <= 360) return { cell: 40 };
        if (viewportWidth <= 480) return { cell: 45 };
        if (viewportWidth <= 768) return { cell: 50 };
        return { cell: 55 };
    }

    function calcHintFontSize(cell) {
        // Mantém a tipografia proporcional ao tamanho das células.
        const normalized = cell / 36;
        return Math.max(0.6, Math.min(1.4, normalized));
    }

    function getHorizontalPadding(element) {
        // Soma paddings horizontais para calcular o espaço disponível real.
        const styles = window.getComputedStyle(element);
        const left = parseFloat(styles.paddingLeft) || 0;
        const right = parseFloat(styles.paddingRight) || 0;
        return left + right;
    }

    function getGridGap(element) {
        // Lê o gap da grid CSS para ajustar o cálculo de largura.
        const styles = window.getComputedStyle(element);
        const gap = parseFloat(styles.columnGap || styles.gap) || 0;
        return gap;
    }

    function startTimer() {
        if (state.isPlaying) return;
        state.isPlaying = true;
        state.startTime = Date.now() - state.elapsedTime;
        state.timerInterval = setInterval(() => {
            state.elapsedTime = Date.now() - state.startTime;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        state.isPlaying = false;
        clearInterval(state.timerInterval);
    }

    function resetTimer() {
        stopTimer();
        state.elapsedTime = 0;
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const totalSeconds = Math.floor(state.elapsedTime / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        if (elements.timer) {
            elements.timer.textContent = `${minutes}:${seconds}`;
        }
    }

    function resetErrors() {
        updateErrorDisplay(0);
    }

    function updateErrorDisplay(count) {
        if (elements.errors) {
            elements.errors.textContent = count;
        }
    }
});
