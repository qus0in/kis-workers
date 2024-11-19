import axios from 'axios';
import { AccountRequestHeaderDTO, AccountRequestParamsDTO, TokenRequestDTO, TokenResponseDTO, AccountResponseDTO } from './types';
const api = axios.create({
	baseURL: 'https://openapi.koreainvestment.com:9443',
});

export async function fetchToken(appkey: string, appsecret: string) {
	const requestDTO: TokenRequestDTO = { appkey, appsecret, grant_type: 'client_credentials' };
	const responseDTO = await api.post<TokenResponseDTO>('/oauth2/tokenP', requestDTO);
	return responseDTO.data;
}

export async function fetchAccount(token: string, appkey: string, appsecret: string, CANO: string, ACNT_PRDT_CD: string) {
	const requestHeaderDTO: AccountRequestHeaderDTO = {
		'content-type': 'application/json; charset=utf-8',
		authorization: 'Bearer ' + token,
		appkey,
		appsecret,
		tr_id: 'CTRP6548R',
		custtype: 'P',
	};
	const requestParamsDTO: AccountRequestParamsDTO = {
		CANO,
		ACNT_PRDT_CD,
		INQR_DVSN_1: '',
		BSPR_BF_DT_APLY_YN: '',
	};
	console.log(requestHeaderDTO);
	console.log(requestParamsDTO);
	try {
		const responseDTO = await api.post('/uapi/domestic-stock/v1/trading/inquire-account-balance', requestParamsDTO, {
			headers: {
				'content-type': requestHeaderDTO['content-type'],
				authorization: requestHeaderDTO.authorization,
				appkey: requestHeaderDTO.appkey,
				appsecret: requestHeaderDTO.appsecret,
				tr_id: requestHeaderDTO.tr_id,
				custtype: requestHeaderDTO.custtype,
			},
			params: requestParamsDTO,
		});
		console.log(responseDTO.data);
		return responseDTO.data['output1'] as AccountResponseDTO[];
	} catch (error) {
		console.error(error);
		return [];
	}
}
