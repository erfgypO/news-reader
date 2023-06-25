import { writable } from "svelte/store";
import { browser } from "$app/environment";
export const visitedPages = writable(browser && (JSON.parse(localStorage.getItem('visitedPages')) || []));
export const hideVisitedPages = writable(browser && (JSON.parse(localStorage.getItem('hideVisitedPages')) || false));

visitedPages.subscribe(value => {
    if(browser) {
        localStorage.setItem('visitedPages', JSON.stringify(value));
    }
});

hideVisitedPages.subscribe(value => {
    if(browser) {
        localStorage.setItem('hideVisitedPages', JSON.stringify(value));
    }
});
