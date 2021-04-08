import { Injectable } from '@angular/core';
import { NgxIzitoastService } from 'ngx-izitoast';


@Injectable({
    providedIn: 'root'
})
export class SbToastService {

    constructor(
        private iziToast: NgxIzitoastService) {
    }

    /**
     * For show toast message
     */
    showIziToastMsg(message: string, type: string): void {

        type = (type == 'error') ? "danger" : type;

        this.destroyIzitoast();
        this.iziToast.show({
            title: type,
            message: message,
            class: "sb-toaster sb-toast-" + type,
            position: 'bottomCenter',
            timeout: 3000,
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX'
        });
    }

    /**
     * Destroys IziToast
     */
    destroyIzitoast() {
        this.iziToast.destroy();
    }
}


