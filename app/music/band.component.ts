import { Component, OnInit } from '@angular/core';
import { RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { BandsService } from '../service/bands.service';
import { Band } from '../entity/band';
import { Comments } from './comments.component'

@Component({
    templateUrl: 'app/music/band.component.html',
    directives: [ROUTER_DIRECTIVES, Comments],
    providers: [BandsService]
})
export class BandDetailsComponent implements OnInit {

    band: Band;
    bands_error: boolean = false;

    constructor(private _bandsService: BandsService, private _routeParams: RouteParams) { }

    ngOnInit() { this.getBand(parseInt(this._routeParams.get('id'))) }

    getBand(id: number) {
        this._bandsService.getBand(id).subscribe(
            data => { this.band = <Band> data.results[0] },
            err => { this.bands_error = true }
        );
    }
}