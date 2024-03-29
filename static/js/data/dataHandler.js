export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        //return apiGet(`/api/boards/${boardId}`)
    },
    getStatuses: async function (boardId) {
        // the statuses are retrieved and then the callback function is called with the statuses
        return apiGet(`/api/boards/${boardId}/get-statuses`)
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
        return apiGet(`/api/get-statuses/${statusId}`)
    },
    getCardsByBoardId: async function (boardId, columnId) {
        return await apiGet(`/api/boards/${boardId}/${columnId}/cards`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        return await apiPost('/api/boards/new_board', { body: {"title": boardTitle}})
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        //const userId = document.getElementById('user-id');
        return await apiPost(`/api/boards/${boardId}/cards/new_card`, {body: {"title": cardTitle, "board_id": boardId, "status_id": statusId}}) //"user_id": userId
    },
    deleteBoard: async function (boardId) {
        return await apiDelete(`/api/boards/${boardId}`, {boardId:boardId});
    },
    capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    },
    setColumnName: async function (columnTitle, boardId){
        const title = columnTitle.toLowerCase();
        const titleUpperFirst = this.capitalizeFirstLetter(columnTitle)
        return await apiPost(`/api/statuses`, {body:{"title": titleUpperFirst, "board_id": boardId}})
    },
    renameBoard: async function (boardTitle, boardId){
        return await apiPut(`/api/boards/new_name`, {body: {"id": boardId, "title": boardTitle}})
    },
    renameColumn: async function (columnId, columnTitle){
        return await apiPut(`/api/statuses/new_name`, {body: {"id": columnId, "title": columnTitle}})
    },
    addColumn: async function (columnTitle){
        return await apiPost(`/api/boards/new_column`, {body:{"title": columnTitle}})
    },
    deleteColumn: async function(columnTitle, boardId){
        return await apiDelete(`/api/statuses/delete_status`, {body: {"title":columnTitle, "board_id": boardId}})
    },
    deleteCard: async function (cardId) {
        return await apiDelete(`/api/cards/delete_card/${cardId}`, {cardId:cardId});
    },
    renameCard: async function (cardTitle, cardId){
        return await apiPut(`/api/cards/rename_card/${cardId}`, {body: {"id": cardId, "title": cardTitle}})
    },
    changeCardStatus: async function (cardId, cardStatus) {
        let data = {'status_id': cardStatus}
        return await apiPut(`/api/change_card_status/${cardId}`, {body: data})
    },

    changeCardOrder: async function (cardId, cardOrder) {
        let data = {'card_id': cardId, 'order_status': cardOrder}
        return await apiPut('/api/change_card_order', {body: data})
    },

    changeCardsOrder: async function (cardStatus, cardOrder, boardId, status) {
        let data = {'card_status': cardStatus, 'order_status': cardOrder, 'board_status': boardId, 'status': status}
        return await apiPut('/api/change_card_order', {body: data})
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

export async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiDelete(url, payload) {
    let response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if (response.ok){
        return await response.json();
    }
}

async function apiPatch(url) {
}