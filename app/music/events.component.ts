import { Component, OnInit } from '@angular/core';
import { RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Event }    from '../entity/event';
import { EventsService } from '../service/events.service';

@Component({
    templateUrl: 'app/music/events.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EventsService]
})
export class EventsComponent implements OnInit {

    events: Array<Event>;
    events_error: boolean = false;
    bandId: number;

    constructor(private _eventsService: EventsService, private _routeParams: RouteParams) { }

    ngOnInit() {
        this.bandId = parseInt(this._routeParams.get('id'));
        this._eventsService.getEventsByBand(this.bandId).subscribe(
            data => { this.events = <Array<Event>>data },
            err => { this.events_error = true }
        )
    }
}
