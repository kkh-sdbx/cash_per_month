
// // API_CALLER는 axios로 api call만,
const EVENT_TARGETS = require("./EVENT_TARGETS.js");
const axios = require('axios');
const BASE_URL = "http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc?";
const TYPE_JSON = "&type=json";
//http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListGnrlServc?

const MANDATORY_QUERY = "&inqryDiv=1&inqryBgnDt=202602010930&inqryEndDt=202602100730&pageNo=1&numOfRows=100"
/**
 * 여기서부터 쿼리 스트링.
inqryDiv=1
&
inqryBgnDt=202602010930
&
inqryEndDt=202602080730
&
pageNo=1
&
numOfRows=100
&
ServiceKey=인증키
 * 
 */
/**
 * 조회구분c=1&조회시작일시inqryBgnDt=20260101&조회종료일시inqryEndDt=20260210(cron job 일시)
 * 
 * 불러와야 할 내용 목록
 *  "사전검토출처" :,
    "공고월" : rcptDt,
    "사전/공고" :"공고",
    "입찰/투찰" :"입찰",
    "고객사" :orderInsttNm,
    "사업명" :prcrmntReqNm,
    "금액" :totCnstwkScleAmt,
    "제출일시":inptDt,
    "전자투찰" :,
    "PT일시" :,
    "URL":"prcrmntReqInfoUrl"
 * 
 */

/**
 * 필수옵션
 * numOfRows	한 페이지 결과 수	4	1	10	한 페이지 결과 수
pageNo	페이지 번호	4	1	1	페이지 번호
ServiceKey	서비스키	400	1	공공데이터포털에서 받은 인증키	공공데이터포털에서 받은 인증키
c	조회구분	1	1	1	검색하고자하는 조회구분
1.접수일시, 2.조달요청번호
.나라장터화면에서 공사관리번호

 * 
 */
const CALLAPI = ()=>{

    const testCall = async (apiKey)=>{
        const response = await axios.get(BASE_URL + MANDATORY_QUERY + TYPE_JSON + "&ServiceKey=" + apiKey);
        console.log("test call finished! response is :",response);
        return response
    };

    return {

        testCall
    }
};

module.exports = CALLAPI;

