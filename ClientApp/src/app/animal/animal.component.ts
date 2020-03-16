import { Component, OnInit } from '@angular/core';
import { interval, Subject, ConnectableObservable, of, concat, empty, Observable } from 'rxjs';
import { take, multicast, publish, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  take: number

  constructor() { }

  ngOnInit() {
    this.take = 1;
  }

  unicast() {
    let source4$ = interval(1000).pipe(take(this.take));

    source4$.subscribe(val => {
      console.log(`Observer 1: ${val}`);
    });

    setTimeout(function () {
      source4$.subscribe(val => {
        console.log(`Observer 2: ${val}`);
      });
    }, 1000);

    setTimeout(function () {
      source4$.subscribe(val => {
        console.log(`Observer 3: ${val}`);
      });
    }, 2000);
  }

  multicast() {
    let source4$ = interval(1000).pipe(take(this.take), multicast(new Subject())) as ConnectableObservable<number>;

    source4$.subscribe(val => {
      console.log(`Observer 1: ${val}`);
    });

    setTimeout(function () {
      source4$.subscribe(val => {
        console.log(`Observer 2: ${val}`);
      });
    }, 1000);
    setTimeout(function () {
      source4$.subscribe(val => {
        console.log(`Observer 3: ${val}`);
      });
    }, 1000);

    source4$.connect();
  }

  source = of(1, 2, 3, 4, 5);
  source2 = of('a', 'b', 'c');


  oneAfterOne() {
    
    var one = this.source.pipe(take(3));
    var two = this.source2.pipe(take(2));
    concat(one, two).subscribe(data => {
      console.log(data);
    });
  }

  oneAfterOnePublishConnect() {
    var one = this.source.pipe(take(2));
    var two = this.source2.pipe(take(3), publish()) as ConnectableObservable<number>;
    two.subscribe(data => {
      console.log('data for two: ', data);
    });
    one.subscribe(function (data) {
      console.log('data for one: ', data);
    }, null, two.connect.bind(two));
  }

  oneAfterOneSwitchMap() {
    //var one = this.source.pipe(take(3));
    //var two = this.source2.pipe(take(2));
    //
    //one.pipe(
    //  tap(() => {
    //    this.take = 999;
    //    console.log('just reset this.take');
    //  }),
    //
    //  switchMap(() => {
    //
    //    two.subscribe(data => {
    //
    //    });
    //  })
    //);



    //);
    //.subscribe(data => {
    //  console.log('data for one: ', data);
    //})
  }

  switchMapPractice() {

    const char = of(
      o => {
        o.next('A');
        setTimeout(() => o.next('B'), 200);
        setTimeout(() => o.complete(), 300);
      }
    );

    const one = Observable.create(
      o => {
        o.next('A');
        setTimeout(() => o.next('B'), 200);
        setTimeout(() => o.complete(), 300);
      }
    );


    const two = interval(50).pipe(take(5));

    one.pipe(
      tap(x => console.log(`from one: ${x}`)),
      switchMap(() => two)
    ).subscribe(
      val => console.log(`from two: ${val}`), null, () => console.log('complete')
    );
  }

}
