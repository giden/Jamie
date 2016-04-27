import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BandsService {
    constructor(private http: Http) { }

    getBands() {
        return this.http.get('')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    getBand(id: string) {
        return this.http.get('')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}