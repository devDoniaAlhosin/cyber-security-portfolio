import { TimelineElement } from './../../about/horizontal-timeline/timeline-element';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import {  faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-horizontal-timeline',
  standalone: true,
  imports: [DatePipe , NgIf , NgClass, NgFor ,FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './horizontal-timeline.component.html',
  styleUrl: './horizontal-timeline.component.css',
  animations: [
    trigger('contentState', [
      state('active', style({
        position: 'relative', 'z-index': 2, opacity: 1,
      })),
      transition('right => active', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
        ]))
      ]),
      transition('active => right', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ]),
      transition('active => left', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
      ]),
      transition('left => active', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
        ]))
      ]),
    ])
  ]
})
export class HorizontalTimelineComponent implements AfterViewInit {
  prevLinkInactive: boolean = true;
  nextLinkInactive: boolean = false;
  faChevronRight=faChevronRight;
  loaded: boolean = false;
  selectedIndex: number = 0;
  @ViewChild('eventsWrapper') eventsWrapper!: ElementRef;
  @ViewChild('fillingLine') fillingLine!: ElementRef;
  @ViewChildren('timelineEvents') timelineEvents!: QueryList<ElementRef>;
  eventsWrapperWidth: number = 0;
  private _viewInitialized = false;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  private _timelineWrapperWidth = 720;

  @Input()
  set timelineWrapperWidth(value: number) {
    this._timelineWrapperWidth = value;
    this._cdr.detectChanges();
  }

  private _eventsMinDistance: number = 100;

  @Input()
  set eventsMinDistance(value: number) {
    this._eventsMinDistance = value;
    this.initView();
  }

  private _timelineElements: TimelineElement[] = [];

  get timelineElements(): TimelineElement[] {
    return this._timelineElements;
  }

  @Input()
  set timelineElements(value: TimelineElement[]) {
    this._timelineElements = value;
    this.initView();
  }

  private _dateFormat: string = 'dd.MM.yyyy';

  get dateFormat(): string {
    return this._dateFormat;
  }

  @Input()
  set dateFormat(value: string) {
    this._dateFormat = value;
    this.initView();
  }

  private _disabled: boolean = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  private _showContent: boolean = false;

  get showContent(): boolean {
    return this._showContent;
  }

  @Input()
  set showContent(value: boolean) {
    this._showContent = value;
    this._cdr.detectChanges();
  }

  private static pxToNumber(val: string): number {
    return Number(val.replace('px', ''));
  }

  private static getElementWidth(element: Element): number {
    const computedStyle = window.getComputedStyle(element);
    if (!computedStyle.width) {
      return 0;
    }
    return HorizontalTimelineComponent.pxToNumber(computedStyle.width);
  }

  private static parentElement(element: any, tagName: string) {
    if (!element || !element.parentNode) {
      return null;
    }

    let parent = element.parentNode;
    while (true) {
      if (parent.tagName.toLowerCase() == tagName) {
        return parent;
      }
      parent = parent.parentNode;
      if (!parent) {
        return null;
      }
    }
  }

  private static getTranslateValue(timeline: Element) {
    let timelineStyle = window.getComputedStyle(timeline);
    let timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
      timelineStyle.getPropertyValue('-moz-transform') ||
      timelineStyle.getPropertyValue('-ms-transform') ||
      timelineStyle.getPropertyValue('-o-transform') ||
      timelineStyle.getPropertyValue('transform');

    let translateValue = 0;
    if (timelineTranslate.indexOf('(') >= 0) {
      let timelineTranslateStr = timelineTranslate
        .split('(')[1]
        .split(')')[0]
        .split(',')[4];
      translateValue = Number(timelineTranslateStr);
    }

    return translateValue;
  }

