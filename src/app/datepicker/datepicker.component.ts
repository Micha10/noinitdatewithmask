import { Component } from '@angular/core';
import { InputmaskUtil } from '../inputmask-util';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  constructor() {
  }
  stringInputMask = InputmaskUtil.getDefaultGermanInputmaskWithformatter<string>();
  dateInputMask = InputmaskUtil.getDefaultGermanInputmaskWithformatter<Date>();
  momentInputMask =InputmaskUtil.getDefaultGermanInputmaskWithformatter<Moment>();

  public inhalt: string = '2023-02-03';
  public ohneMaske: string = '2023-02-03';
  public datedate: Date = new Date('2023-02-23')
  public momdate: Moment = moment("2023-02-03");
  datepickerinput(event: MatDatepickerInputEvent<Date>) {
    let x = InputmaskUtil.getValidDateOrEmptyString(event);
    console.log("dateinput", x);
  }

  stringpickerinput(event: MatDatepickerInputEvent<Date>) {
    let x = InputmaskUtil.getValidDateOrEmptyString(event, "DD.MM.YYYY");
    console.log("stringinput", x);
    this.inhalt = x;
  }
}
