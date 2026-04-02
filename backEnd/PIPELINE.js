// 프로그램의 흐름은 Caller->Filter->Data After Handler

const axios = require("axios");
const { filterAndScore } = require("./FILTER.js");
const BASE_URL =
  "http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc";

const NUM_OF_ROWS = 100;

// ===== util =====
function formatDate(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "");  // yyyyMMdd 형식 (시간 제외)
}

// ===== 1. 오늘 공고 전체 =====
const fetchTodayAll = async (apiKey) => {
  const now = new Date();

  const start = new Date(now);
  start.setDate(now.getDate() - 1);

  const end = new Date(now);

  const startStr = formatDate(start);
  const endStr = formatDate(end);

  let page = 1;
  let results = [];

  while (true) {
    try {
      const url = `${BASE_URL}?ServiceKey=${apiKey}&type=json&pageNo=${page}&numOfRows=${NUM_OF_ROWS}&inqryDiv=1&inqryBgnDt=${startStr}&inqryEndDt=${endStr}`;

      const res = await axios.get(url);

      const itemsRaw = res.data?.response?.body?.items;

      let items = [];

      if (Array.isArray(itemsRaw?.item)) {
        items = itemsRaw.item;
      } else if (itemsRaw?.item) {
        items = [itemsRaw.item];
      }

      if (items.length === 0) break;

      results.push(...items);

      if (items.length < NUM_OF_ROWS) break;

      page++;

    } catch (err) {
      console.error("API ERROR:", err.message);
      break; // 👉 절대 throw 하지 말고 break
    }
  }

  return results;
};

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

    const itemsRaw = res.data?.response?.body?.items;

    let items = [];

    if (Array.isArray(itemsRaw?.item)) {
      items = itemsRaw.item;
    } else if (itemsRaw?.item) {
      items = [itemsRaw.item];
    }

    return results;
  }
}
// ===== MAIN =====
const RUN_PIPELINE = async (apiKey) => {
  try {
    const callTime = new Date();

    const todayRaw = await fetchTodayAll(apiKey);

    const todayScored = filterAndScore(todayRaw);

    return {
      callTime,
      today: todayScored,
      past: [], // 👉 일단 버림 (안정성 우선)
    };

  } catch (err) {
    console.error("PIPELINE ERROR:", err.message);

    // 👉 무조건 응답 보냄
    return {
      callTime: new Date(),
      today: [],
      past: [],
    };
  }
};

module.exports = RUN_PIPELINE;