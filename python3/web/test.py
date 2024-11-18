#갑분 함수 배우기 / 밑엔 함수
def hello(msg) :
    ## print("hello world")
    ## 밑처럼 해야지 "hello 검색어" 출력, 위처럼 쓰면 hello world 출력
    #print(f"hello {msg}")
    # return "출력" # 결과값(있어도 없어도 괜찮음, 출력이니)
    return f"hello {msg}"

# 함수 부르기
## hello("검색어")
keyword = input("맛집 검색 : ") # 입력창에 입력 받기
# 입력 받은 값을 keyword에 저장, 입력 받은 데이터를 hello 함수에 입력값으로 넣기
result = hello(keyword) # 위 함수에서 전달된 값을 result에 전달
print(result) # 전달된 값 화면에 출력

# 24 11 18 딕셔너리 및 리스트 구분
def hello2() :
    menu = ["짜장면", "김밥", "라면"] # 대괄호 리스트
    dmenu = {"메뉴": "짜장면", "가격": 5000} # 중괄호 딕셔너리
    return menu

# menu = hello2()
# print(menu)
# for m in menu:
#     print(m)