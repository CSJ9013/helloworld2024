# 네이버 검색 API 예제 - 블로그 검색
import os
import sys
import urllib.request
# 파이썬 업데이트 오류로 추가할 소스 코드
import ssl
# json 활용
import json

def blog(keyword) :
    ssl._create_default_https_context = ssl._create_unverified_context
    # api 코드는 커밋 제외
    client_id = "아이디 키 기입"
    client_secret = "시크릿 기입"
    encText = urllib.parse.quote(keyword)
    url = "https://openapi.naver.com/v1/search/blog?query=" + encText # JSON 결과
    # url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        # print(response_body.decode('utf-8')) # = 원래 있던 거에 대한 주석 처리, ## = 추가한 거에 대한 주석 처리
        # 밑엔 새로 쓴 거
        res = response_body.decode('utf-8')
        print(type(res)) # 자료형(data type) 확인
        dic_res = json.loads(res) # json 문자열을 파이썬에 딕셔너리 자료형으로 변경(load 대신 loads 서야 함)
        print(type(dic_res))
        ## print(dic_res['items'])
        return dic_res['items'] # 대괄호는 리스트, 중괄호는 딕셔너리
    else:
        print("Error Code:" + rescode)