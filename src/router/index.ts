import {createRouter, createWebHistory} from 'vue-router';
import AvionsPage from "../pages/AvionsPage.vue";
import HangarsPage from "../pages/HangarsPage.vue";
import PistesPage from "../pages/PistesPage.vue";
import AccueilPage from "../pages/AccueilPage.vue";
import VolsPage from "../pages/VolsPage.vue";


const routes = [
    { path: "/avions", component: AvionsPage},
    { path: "/hangars", component: HangarsPage},
    { path: "/pistes", component: PistesPage},
    { path: "/accueil", component: AccueilPage},
    { path: "/vols", component: VolsPage},
    { path: "/", component: AccueilPage},

];
 export const router = createRouter({
     history: createWebHistory(),
     routes
 })