  private static setTransformValue(element: any, property: any, value: any) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style['transform'] = property + '(' + value + ')';
  }

  private static dayDiff(first: Date, second: Date): number {
    return Math.round(second.getTime() - first.getTime());
  }

  private static minLapse(elements: TimelineElement[]): number {
    if (elements && elements.length && elements.length === 1) {
      return 0;
    }

    let result: number = 0;
    for (let i = 1; i < elements.length; i++) {
      let distance = HorizontalTimelineComponent.dayDiff(elements[i - 1].date, elements[i].date);
      result = result ? Math.min(result, distance) : distance;
    }
    return result;
  }

  ngAfterViewInit(): void {
    this._cdr.detach();
    this._viewInitialized = true;
    this.initView();
  }

  onScrollClick(event: Event, forward: boolean) {
    event.preventDefault();
    this.updateSlide(this.eventsWrapperWidth, forward);
    this._cdr.detectChanges();
  }

  onEventClick(event: Event, selectedItem: TimelineElement) {
    event.preventDefault();
    if (this._disabled) {
      return;
    }
    let element = event.target;
    // detect click on the a single event - show new event content
    let visibleItem = this._timelineElements[0];
    this._timelineElements.forEach(function (item: TimelineElement) {
      if (item.selected && item != selectedItem) {
        visibleItem = item;
        item.selected = false;
      }
    });
    this.selectedIndex = this._timelineElements.indexOf(selectedItem);
    selectedItem.selected = true;
    this.updateFilling(element);
    this._cdr.detectChanges();
  }

  initTimeline(timeLines: TimelineElement[]) {
    let eventsMinLapse = HorizontalTimelineComponent.minLapse(timeLines);
    // assign a left position to the single events along the timeline
    this.setDatePosition(timeLines, this._eventsMinDistance, eventsMinLapse);
    // assign a width to the timeline
    this.setTimelineWidth(timeLines, this._eventsMinDistance, eventsMinLapse);
    // the timeline has been initialize - show it
    this.loaded = true;
  }

  updateSlide(timelineTotWidth: number, forward: boolean) {
    let translateValue = HorizontalTimelineComponent.getTranslateValue(this.eventsWrapper.nativeElement);

    if (forward) {
      this.translateTimeline(translateValue - this._timelineWrapperWidth + this._eventsMinDistance, this._timelineWrapperWidth - timelineTotWidth)
    } else {
      this.translateTimeline(translateValue + this._timelineWrapperWidth - this._eventsMinDistance, null);
    }
  }

  updateTimelinePosition(element: Element) {
    let eventStyle = window.getComputedStyle(element);
    let eventLeft = HorizontalTimelineComponent.pxToNumber(eventStyle.getPropertyValue('left'));
    let translateValue = HorizontalTimelineComponent.getTranslateValue(this.eventsWrapper.nativeElement);

    if (eventLeft > this._timelineWrapperWidth - translateValue) {
      this.translateTimeline(-eventLeft + this._timelineWrapperWidth / 2, this._timelineWrapperWidth - this.eventsWrapperWidth);
    }
  }

  translateTimeline(value: number, totWidth: number | null) {
    // only negative translate value
    value = (value > 0) ? 0 : value;
    // do not translate more than timeline width
    value = ( !(totWidth === null) && value < totWidth ) ? totWidth : value;
    HorizontalTimelineComponent.setTransformValue(this.eventsWrapper.nativeElement, 'translateX', value + 'px');
    // update navigation arrows visibility
    this.prevLinkInactive = value === 0;
    this.nextLinkInactive = value === totWidth;
  }

  setTimelineWidth(elements: TimelineElement[], width: number, eventsMinLapse: number) {
    let timeSpan = 100;
    if (elements.length > 1) {
      timeSpan = HorizontalTimelineComponent.dayDiff(elements[0].date, elements[elements.length - 1].date);
    }
    let timeSpanNorm = timeSpan / eventsMinLapse;
    timeSpanNorm = Math.round(timeSpanNorm) + 4;
    this.eventsWrapperWidth = timeSpanNorm * width;
    let aHref = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];
    this.updateFilling(aHref);
    this.updateTimelinePosition(aHref);
    return this.eventsWrapperWidth;
  }

  private updateFilling(element: any) {
    // change .filling-line length according to the selected event
    let eventStyle = window.getComputedStyle(element);
    let eventLeft = eventStyle.getPropertyValue('left');
    let eventWidth = eventStyle.getPropertyValue('width');
    let eventLeftNum = HorizontalTimelineComponent.pxToNumber(eventLeft) + HorizontalTimelineComponent.pxToNumber(eventWidth) / 2;
    let scaleValue = eventLeftNum / this.eventsWrapperWidth;
    HorizontalTimelineComponent.setTransformValue(this.fillingLine.nativeElement, 'scaleX', scaleValue);
  }

  private initView(): void {
    if (!this._viewInitialized) {
      return;
    }

    if (this._timelineElements && this._timelineElements.length) {
      for (let i = 0; i < this._timelineElements.length; i++) {
        if (this._timelineElements[i].selected) {
          this.selectedIndex = i;
          break;
        }
      }
      this.initTimeline(this._timelineElements);
    }
    this._cdr.detectChanges();
  }

  private setDatePosition(elements: TimelineElement[], min: number, eventsMinLapse: number) {
    let timelineEventsArray = this.timelineEvents.toArray();
    let i: number = 0;
    for (let component of elements) {
      let distance = HorizontalTimelineComponent.dayDiff(elements[0].date, component.date);
      let distanceNorm = Math.round(distance / eventsMinLapse);
      timelineEventsArray[i].nativeElement.style.left = distanceNorm * min + 'px';
      // span
      let span: HTMLSpanElement = <HTMLSpanElement>timelineEventsArray[i].nativeElement.parentElement.children[1];
      let spanWidth = HorizontalTimelineComponent.getElementWidth(span);
      span.style.left = distanceNorm * min + spanWidth / 2 + 'px';
      i++;
    }
  }
}
