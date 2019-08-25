import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Globals } from '../globals';

@Directive({
    selector: '[appAuthorizedHtmlView]'
})
export class AuthorizedHtmlViewDirective implements OnChanges {
    constructor(private el: ElementRef, private globals: Globals) { }

    @Input('appAuthorizedHtmlView') authorizedHtmlView: string;

    ngOnChanges(): void {
        if(this.globals.currentUser.roles != undefined) {
            var authorizedRoles: string[] = this.authorizedHtmlView.split(';'); 
            authorizedRoles.push('ADMIN');        
            var myRoles: string[] = this.globals.currentUser.roles.split(';');
            
            const found = authorizedRoles.some(x => myRoles.includes(x));            
            if(!found) 
                this.el.nativeElement.remove();
        }
    }
}