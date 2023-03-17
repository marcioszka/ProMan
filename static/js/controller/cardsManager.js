import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import{makeDroppable} from "./dragAndDrop.js"
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-cards[data-board-id="${boardId}"]`, content);
            makeDroppable.draggableCard();
            domManager.addEventListener(
                `.delete-card-button[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};

function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.target.dataset.cardId;
    dataHandler.deleteCard(cardId);
}
