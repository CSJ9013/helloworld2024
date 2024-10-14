import requests
from bs4 import BeautifulSoup
import pandas as pd

# 웹 접속 및 데이터 가져오기
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.melon.com/chart/',headers=headers)
# html 정보 가져오기
soup = BeautifulSoup(data.text, 'html.parser')
# 순위 및 아티스트 정보 가져오기
# title = soup.select('#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a')
# artist = soup.select('#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank02 > a')
# 출력
# for i in range(0,50) :
    # print(f'{i+1}위 {title[i].text} - {artist[i].text}')

# 리스트 변수, rank = 1~100 까지를 담고 있는 리스트 (데이터)
rank = []
for i in range(1,101):
    rank.append(i)
print(rank)
# 제목 리스트 (데이터) 만들기
tlist = []
title = soup.select('div.ellipsis.rank01 > span > a')
for t in title:
    tlist.append(t.text)
# 가수 리스트 (데이터) 만들기
alist = []
artist = soup.select('div.ellipsis.rank02 > span > a:nth-child(1)')
for a in artist:
    alist.append(a.text)

# 키 & 리스트 생성 (순위, 제목, 가수 = 키) (rank, tlist, alist = 리스트)
df3 = pd.DataFrame({'순위': rank,
                    '제목': tlist,
                    '가수': alist})

df3.to_csv('melontop100.csv', index=False)