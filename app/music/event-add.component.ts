import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';
import { Router, RouteParams } from '@angular/router-deprecated';
import { Event }    from '../entity/event';
import { EventsService } from '../service/events.service';

@Component({
    templateUrl: 'app/music/event-add.component.html',
    providers: [EventsService]
})
export class EventAddComponent implements OnInit {
    
    event: Event;
    active = true;
    
    event_error: boolean = false;

    constructor(private _eventsService: EventsService, private router: Router, private _routeParams: RouteParams) { }

    ngOnInit() {
        this.load();
    }

    load() {
        this.event = new Event();
        this.event.bandId = parseInt(this._routeParams.get('id'));
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    addEvent() {
        this._eventsService.postEvent(this.event).subscribe(
            data => { this.router.navigate( ['Band', { id: this.event.bandId }] )},
            err => { this.event_error = true }
        )
    }
}
