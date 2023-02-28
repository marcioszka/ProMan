export const htmlTemplates = {
    board: 1,
    card: 2,
    inputBox: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.inputBox]: inputBoxBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board-header" data-board-id=${board.id}>
                    <button id="delete-board-button" class="delete-board">🗑️</button>
                    <span class="board-title" data-board-id=${board.id}>${board.title}</span>
                    <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                </section>
                <div class="board-columns" id="board-columns" style="display: none">
                    <input id="add-column-button" class="add-column" type="button" type="submit" value="Add column">
                    <div class="board-column"><div class="board-column-title">New</div><div class="board-column-cards"></div></div>
                    <div class="board-column"><div class="board-column-title">In progress</div><div class="board-column-cards"></div></div>
                    <div class="board-column"><div class="board-column-title">Testing</div><div class="board-column-cards"></div></div>
                    <div class="board-column"><div class="board-column-title">Done</div><div class="board-column-cards"></div></div>
                </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

function inputBoxBuilder(){
    return `<div id="input-box"><input type="text" placeholder="Board name" required>
            <input type="button" class="save-data" value="Save" type="submit"></div>`
}
