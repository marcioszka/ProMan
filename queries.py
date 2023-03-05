import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE id = %(status_id)s
        ;
        """
        , {"status_id": status_id}
    )


def get_board_statuses(board_id):
    return data_manager.execute_select(
        """
        SELECT statuses.id, statuses.title 
        FROM statuses
        JOIN cards c on statuses.id = c.status_id
        JOIN boards b on b.id = c.board_id
        WHERE b.id = ${board_id}s
        ;
        """
        , {"board_id": board_id}
    )


def get_board(title):
    return data_manager.execute_select(
        """
        SELECT title FROM boards WHERE title=%(title)s
        ;
        """
    )


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_private_boards(user_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards WHERE user_id IS NULL OR user_id=%(user_id)s
        ;
        """, {'user_id': user_id}
    )


def get_public_boards():
    return data_manager.execute_select(
        """SELECT * FROM boards WHERE user_id IS NULL;"""
    )


def add_board(title):
    return data_manager.execute_update(
        """
        INSERT INTO boards (title) VALUES (%(title)s)
        """, {'title': title}
    )


def add_private_board(user_id, title):
    return data_manager.execute_update(
        """
        INSERT INTO boards (title, user_id) VALUES (%(title)s, %(user_id)s)
        """, {'title': title, 'user_id': user_id}
    )


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_user(username, password):
    new_user = data_manager.execute_select(
        'INSERT INTO users (username, password) VALUES (%(username)s, %(password)s) RETURNING id',
        {'username': username, 'password': password})
    return new_user


def get_user_password(username):
    user_data = data_manager.execute_select('SELECT password FROM users WHERE username=%(username)s',
                                            {'username': username}, fetchall=False)
    return user_data['password']


def get_user_id(username):
    user_data = data_manager.execute_select('SELECT id FROM users WHERE username=%(username)s', {'username': username},
                                            fetchall=False)
    return user_data['id']


def get_board(id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards WHERE id=%(id)s;
        """, {'id': id}
    )


def delete_board(board_id):
    data_manager.execute_update(
        """
        DELETE 
        FROM boards
        WHERE id = %(board_id)s
        """,
        {'board_id': board_id}
    )


def delete_cards(board_id):
    data_manager.execute_update(
        """
        DELETE 
        FROM cards
        WHERE board_id = %(board_id)s
        """,
        {'board_id': board_id}
    )


def add_column(title):
    data_manager.execute_update(
        """
            INSERT INTO statuses (title)
            VALUES (%(title)s);
            """,
        {'title': title}
    )


def update_board_name(id, title):
    data_manager.execute_update(
        """
            UPDATE boards
            SET title = %(title)s
            WHERE id = %(id)s;
        """,
        {'id': id, 'title': title}
    )


def get_status_id(title):
    return data_manager.execute_select(
        """
         SELECT id 
         FROM statuses 
         WHERE title=%(title)s
         """, {'title': title}, fetchall=False)


def get_all_cards():
    return data_manager.execute_select(
        """
        SELECT * FROM cards
        ;
        """
    )




def delete_card(card_id):
    return data_manager.execute_update(
        """
        DELETE
        FROM cards
        WHERE id = %(card_id)s
        returning id
        """,
        {'card_id': card_id}
    )


def create_card(data, status_id):
    return data_manager.execute_update(
        """
        INSERT INTO cards (board_id, status_id, title, card_order) 
        VALUES (%(board_id)s, %(status_id)s, %(title)s, %(card_order)s)
        """,
        {'board_id': data['board_id'],
         'status_id': status_id,
         'title': data['title'],
         'card_order': data['card_order']}
    )

# def add_card(board_id, status_id, title, user_id):
#     return data_manager.execute_select(
#         """
#         INSERT INTO cards (board_id, status_id, title, card_order, user_id) VALUES (%(board_id)s, %(status_id)s, %(title)s, 1, %(user_id)s)
#         RETURNING id""", {'title': title, 'board_id': board_id, 'user_id': user_id, 'status_id': status_id}, fetchall=False
#     )

def add_card(board_id, status_id, title):
    return data_manager.execute_select(
        """
        INSERT INTO cards (board_id, status_id, title, card_order) VALUES (%(board_id)s, %(status_id)s, %(title)s, 1)
        RETURNING id""", {'title': title, 'board_id': board_id, 'status_id': status_id}, fetchall=False
    )