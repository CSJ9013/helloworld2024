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

# 메인페이지에서 순위 출력
for i in range(1,11) :
    title = soup.select_one(f'#conts > div.chart > div > ul > li.on.nth1 > div > ul > li:nth-child({i}) > div.rank_cntt > div.rank_info > p > a')
    print(f'{i}위 {title.text}')

# 멜론 차트 1위 제목 크롤링
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.melon.com/chart/',headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
# 하나만 출력, select_one
title = soup.select_one('#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a')

# 노래 제목
#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a
# 가수 이름
#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank02 > a

print(title)

# 제목만 가져오기
print(title.text)

# 여러개 출력
title = soup.select('#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a')
for t in title : 
    print(t.text)

# 전문적 출력
top_100 = soup.select('#lst50 > td > div')

# tr로 이루어진 list
for tr in top_100 :
    rank = tr.select_one('span.rank')
        
    if rank is not None:
        print(rank.text, end=". ")
        
    title = tr.select_one('div > div.ellipsis.rank01 > span > a')
    
    if title is not None:
        artist = tr.select_one('div.ellipsis.rank02 > a').text
        print(artist,'-', title.text)