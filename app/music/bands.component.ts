import { Component, OnInit } from 'angular2/core';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

import { BandsService } from '../service/bands.service';
import { Band } from '../entity/band';

@Component({
    templateUrl: 'app/music/bands.component.html',
    directives: [PAGINATION_DIRECTIVES],
    providers: [BandsService]
})
export class BandsComponent implements OnInit {

    bands: Array<Band>;
    bands_error: boolean = false;

    totalItems: number = 30;
    currentPage: number = 1;
    itemsPerPage: number = 3;


    constructor(private _bandsService: BandsService) { }

    ngOnInit() {
        this.getBands();
    }

    getBands(event:any = {page: this.currentPage, itemsPerPage: this.itemsPerPage}) {
        var params: string = '';
        params += '&offset='+event.page*3;
        params += '&limit='+event.itemsPerPage;
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
