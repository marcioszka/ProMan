export const htmlTemplates = {
    board: 1,
    card: 2,
    inputPanel: 3,
    column: 4,
    inputField: 5,
    button: 6
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.inputPanel]: inputPanelBuilder,
    [htmlTemplates.column]: columnBuilder,
    [htmlTemplates.inputField]: inputFieldBuilder,
    [htmlTemplates.button]: saveButtonBuilder
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
<!--                    <button class="toggle-board-button" data-board-id="${board.id}" onclick="location.reload()">Show Cards</button>-->
                </section>
                <div class="board-columns" data-board-id=${board.id} style="display: none">
                    <div class="columns-panel">
                    <br>
                        <input class="add-column-button submit1" data-board-id=${board.id} type="submit" value="Add column">
                        <input class="add-card-button submit1" data-board-id=${board.id} type="submit" value="Add card">
                    </div>
                    <div class="columns-in-boards">
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-title" data-board-id=${board.id}>New
                        <button class="delete-column-button" data-board-id=${board.id} onclick="location.reload()">🗑️</button></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-title" data-board-id=${board.id}>In progress
                        <button class="delete-column-button" data-board-id=${board.id} onclick="location.reload()">🗑️</button></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-title" data-board-id=${board.id}>Testing
                        <button class="delete-column-button" data-board-id=${board.id} onclick="location.reload()">🗑️</button></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-title" data-board-id=${board.id}>Done
                        <button class="delete-column-button" data-board-id=${board.id} onclick="location.reload()">🗑️</button></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    </div>
                </div>`;
}

function cardBuilder(cardId, cardTitle) {
    return `<div class="card" data-card-id="${cardId}">${cardTitle}</div>`;
}

function inputPanelBuilder(){
    return `<div id="input-box"><input type="text" required><input class="save-data submit1" value="Save" type="submit" onClick="location.reload()">
            </div>`
}
function inputFieldBuilder(title){
    return `<input type="text" placeholder="${title}" required>`
}

function saveButtonBuilder(){
    return `<input class="save-data submit1" value="Save" type="submit" onClick="location.reload()">`
}
//TODO
function columnBuilder(columnTitle, boardId) {
    return `<div class="board-column" data-board-id=${boardId}>
            <div class="board-column-title" data-board-id=${boardId}>${columnTitle}
            <button class="delete-column-button" data-board-id=${boardId} onclick="location.reload()">🗑️</button></div>
            <div class="board-column-cards" data-board-id=${boardId}></div>
            </div>
            `
}
