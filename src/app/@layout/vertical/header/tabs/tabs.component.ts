import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';
import { TabInterface } from '@app/@layout/vertical/header/tabs/tab.interface';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, AfterViewInit {
  tabs: TabInterface[] = [];
  selectedIndex = -1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.urlChange();
  }
  ngAfterViewInit() {

    setTimeout(function() {
      this.router.navigate([this.location.path()]);
    }.bind(this), 500);

  }

  closeTab(tab: TabInterface): void {
    const closedTabIndex = this.tabs.indexOf(tab);
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    if (closedTabIndex === this.selectedIndex) {
      if (closedTabIndex < this.tabs.length - 1) {
        this.navigateToTab(this.tabs[closedTabIndex - 1]);
      }
      if (closedTabIndex >= this.tabs.length - 1 && this.tabs.length > 0) {
        this.navigateToTab(this.tabs[closedTabIndex + 1]);
      }
    }
  }

  navigateToTab(tab: TabInterface) {
    this.router.navigateByUrl(tab.path).then((e) => {
      if (e) {
        this.selectedIndex = this.tabs.indexOf(tab);
      }
    });
  }

  urlChange() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/mhira/not-found' && event.url !== '/') {
          const pathFound = this.tabs.some((tab) => tab.path === event.url.slice(1));
          if (!pathFound) {
            const currentChild = this.activatedRoute.snapshot.firstChild;
            var tab = {
              path: event.url.slice(1),
              title: 'Untitled', // currentChild.data['title'],
            };
            if(currentChild.firstChild.children.length>0) {
              tab = {
                path: event.url.slice(1),
                title: currentChild.firstChild.children[0].data.title, // currentChild.data['title'],
              };
            }else{
              if(currentChild.firstChild.data){
                tab = {
                  path: event.url.slice(1),
                  title: currentChild.firstChild.data.title, // currentChild.data['title'],
                };
              }
            }

            this.tabs.push(tab);
            this.selectedIndex = this.tabs.indexOf(tab);
          } else {
            const tab = this.tabs.filter((tab) => {
              return tab.path === event.url.slice(1);
            })[0];
            this.selectedIndex = this.tabs.indexOf(tab);
            this.navigateToTab(tab);
          }
        }
      }
    });
  }
}
