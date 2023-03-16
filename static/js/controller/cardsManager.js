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
                `.delete-card-button[data-id="${card.id}"]`,
                "click",
                deleteButtonHandler);
            domManager.addEventListener(`.card-title[data-id="${card.id}"]`,
                "click",
                renameCard);
        }
    },
};

function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.target.dataset.id;
    dataHandler.deleteCard(cardId);
}

function renameCard(clickEvent){
    clickEvent.stopPropagation();
    const oldName = clickEvent.target.innerText;
    clickEvent.target.style.display = "none";
    const newCardNameField = document.createElement('input');
    newCardNameField.setAttribute('id', 'change-column-name-box');
    newCardNameField.setAttribute('required', 'true');
    newCardNameField.setAttribute('placeholder', oldName);
    clickEvent.target.insertAdjacentElement('afterend', newCardNameField);
    domManager.addEventListener('#change-column-name-box',
        'keydown',
        handleKeyPress);
}

function handleKeyPress(keyEvent){
    keyEvent.stopPropagation();
    const newCardName = keyEvent.target.value;
    const cardId = parseInt(keyEvent.target.previousElementSibling.dataset.id);
    if(keyEvent.key === 'Enter')
    {
        dataHandler.renameCard(newCardName, cardId);
        location.reload();
    }
    else if (keyEvent.key === 'Escape'){
        location.reload();
    }
}