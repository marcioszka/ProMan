export const htmlTemplates = {
    board: 1,
    card: 2,
    inputBox: 3,
    column: 4
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.inputBox]: inputBoxBuilder,
    [htmlTemplates.column]: columnBuilder
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
                    <button class="delete-board-button" data-board-id=${board.id} onclick="location.reload()">🗑️</button>
                    <span class="board-title" data-board-id=${board.id}>${board.title}</span>
                    <button class="toggle-board-button" data-board-id="${board.id}" onclick="location.reload()">Show Cards</button>
                </section>
                <div class="board-columns" data-board-id=${board.id} style="display: none">
                    <div class="columns-panel"><input class="add-column-button" data-board-id=${board.id} type="button" type="submit" value="Add column"></div>
                    <div class="board-column"><div class="board-column-title">New
                    <button class="delete-column-button" id="delete-column-button" onclick="location.reload()">🗑️</button></div>
                    <div class="board-column-cards"></div></div>
                    <div class="board-column"><div class="board-column-title">In progress
                    <button class="delete-column-button" id="delete-column-button" onclick="location.reload()">🗑️</button></div>
                    <div class="board-column-cards"></div></div>
                    <div class="board-column"><div class="board-column-title">Testing
                    <button class="delete-column-button" id="delete-column-button" onclick="location.reload()">🗑️</button></div>
                    <div class="board-column-cards"></div></div>
                    <div class="board-column"><div class="board-column-title">Done
                    <button class="delete-column-button" id="delete-column-button" onclick="location.reload()">🗑️</button></div>
                    <div class="board-column-cards"></div></div>
                </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}
// WERSJA 1
// function inputBoxBuilder(){
//     return `<div id="input-box"><input type="text" placeholder="Board name" required>
//             <input type="button" class="save-data" value="Save" type="submit" onclick="location.reload()"></div>`
// }

function inputBoxBuilder(){
    return `<div id="input-box"><input type="text" required>
            <input type="button" class="save-data" value="Save" type="submit" onclick="location.reload()"></div>`
}

function columnBuilder(columnTitle) {
    return `<div class="board-column">
            <div class="board-column-title">${columnTitle}
            <button class="delete-column-button" id="delete-column-button" onclick="location.reload()">🗑️</button></div>
            <div class="board-column-cards"></div>
            </div>
            `
}