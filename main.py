from flask import Flask, render_template, redirect, request, url_for
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
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)

@app.route('/registration-form', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        return render_template("index.html")
        #username = request.form.get('username')
        #password_to_hash = request.form.get('password')
        #password = hash_password(password_to_hash)
        #new_user = queries.add_user(username, password)
        #if new_user > -1:
        #    return redirect('/')
        #else:
        #    return "Couldn't perform this task"
    elif request.method == 'GET':
        return render_template('registration-form.html')


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
