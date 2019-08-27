import { Component, OnInit } from '@angular/core';
import { MissionsReports } from 'src/app/entities/missions-reports';
import { MissionsReportsService } from 'src/app/services/missions-reports.service';
import { Globals } from 'src/app/globals';
import { MessageService } from 'src/app/services/message.service';
declare var $: any;

@Component({
  selector: 'app-missions-reports',
  templateUrl: './missions-reports.component.html',
  styleUrls: ['./missions-reports.component.scss']
})
export class MissionsReportsComponent implements OnInit {
  missions: MissionsReports[];
  currentMission: MissionsReports = {};

  constructor(
    private globals: Globals,
    private missionsReportsService: MissionsReportsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.currentMission.date = new Date().toLocaleDateString();
    $('#date-rapport .input-group.date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: true,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true,
      format: 'dd/mm/yyyy',
      locale: 'fr'
    }); 

    this.missionsReportsService.getMissions().subscribe(data => {
      this.missions = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as MissionsReports
      }).sort((a, b) => a.creationDate > b.creationDate ? -1 : a.creationDate < b.creationDate ? 1 : 0)
    });  
  }

  createMission() {
    this.currentMission.isConfidential = false;
    this.currentMission.user = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
    this.currentMission.date = $('#date').val();
    this.messageService.createMessage({
      user: "ADMIN",
      message: "Un nouveau rapport de mission vient d'être publié par " + this.currentMission.user + " !"
    });
    this.missionsReportsService.createMission(this.currentMission);
    this.currentMission = {};
  }

  deleteRapport(id: string) {
    this.missionsReportsService.deleteMission(id);
  }
}
