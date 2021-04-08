import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sb-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventFilterComponent implements OnInit, OnChanges {

  @Input() filterValues: any;
  @Input() filterOpenStatus: boolean;
  @Output() filterChangeEvent: EventEmitter<any> = new EventEmitter();

  public searchFilterFormConfig: any;
  @Input() filterConfig: any;
  public isFilterShow = false;
  public filterFields: any;
  public currentFilters: any;
  public searchQuery: string;
  public filterSelectedValues = [];
  constructor(     
    public translate: TranslateService
    ) {
    }
    
    ngOnChanges() {
      this.isFilterShow = this.filterOpenStatus;
    }
  ngOnInit(): void { 
  }

  initializeForm() { }

  showfilter() {
    this.isFilterShow = !this.isFilterShow;
    this.filterChangeEvent.emit({
      action: 'filterStatusChange',
      filterStatus: this.isFilterShow
    });
  }

  resetFilter() {
    this.filterSelectedValues =[];
  }

  applyFilter() {
    this.emitApplyFilter();
  }

  emitApplyFilter() {
    this.filterChangeEvent.emit({
      action: 'filterDataChange',
      filter: this.filterValues,
      filtersSelected: this.filterSelectedValues,
      query: this.searchQuery
    });
    console.log('event', this.filterSelectedValues);
  }

  outputData($event) { }

  onStatusChanges($event) { }

  valueChanges($event) {
   this.filterSelectedValues  = $event;
  }
  onQueryEnter(){}
}
