import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../entity/comment';
import { CommentsService } from '../service/comments.service';

@Component({
    selector: 'comments',
    providers: [CommentsService],
    template: `
    <div class="row">
    <div class="col-md-6 col-md-offset-3" style="padding-bottom: 2em;">
        <h2>Comments</h2>

        <ul class="list-group">
            <li *ngFor="#comm of comments" class="list-group-item" style="word-wrap:break-word">
                {{ comm.body }}<span style="float: right; color: gray; overflow:auto;">{{ comm.author }}</span>
            </li>
        </ul>
        <form (ngSubmit)="addComment()">
            <textarea [(ngModel)]="comment" placeholder="What do you think about this {{resource}}?" style="width: 40em; height: 7em;"></textarea>
            <button type="submit" class="btn btn-success green" style="float:right;"><i class="fa fa-share"></i> Send</button>
        </form>
    </div>
    </div>
  `,
})
export class Comments implements OnInit {
    @Input() resource: string;
    @Input() bandId: number;
    @Input() albumId: number;

    comments_error: boolean = false;

    comment: string;
    comments: Array<Comment> = [];

    constructor(private _commentsService: CommentsService) { }

    ngOnInit() {
        this.getComments(this.bandId, this.albumId);
    }

    addComment() {
        this._commentsService.postComment(new Comment(this.comment, this.bandId, this.albumId)).subscribe(
            data => { this.comments.push(<Comment>data) },
            err => { this.comments_error = true }
        );

    }

    getComments(bandId, albumId) {

        if (albumId) {
            this._commentsService.getCommentsByAlbum(bandId, albumId).subscribe(
                data => { this.comments = <Array<Comment>>data },
                err => { this.comments_error = true }
            );
        } else {
            this._commentsService.getCommentsByBand(bandId).subscribe(
                data => { this.comments = <Array<Comment>>data },
                err => { this.comments_error = true }
            );
        }
    }
}