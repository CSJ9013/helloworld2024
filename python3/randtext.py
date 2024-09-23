# 만약 배민에서 음식을 고르려 하는데
# 선택하기 힘들어 메뉴 추천 기능을 이용
# 치킨, 피자, 김밥, 국밥, 탕수육, 짜장면
import random
print(random.random())
menu = "치킨", "피자", "김밥", "탕수육"
print(random.choice(menu))

import requests
from bs4 import BeautifulSoup

# 웹 접속
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get("https://www.melon.com/", headers=headers)
print(data) # 접속이 잘 됐는 지 확인

# html 정보 가져오기
soup = BeautifulSoup(data.text, 'html.parser')
 
# 가져온 html 정보 출력 / 주석처리 이유는 밑에 타이틀을 출력 중이기에
# print(soup)

#멜론 차트 1위 제목 크롤링
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.melon.com/chart/',headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
title = soup.select_one('#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a ')

print(title)

# 제목만 가져오기
print(title.text)