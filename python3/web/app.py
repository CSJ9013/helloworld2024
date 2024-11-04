from flask import Flask, request, render_template
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/baseball')
# def = 파이썬 함수, 아무거나 작성 가능 그냥 안겹치는 걸로
def baseball():
    return 'Hello, baseball!'

@app.route('/youtube')
def youtube():
    return render_template("youtube.html")

@app.route('/search')
def search():
    return render_template("search.html")

@app.route('/method', methods=['GET', 'POST'])
def method():
    if request.method == 'GET':
        return "GET으로 전달"
    else:
        keyword = request.form["keyword"]
        print(keyword)
        return f"POST로 전달된 입력어: {keyword}"
    #else:
    #    num = request.form["num"]
    #    name = request.form["name"]
    #    return f"POST로 전달된 데이터({keyword})".format(num, name)

if __name__ == '__main__':
    app.run(host="0.0.0.0")