export interface TokenRequestDTO {
	grant_type: 'client_credentials'; // 권한부여 Type
	appkey: string; // 앱키
	appsecret: string; // 앱시크릿키
}

export interface TokenResponseDTO {
	access_token: string; // 접근토큰
	token_type: 'Bearer'; // 접근토큰유형
	expires_in: number; // 접근토큰 유효기간
	access_token_token_expired: string; // 접근토큰 유효기간(일시표시)
}

export interface AccountRequestHeaderDTO {
	'content-type': 'application/json; charset=utf-8'; // 컨텐츠타입
	authorization: string; // 접근토큰
	appkey: string; // 앱키
	appsecret: string; // 앱시크릿키
	tr_id: 'CTRP6548R'; // 거래ID
	custtype: 'P'; // 고객 타입
}

export interface AccountRequestParamsDTO {
	CANO: string; // 종합계좌번호, 계좌번호 체계(8-2)의 앞 8자리
	ACNT_PRDT_CD: string; // 계좌상품코드, 계좌번호 체계(8-2)의 뒤 2자리
	INQR_DVSN_1: ''; // 조회구분1
	BSPR_BF_DT_APLY_YN: ''; // 기준가이전일자적용여부
}

export interface AccountResponseDTO {
	pchs_amt: number; // 매입금액
	evlu_amt: number; // 평가금액
	evlu_pfls_amt: number; // 평가손익금액
	crdt_lnd_amt: number; // 신용대출금액
	real_nass_amt: number; // 실제순자산금액
	whol_weit_rt: number; // 전체비중율
}
