import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkerPageComponent } from './pages/marker-page/marker-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [
    {
        path: 'fullscreen',
        component: FullscreenMapPageComponent,
        title: 'Fullscreen Map',
    },
    {
        path: 'markers',
        component: MarkerPageComponent,
        title: 'Marcadores',
    },
    {
        path: 'houses',
        component: HousesPageComponent,
        title: 'Propiedades diponibles',
    },
    {
        path: '**',
        redirectTo: 'fullscreen',
    },  
];
