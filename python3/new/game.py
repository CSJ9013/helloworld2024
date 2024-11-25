import random

print('게임 스타트')
# 아이디어 생각 나는 대로 (기획)
# 오징어 게임 구슬 홀짝 맞추기
# 플레이어 구슬 20개
p_ball = int(20)
# 컴퓨터 구슬 20개
c_ball = int(20)
print('홀짝 게임')
print(f'플레이어 구슬 {p_ball}개') # 변수 출력문
print(f'컴퓨터 구슬 {c_ball}개')

# 반복문 for 조건 반복문 while
while True:
# while p_ball >= 0 or c_ball >= 0: # 갯수가 0이 아니면 (!=) 지속 -> (>=) 으로 수정 (잘 안됨) / tab으로 while문 안에 코드 넣기
    # 선공 랜덤 정하기
    p = 1 # 플레이어
    c = 2 # 컴퓨터
    r = random.randrange(1,3) # 1,7 한다면 1에서 6까지 나옴, 참여자 수에 맞게 숫자 선정 (파이썬 랜덤)
    # 정답 변수
    p_correct = "홀"
    # if 1이면 플레이어, else if 3면 컴퓨터 (파이썬 if문)
    if p == r:
        print('플레이어 선')
        # 플레이어의 구슬 갯수 입력
        number = int(input("구슬 갯수를 입력하세요 :")) # (int = 문자열을 숫자로 변경)
        if number%2 == 0: # (2로 나눠서 나오는 나머지가 0이면 짝수, 나머지가 존재하면 홀수)
            p_correct = "짝"
        else:
            p_correct = "홀"
        print(f"정답: {p_correct}")
        # input은 모든 입력을 문자로 인식하기에 주의
        # 컴퓨터 구슬 배팅
        c_bat = random.randrange(1, c_ball+1)
        print(f"컴퓨터가 배팅한 구슬 : {c_bat}")
        # 컴퓨터 정답 맞힐 차례
        c_correct = random.choice(['홀','짝'])
        print(f"컴퓨터 답: {c_correct}")
        # 답이 같으면 컴퓨터 승, 다르면 플레이어 승
        if p_correct == c_correct:
            print('컴퓨터 승')
            # 구슬 전달, 플레이어 구슬 줄어든 만큼 컴퓨터 구슬 증가
            p_ball = p_ball - c_bat
            c_ball = c_ball + c_bat
        else:
            print('플레이어 승')
            # 거꾸로 컴퓨터가 건 만큼 플레이어가 늘고 컴퓨터가 줄어듦 
            p_ball = p_ball + c_bat
            c_ball = c_ball - c_bat
        print(f"플레이어 구슬 갯수 : {p_ball}개")
        print(f"컴퓨터 구슬 갯수 : {c_ball}개")
        # 무한 반복 브레이크
        if c_ball <= 0:
            print("플레이어 최종 우승")
            break
        if p_ball <= 0:
            print("컴퓨터 최종 우승")
            break
    else:
        print('컴퓨터 선 (미완)')
    # 홀짝 정하기, 플레이어는 내가 & 컴퓨터는 컴퓨터가 결정
    # 정답 맞히기
    # 맞힌 상대 구슬 가져오기

    # 플레이 방식 = 구슬 거는 건 홀짝만 판별, 구슬 얻고 잃는 건 컴퓨터가 거는 구슬 갯수로 결정