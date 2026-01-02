import { ProductPage } from './pages/product-page/product-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layouts/store-front-layout/store-front-layout";
import { GenderPage } from "./pages/gender-page/gender-page";
import { HomePage } from './pages/home-page/home-page';

export const  storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayout,
        children: [
            {
                path: '',
                component: HomePage,
            },
            {
                path: 'gender/:gender',
                component: GenderPage
            },
            {
                path: 'product/:idSlug',
                component: ProductPage
            },
            {
                path: '**',
                loadComponent: () => import('./pages/not-found-page/not-found-page').then(m => m.NotFoundPage)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    },

]

export default storeFrontRoutes;