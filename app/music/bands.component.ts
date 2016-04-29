import { Component, OnInit } from 'angular2/core';

import { BandsService } from '../service/bands.service';
import { Band } from '../entity/band';

@Component({
    templateUrl: 'app/music/bands.component.html',
    providers: [BandsService]
})
export class BandsComponent implements OnInit {

    bands: Array<Band>;
    bands_error: boolean = false;

    constructor(private _bandsService: BandsService) { }

    ngOnInit() {
        this.getBands();
    }

    getBands() {
        var params: string = '';
        params += '&offset=0';
        params += '&limit=3';
        params += '&order=popularity_month';
        params += '&hasimage=1';
        console.log(params);

        this._bandsService.getBands(params).subscribe(
            data => {
                this.bands = <Array<Band>>data.results;
                this.bands.forEach(band => {
                    band.musicinfo.description.en = band.musicinfo.description.en.replace(/<(?:.|\n)*?>/gm, '');
                    band.musicinfo.description.en = band.musicinfo.description.en.replace(/&nbsp;/gm, ' ');
                    band.name = band.name.replace(/&amp;/gm, '&')
                });
            },
            err => { this.bands_error = true }
        );
    }
}
