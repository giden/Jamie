import { Component, OnInit } from '@angular/core';
import { RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { BandsService } from '../service/bands.service';
import { Album } from '../entity/album';
import { Comments } from './comments.component'

@Component({
    templateUrl: 'app/music/album.component.html',
    directives: [ROUTER_DIRECTIVES, Comments],
    providers: [BandsService]
})
export class AlbumComponent implements OnInit {

    album: Album;
    album_error: boolean = false;
    bandId: number;
    
    constructor(private _service: BandsService, private _params: RouteParams) { }

    ngOnInit() {
        this.bandId = parseInt(this._params.get('id'));
        this.getAlbum(this.bandId);
    }

    getAlbum(id: number) {
        this._service.getAlbum(id).subscribe(
            data => { this.album = <Album> data.results[0] },
            err => { this.album_error = true }
        );
    }
}