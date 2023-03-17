import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {cardsManager} from "./cardsManager.js";

let dragged;
let oldDraggedStatus;
let oldCardOrder;
let boardId;
export const makeDroppable = {
    droppableBoards: function(){
        domManager.addEventListenerToMore(".board-column", 'dragover', makeDroppable.dragOver)
        domManager.addEventListenerToMore(".board-column", 'dragenter', makeDroppable.dragEnter)
        domManager.addEventListenerToMore(".board-column", 'dragleave', makeDroppable.dragLeave)
        domManager.addEventListenerToMore(".board-column", 'drop', makeDroppable.dragDrop)

    },
    draggableCard: function() {
        domManager.addEventListenerToMore(".card", 'dragstart', makeDroppable.dragStart)
        domManager.addEventListenerToMore(".card", 'dragend', makeDroppable.dragEnd)
        domManager.addEventListenerToMore(".card", 'dragover', makeDroppable.dragOver)
        domManager.addEventListenerToMore(".card", 'dragenter', makeDroppable.dragEnter)
        domManager.addEventListenerToMore(".card", 'dragleave', makeDroppable.dragLeave)
        domManager.addEventListenerToMore(".card", 'drop', makeDroppable.dragDrop)
    },
    dragStart: function(event){
        dragged = event.target;
        oldDraggedStatus = dragged.parentElement.parentElement.children[0].dataset.column
        oldCardOrder = dragged.dataset.cardOrder
        boardId = dragged.parentElement.parentElement.children[0].dataset.board
    },
    dragEnd: function(){

    },
    dragOver: function(e){
        e.preventDefault();

    },
    dragEnter: function(){

    },
    dragLeave: function(){

    },
    dragDrop: function(e){
        let cards = document.getElementsByClassName("card")
        e.preventDefault();
        let newCardStatus = e.currentTarget.parentElement.children[0].dataset.column
        let cardId = dragged.dataset.cardId
        dataHandler.changeCardStatus(cardId, newCardStatus)
        if (!e.target.draggable) { //ha üres oszlop
            e.currentTarget.appendChild(dragged);
            dataHandler.changeCardOrder(cardId, "1")
            dataHandler.changeCardsOrder(oldDraggedStatus, oldCardOrder, boardId, -1)
        }
        else if (!e.target.nextSibling) { //ha utolsó
            e.currentTarget.appendChild(dragged);
            dataHandler.changeCardOrder(cardId, parseInt(e.target.dataset.cardOrder)+1)
            dataHandler.changeCardsOrder(oldDraggedStatus, oldCardOrder, boardId, -1)
        }
        else {
            if (e.target !== dragged) {
                let currentpos = 0, droppedpos = 0;
                for (let it = 0; it < cards.length; it++) {
                    if (dragged === cards[it]) {
                        currentpos = it;
                    }
                    if (e.target === cards[it]) {
                        droppedpos = it;
                    }
                }
                if (currentpos < droppedpos) {
                    e.target.parentNode.insertBefore(dragged, e.target.nextSibling);
                    dataHandler.changeCardOrder(cardId, parseInt(e.target.dataset.cardOrder)+1)
                    dataHandler.changeCardsOrder(newCardStatus, e.target.dataset.cardOrder, boardId, 1)
                } else {
                    e.target.parentNode.insertBefore(dragged, e.target);
                    dataHandler.changeCardOrder(cardId, e.target.dataset.cardOrder)
                    dataHandler.changeCardsOrder(newCardStatus, e.target.dataset.cardOrder, boardId, 1)
                }
                dataHandler.changeCardsOrder(oldDraggedStatus, oldCardOrder, boardId, -1)

            }
        }
    },
};