import EVENT_TARGET_BUNDLE from "./EVENT_TARGETS.js";
// // API_CALLER는 axios로 api call만,
const axios = require('axios');
const BASE_URL = "http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListCnstwkPPSSrch";
const TYPE_JSON = "&type=json";
//http://apis.data.go.kr/1230000/ao/PrcrmntReqInfoService/getPrcrmntReqInfoListCnstwkPPSSrch?
/**
 * 여기서부터 쿼리 스트링.
inqryDiv=1
&
inqryBgnDt=201606010000
&
inqryEndDt=201606052359
&
pageNo=1
&
numOfRows=10
&
ServiceKey=인증키
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

    const testCall = ()=>{


    };

    return {


    }
};

export default CALLAPI

