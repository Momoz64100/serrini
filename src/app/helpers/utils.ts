import { DocumentChangeAction } from '@angular/fire/firestore';
declare var $: any;

export const mergeDbId = function <T>(actions: DocumentChangeAction<T>[]) {
    return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { ...data, id } as T;
    });
};

export const mergeDbIdSimpleValue = function <T>(action: DocumentChangeAction<T>) {
    const data = action.payload.doc.data();
    const id = action.payload.doc.id;
    return { ...data, id } as T;
};

export const activeDatePicker = function (value: string) {
    $(function () {
        $(value).datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            format: 'dd/mm/yyyy',
            locale: 'fr'
        }).datepicker("setDate", new Date());
    });
}

export const concatUserName = function (prenom: string, nom: string) {
    return prenom + ' ' + nom;
}
