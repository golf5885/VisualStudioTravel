import React from 'react';
import { Link } from 'react-router-dom';
import Guide from './Guide';
import '../../App.css';
import '../../css/Character.css';
import '../../css/Home.css';
import test from '../../icons/test.gif';

function Character() {
  const characters = [
    { name: '민성우', style: '먹는 것에 돈을 아끼지 않는다.', img_url: 'https://w7.pngwing.com/pngs/390/806/png-transparent-rilakkuma-kakaotalk-kakao-friends-south-korea-kakaofriends-sticker-desktop-wallpaper-snout-thumbnail.png' },
    { name: '박유찬', style: "ESFP 굉장히 즉흥적이고 P 성향을 가진 20대 연세대 학생. 유럽 여행이 처음이라서 굉장히 설레함. ", img_url: 'https://e7.pngegg.com/pngimages/982/1017/png-clipart-kakaotalk-kakao-friends-sticker-line-ryan-smiley-sticker.png' },
    { name: '서우석', style: '현지인들과 어울리기를 좋아한다.', img_url: test },
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