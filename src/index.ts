import { fetchAccount, fetchToken } from './api';
import { accountMaps, keyMaps } from './utils';
export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		const accountId = url.pathname.split('/')[1];
		const [akMap, skMap] = keyMaps(env);
		let token: string | null;
		const tokenKey = `token-${accountId}`;
		token = await env.kis_kv.get(tokenKey);
		if (!token) {
			if (!akMap.has(accountId) || !skMap.has(accountId)) {
				return new Response('Invalid account id', { status: 400 });
			}
			token = (await fetchToken(akMap.get(accountId)!, skMap.get(accountId)!)).access_token;
			// 24시간 유효한데 6시간 정도 텀이 있어서 24시간으로 할 경우 최악의 경우 6시간 정도 문제 있을 수 있음
			await env.kis_kv.put(tokenKey, token, { expirationTtl: 60 * 60 * 12 });
		}
		// const [cdMap, categoryMap] = accountMaps();
		const cdMap = accountMaps();
		const data = (await fetchAccount(token, akMap.get(accountId)!, skMap.get(accountId)!, accountId, cdMap.get(accountId)! as string))[18];
		return new Response(JSON.stringify(data), { status: 200 });
	},
} satisfies ExportedHandler<Env>;
