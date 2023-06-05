import { createMask } from '@ngneat/input-mask';
import { InputmaskOptions } from '@ngneat/input-mask/lib/types';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

export class InputmaskUtil {
  public static getDefaultGermanInputmask<T>(): Inputmask.Options {
    return createMask<T>({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'TT.MM.JJJJ',
      prefillYear: false, //Wichtig, für eine natürliche Erfassung
    } as InputmaskOptions<T>);
  }

  public static getDefaultGermanInputmaskWithformatter<T>(): Inputmask.Options {
    return createMask<T>({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'TT.MM.JJJJ',
      prefillYear: false, //Wichtig, für eine natürliche Erfassung
      formatter: (value: string) => {
        let formdate = formatDate(this.parseDate(value, 'YYYY-MM-DD'), 'dd.MM.yyyy', 'DE-de');
        console.log('formdate:', formdate);
        return formdate;
      },
    } as InputmaskOptions<T>);
  }
  public static parseDate(value: string, format: string): Date {
    const momentObj = moment.utc(value, format, true); // expliziten strict mode anschalten

    if (!momentObj.isValid()) {
      throw Error('Parsen des Datums fehlgeschlagen.');
    }

    return momentObj.toDate();
  }

  public static getValidDateOrEmptyString(event: MatDatepickerInputEvent<Date>, format = 'YYYY-MM-DD'): string {
    let value = (event?.targetElement as HTMLInputElement)?.value;
    if (isNullOrUndefined(value) || !moment(value, 'DD.MM.YYYY', true).isValid()) {
      return '';
    }
    return this.format(moment(value, 'DD.MM.YYYY', true).toDate(), format);
  }
  public static format(date: Date, format: string = null): string {
    const dateMoment = moment(date);
    return dateMoment.format(format);
  }

  public static getValidDateOrUndefined(event: MatDatepickerInputEvent<Date>): Date {
    let value = (event?.targetElement as HTMLInputElement)?.value;
    if (isNullOrUndefined(value) || !moment(value, 'DD.MM.YYYY', true).isValid()) {
      return undefined;
    }
    return this.parseDate(value, 'DD.MM.YYYY');
  }

}
export function isNullOrUndefined(obj: any) {
  return obj === null || obj === undefined;
}
