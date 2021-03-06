import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService, SettingsType } from 'app/services/settings.service';
import { EventsService } from 'app/services/events.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html'
})
export class SettingsModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  public settings: SettingsType;

  constructor(private modalService: NgbModal, private settingsService: SettingsService, private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.settingsModalEvents.subscribe(() => {
      this.modalService.open(this.modal, { backdrop: 'static' }).result.then((result) => {
        this.closed.emit();
      }, (reason) => { });
    });

    this.settingsService.settingsReady.subscribe((ready) => {
      if (ready) {
        this.settings = this.settingsService.settings;
      }
    });
  }

  public settingsUpdated(settingName: string) {
    this.settingsService.settingsUpdateEvents.next({
      settings: this.settings,
      callback: () => { }
    });
  }
}
