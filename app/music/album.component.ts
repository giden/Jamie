import { Component, OnInit } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { BandsService } from '../service/bands.service';
import { Album } from '../entity/album';
import { Comment } from '../entity/comment';

@Component({
    templateUrl: 'app/music/album.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [BandsService]
})
export class AlbumComponent implements OnInit {

    album: Album;
    album_error: boolean = false;
    comment: string; 
    comments: Array<Comment> = [];
    
    constructor(private _service: BandsService, private _params: RouteParams) { }

    ngOnInit() {
        this.getAlbum(this._params.get('id'));
    }

    addComment() {
        this.comments.push(new Comment(this.comment));
    }

    getAlbum(id: string) {
        this._service.getAlbum(id).subscribe(
            data => { this.album = <Album> data.results[0] },
            err => { this.album_error = true }
        );
    }
}