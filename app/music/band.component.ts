import { Component, OnInit } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { BandsService } from '../service/bands.service';
import { Band } from '../entity/band';


@Component({
    templateUrl: 'app/music/band.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [BandsService]
})
export class BandDetailsComponent implements OnInit {

    band: Band;
    bands_error: boolean = false;

    constructor(private _bandsService: BandsService, private _routeParams: RouteParams) { }

    ngOnInit() { this.getBand(this._routeParams.get('id')) }

    getBand(id: string) {
        this._bandsService.getBand(id).subscribe(
            data => { this.band = <Band> data.results[0] },
            err => { this.bands_error = true }
        );
    }
}