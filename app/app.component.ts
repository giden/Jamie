import { Component } from 'angular2/core';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { BandsComponent } from './music/bands.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [ ROUTER_DIRECTIVES ],
    providers: [ ROUTER_PROVIDERS ]
})
@RouteConfig([
    { path: '/bands', name: 'Bands', component: BandsComponent, useAsDefault: true },
])
export class AppComponent { }
