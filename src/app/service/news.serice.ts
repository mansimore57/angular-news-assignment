import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class NewsService {
    apiKey = environment.api_key

    constructor (private http: HttpClient) {}

    fetchNewsData (pageSize: any, searchParams: any): Observable<any> {
        console.log(pageSize, '>>>>>>>>>')
        const { category, country, textVal } = searchParams;
        let url = 'https://newsapi.org/v2/';

        if (category && country && textVal) {
            url += `top-headlines?q=${textVal}&country=${country}&category=${category}`;
        } else if (category && country) {
            url += `top-headlines?country=${country}&category=${category}`;
        } else if (category && textVal) {
            url += `top-headlines?q=${textVal}&category=${category}`;
        } else if (textVal && country) {
            url += `top-headlines?country=${country}&q=${textVal}`;
        } else if (category) {
            url += `top-headlines?category=${category}`;
        } else if (country) {
            url += `top-headlines?country=${country}`;
        } else if (textVal) {
            url += `everything?q=${textVal}`;
        } else {
            url += 'everything?q=all';
        }

        url += `&pageSize=${pageSize}&apiKey=${this.apiKey}`;

        return this.http.get<any>(url);
    }

}