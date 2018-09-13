import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}
    create(data: Data) {
        console.log(data);
        return this.http.post(`http://localhost:3000/data/create`, data);
    }
    all() {
        return this.http.get(`http://localhost:3000/data/`);
    }
}


