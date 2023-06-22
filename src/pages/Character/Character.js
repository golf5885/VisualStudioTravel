import React from 'react';
import { Link } from 'react-router-dom';
import Guide from './Guide';
import '../../App.css';
import '../../css/Character.css';
import '../../css/Home.css';
import test from '../../icons/test.gif';

function Character() {
  const characters = [
    { name: '민성우',
    style: '오기 전 철저한 계획을 세웠으며 역사와 문화에 대한 깊은 관심을 가지고 있다. 파리의 아름다운 건축물과 예술 작품을 즐기며, 역사적인 장소와 음식을 탐험하며 독특한 경험을 추구한다.', 
    mbti : "ENTJ", 
    money: "Old and Rich",
    img_url: 'https://w7.pngwing.com/pngs/390/806/png-transparent-rilakkuma-kakaotalk-kakao-friends-south-korea-kakaofriends-sticker-desktop-wallpaper-snout-thumbnail.png' },

    { name: '박유찬',
    style: "즉흥적이고 P 성향을 가진 20대 학생이다. 유럽 여행이 처음이라서 굉장히 설레함. 혼자 배낭여행중인 만큼, 자금이 여유롭지 못하고 유명 관광지만 빠르게 도장 찍고 싶어 한다.",
    mbti : "ESTP",
    money: "Young and Poor",
    img_url: 'https://e7.pngegg.com/pngimages/982/1017/png-clipart-kakaotalk-kakao-friends-sticker-line-ryan-smiley-sticker.png' },

    { name: '서우석',
    style: '신중하고 현실적인 성향을 가진 여행자이다. 가족과 함께 방문할 예정이며, 안정적인 여행을 선호한다. 파리의 아름다운 전망을 즐기고, 가족과 시간을 즐기며 휴식과 재충전하고 싶어한다.',
    mbti : "ISFJ",
    money: "Young and Rich",
    img_url: test },
  ];

  return (
    <div className="background-color">
      <div className="many_guides">
        <div className="card-row">
          {characters.map((character) => (
            <Link key={character.name} to={`/${character.name}/map`} className="guide">
              <div className="card">
                <img className="character-img" src={character.img_url} alt={character.name} />
                <div className="character-info">
                  <h2>{character.name}</h2>
                  <p>{character.style}</p>
                  <p>MBTI : {character.mbti}</p>
                  <p>MONEY : {character.money}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Character;