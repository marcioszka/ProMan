import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-cards[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.delete-card-button[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getStatuses(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            domManager.addChild(`.columns-in-boards[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.delete-column-button[data-card-id="${column.id}"]`,
                "click",
                deleteColumnButtonHandler
            );
        }
    },
};

function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.target.dataset.cardId;
    dataHandler.deleteCard(cardId);
}

function deleteColumnButtonHandler(clickEvent) {
    const columnId = clickEvent.target.dataset.columnId;
    dataHandler.deleteColumn(columnId);
}