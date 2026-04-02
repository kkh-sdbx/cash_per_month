const axios = require("axios");

const BASE_URL =
  "http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc";

const NUM_OF_ROWS = 10;

// ===== 날짜 (안전하게 7일 범위 + 시간 포함) =====
const formatDateTime = (date, isEnd = false) => {
  const d = date.toISOString().slice(0, 10).replace(/-/g, "");
  return isEnd ? d + "2359" : d + "0000";
};

const fetchData = async (apiKey) => {
  const now = new Date();

  const start = new Date(now);
  start.setDate(now.getDate() - 7); // 👉 일주일 전

  const startStr = formatDateTime(start, false);
  const endStr = formatDateTime(now, true);

  try {
    const url = `${BASE_URL}?ServiceKey=${apiKey}&type=json&pageNo=1&numOfRows=${NUM_OF_ROWS}&inqryDiv=1&inqryBgnDt=${startStr}&inqryEndDt=${endStr}`;

    console.log("CALL:", url);

    const res = await axios.get(url, { timeout: 5000 });

    const itemsRaw = res.data?.response?.body?.items;

    let items = [];

    if (Array.isArray(itemsRaw?.item)) {
      items = itemsRaw.item;
    } else if (itemsRaw?.item) {
      items = [itemsRaw.item];
    }

    return items;
  } catch (err) {
    console.error("API ERROR:", err.message);
    return [];
  }
};

// ===== MAIN =====
const RUN_PIPELINE = async (apiKey) => {
  try {
    const items = await fetchData(apiKey);

    // 👉 데이터 없으면 강제 더미
    if (!items || items.length === 0) {
      return {
        today: [
          {
            rcptDt: "DEMO",
            ntceInsttNm: "API FAIL",
            prcrmntReqNm: "데이터 없음 (그래도 표시됨)",
            totCnstwkScleAmt: "-",
            inptDt: "-",
            prcrmntReqInfoUrl: "-",
            score: 1,
          },
        ],
        past: [],
      };
    }

    // 👉 score 강제 부여
    const result = items.map((item, idx) => ({
      ...item,
      score: idx + 1,
    }));

    return {
      today: result,
      past: [],
    };
  } catch (err) {
    console.error("PIPELINE ERROR:", err.message);

    return {
      today: [
        {
          rcptDt: "ERROR",
          ntceInsttNm: "SERVER",
          prcrmntReqNm: "파이프라인 실패",
          totCnstwkScleAmt: "-",
          inptDt: "-",
          prcrmntReqInfoUrl: "-",
          score: 0,
        },
      ],
      past: [],
    };
  }
};

module.exports = RUN_PIPELINE;