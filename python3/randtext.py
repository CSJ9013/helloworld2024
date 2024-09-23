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
r = requests.get("https://www.melon.com/", headers=headers)
print(r) # 접속이 잘 됐는 지 확인

# html 정보 가져오기
soup = BeautifulSoup(r.text, 'html.parser')
 
print(soup) # 가져온 html 정보 출력