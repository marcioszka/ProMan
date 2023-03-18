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
                    <span class="board-title" data-board-id=${board.id}>${board.title}</span>
                    <input class="add-column-button submit1" data-board-id=${board.id} type="submit" value="Add column">
                    <input class="add-card-button submit1" data-board-id=${board.id} type="submit" value="Add card">
                    <button class="delete-board-button" data-board-id=${board.id} onclick="location.reload()">🗑️</button>
                </section>
                <div class="board-columns" data-board-id=${board.id} style="display: none">
                    
                <div class="columns-in-boards" data-board-id=${board.id}>
                    <div class="board-column-1" data-board-id=${board.id}>
                        <div class="board-column-header"><div class="board-column-title" data-board-id=${board.id}>New</div></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-header"><div class="board-column-title" data-board-id=${board.id}>In progress</div></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-header"><div class="board-column-title" data-board-id=${board.id}>Testing</div></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    <div class="board-column" data-board-id=${board.id}>
                        <div class="board-column-header"><div class="board-column-title" data-board-id=${board.id}>Done</div></div>
                        <div class="board-column-cards" data-board-id=${board.id}></div>
                    </div>
                    </div>
                </div>`;
}

function cardBuilder(card) {
    return `<div class="card"><button class="delete-card-button" data-id=${card.id} onclick="location.reload()">🗑️</button><div class="card-title" data-id="${card.id}" contentEditable='true' data-status-id=${card.status_id}>${card.title}</div>

</div>`;
}

function inputPanelBuilder(){
    return `<div id="input-box"><input type="text" required><input class="save-data submit1" value="Save" type="submit" onclick="location.reload()">
            </div>`
}
function inputFieldBuilder(title){
    return `<div class="input-box"><input type="text" placeholder="${title}" required></div>`
}

function saveButtonBuilder(){
    return `<input class="save-data submit1" value="Save" type="submit" onclick="location.reload()">`
}

function columnBuilder(column) {
    return `<div class="board-column" data-board-id=${column.board_id} data-id="${column.id}">
            <div class="board-column-header">
            <div class="board-column-title" data-id="${column.id}" data-board-id=${column.board_id}>${column.title}</div>
            <button class="delete-column-button" data-board-id=${column.board_id} onclick="location.reload()">🗑️</button>
            </div>
            <div class="board-column-cards" data-board-id=${column.board_id}></div>
            </div>
            `
}
