// 프로그램의 흐름은 Caller->Filter->Data After Handler

const axios = require("axios");
const { filterAndScore } = require("./FILTER.js");
const BASE_URL =
  "http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc";

const NUM_OF_ROWS = 100;

// ===== util =====
function formatDate(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "") + "0000";
}

// ===== 1. 오늘 공고 전체 =====
async function fetchTodayAll(apiKey) {
  const today = new Date();
  const dateStr = formatDate(today);

  let page = 1;
  let results = [];

  while (true) {
    const url = `${BASE_URL}?serviceKey=${apiKey}&type=json&pageNo=${page}&numOfRows=${NUM_OF_ROWS}&inqryDiv=1&inqryBgnDt=${dateStr}&inqryEndDt=${dateStr}`;

    const res = await axios.get(url);

    const items =
      res.data?.response?.body?.items || [];

    if (!items || items.length === 0) break;

    results.push(...items);

    if (items.length < NUM_OF_ROWS) break;

    page++;
  }

  return results;
}

// ===== 2. scoring =====
function calcScore(item, keywords) {
  const text = (item.prcrmntReqNm || "").toLowerCase();

  let score = 0;

  keywords.forEach((k) => {
    const keyword = k.toLowerCase();
    if (text.includes(keyword)) {
      score += keyword.length > 3 ? 2 : 1;
    }
  });

  return score;
}

// ===== 3. 필터 + 정렬 =====
function filterAndScore(data, keywords) {
  return data
    .map((item) => ({
      ...item,
      score: calcScore(item, keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ===== 4. 발주처 기준 과거 조회 =====
async function fetchPastByAgency(apiKey, agency) {
  const now = new Date();

  const start = new Date(now);
  start.setFullYear(now.getFullYear() - 1);
  start.setMonth(start.getMonth() - 1);

  const end = new Date(now);
  end.setFullYear(now.getFullYear() - 1);
  end.setMonth(end.getMonth() + 1);

  const startStr = formatDate(start);
  const endStr = formatDate(end);

  let page = 1;
  let results = [];

  while (true) {
    const url = `${BASE_URL}?serviceKey=${apiKey}&type=json&pageNo=${page}&numOfRows=${NUM_OF_ROWS}&inqryDiv=1&ntceInsttNm=${encodeURIComponent(
      agency
    )}&inqryBgnDt=${startStr}&inqryEndDt=${endStr}`;

    const res = await axios.get(url);

    const items =
      res.data?.response?.body?.items || [];

    if (!items || items.length === 0) break;

    results.push(...items);

    if (items.length < NUM_OF_ROWS) break;

    page++;
  }

  return results;
}

// ===== MAIN =====
const RUN_PIPELINE = async (apiKey) => {
  const callTime = new Date();

  // 키워드 (임시)
  const keywords = ["교육", "청년", "AI", "훈련"];

  // 1. 오늘 공고
  const todayRaw = await fetchTodayAll(apiKey);

  // 2. 필터 + scoring
  const todayScored = filterAndScore(todayRaw);

  // 3. 발주처 top 5
  const topAgencies = [
    ...new Set(
      todayScored.slice(0, 5).map((i) => i.ntceInsttNm)
    ),
  ];

  // 4. 과거 공고
  let pastResults = [];

  for (const agency of topAgencies) {
    const past = await fetchPastByAgency(apiKey, agency);
    pastResults.push(...past);
  }

  return {
    callTime,
    today: todayScored,
    past: pastResults,
  };
};

module.exports = RUN_PIPELINE;