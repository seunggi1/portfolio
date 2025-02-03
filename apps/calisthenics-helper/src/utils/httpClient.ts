interface HttpClient<T> {
	get(): Promise<T>;
	post(): Promise<T>;
	put(): Promise<T>;
	delete(): Promise<T>;
	patch(): Promise<T>;
}

class HttpFetchClient<T> implements HttpClient<T> {
	constructor(
		private url: string,
		private body?: any,
		private headers?: Record<string, string>
	) {}

	private async fetch(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
	): Promise<unknown> {
		const request = new Request(this.url, {
			method: method,
			body: this.body ? JSON.stringify(this.body) : null,
			headers: {
				'Content-Type': 'application/json',
				...this.headers,
			},
		});

		const res: Response = await fetch(request);

		return res.json();
	}

	async get(): Promise<T> {
		const result: T = (await this.fetch('GET')) as T;

		return result;
	}
	async post(): Promise<T> {
		const result: T = (await this.fetch('POST')) as T;

		return result;
	}
	async put(): Promise<T> {
		const result: T = (await this.fetch('PUT')) as T;

		return result;
	}

	async delete(): Promise<T> {
		const result: T = (await this.fetch('DELETE')) as T;

		return result;
	}

	async patch(): Promise<T> {
		const result: T = (await this.fetch('PATCH')) as T;

		return result;
	}
}

export function createHttpClient<T>(
	url: string,
	body?: any,
	headers?: Record<string, string>
): HttpClient<T> {
	return new HttpFetchClient(url, body, headers);
}
