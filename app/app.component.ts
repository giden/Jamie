import { Component } from '@angular/core';
import { RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { BandsComponent } from './music/bands.component';
import { BandDetailsComponent } from './music/band.component';
import { AlbumComponent } from './music/album.component';
import { EventAddComponent } from './music/event-add.component';
import { EventsComponent } from './music/events.component';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
    { path: '/bands', name: 'Bands', component: BandsComponent, useAsDefault: true },
    { path: '/band/:id', name: 'Band', component: BandDetailsComponent },
    { path: '/album/:id', name: 'Album', component: AlbumComponent },
    { path: '/events/add/:id', name: 'AddEvent', component: EventAddComponent },
    { path: '/events/:id', name: 'Events', component: EventsComponent }
])
export class AppComponent { }
