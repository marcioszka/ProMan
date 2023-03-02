from flask import Flask, render_template, redirect, request, url_for, session
from dotenv import load_dotenv
from util import json_response, hash_password, validate_user
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = 'b$2b$12$UqwJUUmOTIXVJ1NFd.UMg.'
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    user_id = session.get('id')
    if user_id:
        return queries.get_private_boards(user_id)
    else:
        return queries.get_public_boards()


@app.route("/api/boards/new_board", methods=['POST', 'GET'])
@json_response
def create_board():
    """
    Handle new board
    """
    data = request.get_json(force=True)
    content = data["body"]
    title = content["title"]
    user_id = session.get('id')
    if user_id:
        return queries.add_private_board(user_id, title)
    else:
        return queries.add_board(title)


@app.route("/api/boards/new_name", methods=['PUT'])
@json_response
def rename_board():
    data = request.get_json(force=True)
    content = data["body"]
    board_title = content["title"]
    board_id = content["id"]
    return queries.update_board_name(board_id, board_title)


@app.route("/api/boards/<int:board_id>", methods=['GET', 'DELETE'])
@json_response
def delete_board(board_id: int):
    """
    Deleting all boards.
    """
    queries.delete_cards(board_id)
    queries.delete_board(board_id)
    return request.get_json()


@app.route("/api/boards/new_column", methods=['POST', 'GET'])
@json_response
def add_column(column_title):
    return queries.add_column(column_title)


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password_to_hash = request.form.get('password')
        password = hash_password(password_to_hash)
        new_user = queries.add_user(username, password)
        if new_user:
            return redirect('/')
        else:
            return render_template("error.html")
    else:
        return render_template("registration_form.html")


@app.route("/login", methods=['GET', 'POST'])
def login():
    is_logged = False
    if request.method == 'POST':
        user_login = request.form.get("login")
        user_password = request.form.get("user_password")
        hashed_password = queries.get_user_password(user_login)
        is_logged = validate_user(user_password, hashed_password)
        if is_logged:
            session['user'] = user_login
            session['logged'] = True
            session['id'] = queries.get_user_id(user_login)
            return redirect('/')
        else:
            return render_template('error.html')
    elif request.method == 'GET':
        session.clear()
        return render_template('login_form.html')


@app.route("/logout")
def logout():
    session.clear()
    return redirect('/')


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/cards/")
@json_response
def get_all_cards():

    return queries.get_all_cards()


@app.route("/api/cards/delete_card/<int:card_id>", methods=['GET', 'DELETE'])
@json_response
def delete_card(card_id: int):
    return queries.delete_card(card_id)


@app.route("/api/new_card", methods=['GET', 'POST'])
@json_response
def create__card():
    data = {'title': "JESIENIARA", 'board_id': 4, 'card_order': 2}
    status_id = 2
    return queries.create_card(data, status_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
