import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../entity/event';

@Injectable()
export class EventsService {
    constructor(private http: Http) { }

    _url: string = 'http://localhost:8080/jamie/events'

    getEventsByBand(id: number) {
        return this.http.get(this._url + '/bands/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    getAllEvents() {
        return this.http.get(this._url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    postEvent(event: Event) {
        return this.http.post(this._url, JSON.stringify(event),
            { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
