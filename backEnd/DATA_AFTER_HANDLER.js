const axios = require("axios");

const BASE_URL =
  "http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc";

const NUM_OF_ROWS = 100;

// ===== util =====
function formatDate(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, "") + "0000";
}

// ===== 과거 공고 fetch =====
async function fetchPast(apiKey, agency) {
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

// ===== HANDLER =====
const DATA_HANDLER = () => {
  const handlerTest = async (filteredData, apiKey) => {
    console.log("handler start");

    // 1. 상위 5개만 사용
    const top = filteredData.slice(0, 5);

    // 2. 발주처 추출
    const agencies = [
      ...new Set(top.map((i) => i.ntceInsttNm)),
    ];

    // 3. 과거 공고 가져오기
    let pastResults = [];

    for (const agency of agencies) {
      const past = await fetchPast(apiKey, agency);
      pastResults.push(...past);
    }

    // 4. 결과 합치기
    return {
      today: filteredData,
      past: pastResults,
    };
  };

  return {
    handlerTest,
  };
};

module.exports = DATA_HANDLER;