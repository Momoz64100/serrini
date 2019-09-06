import { Component, OnInit } from '@angular/core';
import { MissionsReports } from 'src/app/entities/missions-reports';
import { MissionsReportsService } from 'src/app/services/missions-reports.service';
import { Globals } from 'src/app/globals';
import { UserService } from 'src/app/services/user.service';
import { activeDatePicker, concatUserName } from 'src/app/helpers/utils';
import { orderByArrayDesc } from 'src/app/helpers/array-utils';
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
    public globals: Globals,
    private missionsReportsService: MissionsReportsService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    activeDatePicker('#date-rapport .input-group.date');

    this.missionsReportsService.getMissions().subscribe(data => {
      this.missions = data;
      orderByArrayDesc(this.missions, "creationDate");
      this.userService.updateReportReaded(this.globals.currentUser.id);
    });
  }

  createMission() {
    this.currentMission.isConfidential = false;
    this.currentMission.user = concatUserName(this.globals.currentUser.prenom, this.globals.currentUser.nom);
    this.currentMission.date = $('#date').val();
    this.missionsReportsService.createMission(this.currentMission);
    this.userService.updateAllUserNewReport();
    this.currentMission = {};
  }

  deleteRapport(id: string) {
    this.missionsReportsService.deleteMission(id);
  }
}
