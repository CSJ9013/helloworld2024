from flask import Flask, request, render_template
import nvapi

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
#GET 요청: 사용자가 URL에 직접 접근했을 경우
#POST 요청: 사용자가 폼을 제출한 경우
def method():
    # if, elif, else 순서
    if request.method == 'GET':
        return "폼을 통해 접근해 주시길 바랍니다."
    else:
        keyword = request.form["keyword"]
        print(keyword)
        data = nvapi.blog(keyword)
        # return f"POST로 전달된 입력어: {keyword}"
        return render_template("nvresult.html", keyword=keyword, blist=data)
    #else:
    #    num = request.form["num"]
    #    name = request.form["name"]
    #    return f"POST로 전달된 데이터({keyword})".format(num, name)

@app.route('/ytpage')
def ytpage():
    return render_template("ytpage.html")

@app.route('/ytresult', methods=['GET', 'POST'])
def ytresult():
    if request.method == 'GET':
        return "폼을 통해 접근해 주시길 바랍니다."
    else:
        keyword = request.form["keyword"]
        print(keyword)
        return render_template("youtube.html", data=keyword)

if __name__ == '__main__':
    app.run(host="0.0.0.0")