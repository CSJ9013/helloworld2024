# 네이버 검색 활용
import nvapi

# keyword = input("검색 : ")
# nvapi.blog(keyword)

keyword = "경성대 밥장인"
data = nvapi.blog(keyword)
for b in data:
    print(b["title"]) # title 작성 시 타이틀만 가지고 옴