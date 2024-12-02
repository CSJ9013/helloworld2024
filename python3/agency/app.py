# python3 -m venv env
# pip install flask
# pip install --upgrade pip
# source myenv/bin/activate
# 위에 입력해 env 및 플라스크 설치 필요 (env 제거함)

from flask import Flask, request, render_template
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/index')
def indexhtml():
    return render_template("index.html")

@app.route('/method', methods=['GET', 'POST'])
def method():
    if request.method == 'GET':
        return "GET으로 전달"
    else:
        return "POST로 전달"

if __name__ == '__main__':
    app.run(debug=True)