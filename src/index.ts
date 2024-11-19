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
			await env.kis_kv.put(tokenKey, token, { expirationTtl: 60 * 60 * 24 });
		}
		const [cdMap, categoryMap] = accountMaps();
		const data = (await fetchAccount(token, akMap.get(accountId)!, skMap.get(accountId)!, accountId, cdMap.get(accountId)! as string))[
			categoryMap.get(accountId)! as number
		];
		return new Response(JSON.stringify(data), { status: 200 });
	},
} satisfies ExportedHandler<Env>;
