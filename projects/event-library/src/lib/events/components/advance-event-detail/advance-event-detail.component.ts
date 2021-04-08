import { Component, OnInit, Input } from '@angular/core';
import{ labelMessages } from './../labels';
import { TranslateService } from '@ngx-translate/core';
import { TimezoneCal } from '../../services/timezone/timezone.service';

@Component({
  selector: 'sb-advance-event-detail',
  templateUrl: './advance-event-detail.component.html',
  styleUrls: ['./advance-event-detail.component.scss']
})
export class AdvanceEventDetailComponent implements OnInit {
  @Input() eventDetailItem: any;
  labelMessages= labelMessages;
  isTruncate : boolean = false;
  timezoneshort: string;
  constructor(
    public translate: TranslateService,
    private timezoneCal: TimezoneCal) { 
      this.timezoneshort = this.timezoneCal.timeZoneAbbreviated();

    }

  ngOnInit() {
  }

  truncateData(truncate)
  {
    this.isTruncate = truncate;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
