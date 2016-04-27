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
        this._bandsService.getBands().subscribe(
            data => { this.bands = <Array<Band>> data },
            err => { this.bands_error = true }
        );
    }
}
