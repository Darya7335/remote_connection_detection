from flask import Flask, render_template, url_for, redirect, request
from get_database import *

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        user_id = request.form['id']
        session = request.form['session']
        new_session = [user_id, session]
        add_to_csv(new_session, 'session.csv')
        return redirect(url_for('login'))
    else:
        return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['nm']
        pswd = request.form['pswd']
        if pswd != '98Uu09rE2V7mUjptRtIs' or len(user) == 0:
            return redirect(url_for('login'))
        else:
            return redirect(url_for('quest'))
    else:
        return render_template('login.html')


@app.route('/quest', methods=['POST', 'GET'])
def quest():
    if request.method == 'POST':
        return redirect(url_for('index'))
    else:
        return render_template('quest.html')


@app.route('/stat', methods=['POST', 'GET'])
def stat():
    if request.method == 'POST':
        down = request.form["down"]
        up = request.form["up"]
        time = request.form["time"]
        action_type = request.form["type"]
        key_code = request.form["code"]
        x = request.form["x"]
        y = request.form["y"]
        user_agent = request.form["user_agent"]
        url = request.form["url"]
        user_id = read_last_string_csv('session.csv')[0]
        session = read_last_string_csv('session.csv')[1]
        data = [user_id, session, action_type, key_code, down, up, time, x, y, user_agent, url]
        add_to_csv(data, 'dataset_' + user_id + '.csv')
        return 'AAA!'


if __name__ == '__main__':
    app.run()
