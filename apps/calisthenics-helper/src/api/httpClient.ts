import axios, { AxiosInstance, AxiosPromise } from 'axios';
import type { HttpMethod, HttpParams } from '@/types/http';

class HttpClient {
	readonly method: HttpMethod;
	readonly url: string;
	contentType: string;
	baseURL: string;
	timeout: number;
	data?: unknown;
	params?: HttpParams;

	constructor(method: HttpMethod, url: string) {
		this.method = method;
		this.url = url;
		this.baseURL = '/';
		this.timeout = 5000;
		this.contentType = 'application/json';
	}

	call<T>(): AxiosPromise<T> {
		const http: AxiosInstance = axios.create();
		return http.request<T>({
			...this,
			headers: {
				'Content-Type': this.contentType,
			},
		});
	}
}

export class HttpClientBuilder {
	private readonly _instance: HttpClient;

	constructor(method: HttpMethod, url: string) {
		this._instance = new HttpClient(method, url);
	}

	static get(url: string): HttpClientBuilder {
		return new HttpClientBuilder('GET', url);
	}
	static post(url: string): HttpClientBuilder {
		return new HttpClientBuilder('POST', url);
	}

	static put(url: string): HttpClientBuilder {
		return new HttpClientBuilder('PUT', url);
	}

	static patch(url: string): HttpClientBuilder {
		return new HttpClientBuilder('PATCH', url);
	}

	static delete(url: string): HttpClientBuilder {
		return new HttpClientBuilder('DELETE', url);
	}

	baseURL(url: string): HttpClientBuilder {
		this._instance.baseURL = url;
		return this;
	}

	params(params: HttpParams): HttpClientBuilder {
		this._instance.params = params;
		return this;
	}

	data(data: unknown): HttpClientBuilder {
		this._instance.data = data;
		return this;
	}

	contentType(contentType: string): HttpClientBuilder {
		this._instance.contentType = contentType;
		return this;
	}

	timeout(timeout: number): HttpClientBuilder {
		this._instance.timeout = timeout;
		return this;
	}

	call<T>(): AxiosPromise<T> {
		return this._instance.call();
	}
}
