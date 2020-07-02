import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, merge, of, range, BehaviorSubject, Subject } from 'rxjs';
import { mapTo, scan, switchMap, takeUntil, concatMap, delay, mergeMap, tap, skipWhile, map } from 'rxjs/operators';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { InputToCountdownDirective } from 'src/app/directives/input-to-countdown.directive';
import { SynthesisService } from 'src/app/services/synthesis.service';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector   : 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls    : ['./countdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountdownComponent implements OnInit, OnDestroy
{
  @Input('eventDate')
  eventDate;
  countdown: any;
  @ViewChild('start', { static: true })
  startBtn: ElementRef;
  @ViewChild('pause', { static: true })
  pauseBtn: ElementRef;
  @ViewChild('reset', { static: true })
  resetBtn: ElementRef;

  private _unsubscribeAll: Subject<any>;
  constructor()
  {
    // Set the defaults
    this.countdown = {
      days   : '',
      hours  : '',
      minutes: '',
      seconds: ''
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void
  {
    const currDate = moment();
    const eventDate = moment(this.eventDate);
    const start$ = fromEvent(this.startBtn.nativeElement, 'click').pipe(mapTo(true));
    const pause$ = fromEvent(this.pauseBtn.nativeElement, 'click').pipe(mapTo(false));
    const reset$ = fromEvent(this.resetBtn.nativeElement, 'click').pipe(mapTo(null));
    // Get the difference in between the current date and event date in seconds
    let diff = eventDate.diff(currDate, 'seconds');
    // Calculate the remaining time for the first time so there will be no
    // delay on the countdown
    this.countdown = this._secondsToRemaining(diff);
    // Create a subscribable interval
    const countDown = interval(1000)
      .pipe(
        map(value => {
          return diff = diff - 1;
        }),
        map(value => {
          return this._secondsToRemaining(value);
        })
      );

    // Subscribe to the countdown interval
    countDown
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.countdown = value;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * Converts given seconds to a remaining time
   */
  private _secondsToRemaining(seconds): any
  {
    const timeLeft = moment.duration(seconds, 'seconds');

    return {
      days   : timeLeft.asDays().toFixed(0),
      hours  : timeLeft.hours(),
      minutes: timeLeft.minutes(),
      seconds: timeLeft.seconds()
    };
  }

}
