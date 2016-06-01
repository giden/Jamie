import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../entity/comment';

@Injectable()
export class CommentsService {
    constructor(private http: Http) { }

    _url: string = 'http://localhost:8080/jamie/comments'

    getCommentsByBand(id: number) {
        return this.http.get(this._url + '/bands/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    getCommentsByAlbum(bandId: number, id: number) {
        return this.http.get(this._url + '/bands/' + bandId + '/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    postComment(comment: Comment) {
        return this.http.post(this._url, JSON.stringify(comment),
            { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
