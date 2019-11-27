import { FormControl } from '@angular/forms';
import * as moment from 'moment';
export class DateValidator {

   static ptDate(control: FormControl): { [key: string]: any } {
       let ptDatePattern =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

       if (!control.value.match(ptDatePattern)){
           return { "ptDate": true };
       }
       return null;
   }
   static isFuture(control: FormControl): { [key: string]: any } {

    if (moment(control.value, 'DD/MM/YYYY').isSameOrAfter(moment(), 'day')){
        return null;
    }
    return { "ptDate": true };;
}
}

