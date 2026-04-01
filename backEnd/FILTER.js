const final_keywords = [
  "캠프","청년","인턴","일자리","직무","취업","캠프","일경험","혁신","여성","미래",
  "노인","장년","신중년","뉴딜","평생","지역","참여자","기업","체험","온라인",
  "DX","맞춤형","인생","훈련","양성","전문","진로","상생","고용","노동","인재",
  "관광","취업","청년","중장년","노인","여성","인턴","캠프","교육","훈련",
  "역량강화","창업","스타트업","멘토링","아카데미","컨설팅","고용","정책",
  "프로그램","지원","참여","기업","지역","혁신","디지털","AI","SW","데이터",
  "전문인력","산업","프로젝트","박람회","연수","공모","사회공헌","운영"
];

// ===== 키워드 필터링 + scoring =====
function calcScore(item) {
  const text = (
  item.prcrmntReqNm ||
  item.bidNtceNm ||
  ""
).toLowerCase();
  let score = 0;

  final_keywords.forEach((k) => {
    const keyword = k.toLowerCase();
    if (text.includes(keyword)) {
      score += 3;  // final_keywords에 포함된 키워드가 있으면 3점 추가
    }
  });

  return score;
}

// ===== 필터링 및 scoring 적용 =====
function filterAndScore(data) {
  return data
    .map((item) => ({
      ...item,
      score: calcScore(item),
    }))
    .filter((item) => item.score > 0)  // 점수가 0보다 큰 것만 필터링
    .sort((a, b) => b.score - a.score);  // 점수 내림차순 정렬
}

module.exports = { filterAndScore };