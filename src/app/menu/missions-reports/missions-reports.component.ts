import { Component, OnInit } from '@angular/core';
import { MissionsReports } from 'src/app/entities/missions-reports';
import { MissionsReportsService } from 'src/app/services/missions-reports.service';
import { Globals } from 'src/app/globals';
import { UserService } from 'src/app/services/user.service';
import { activeDatePicker, concatUserName } from 'src/app/helpers/utils';
import { orderByArrayDesc, orderByArrayAsc } from 'src/app/helpers/array-utils';
import { ReportsFeed } from 'src/app/entities/reports-feed';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-missions-reports',
  templateUrl: './missions-reports.component.html',
  styleUrls: ['./missions-reports.component.scss']
})
export class MissionsReportsComponent implements OnInit {
  missions: MissionsReports[];
  reportFeed: ReportsFeed[];
  currentMission: MissionsReports = {};
  currentFeed: ReportsFeed = {};
  loadFeeds: boolean = true;

  constructor(
    public globals: Globals,
    private missionsReportsService: MissionsReportsService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    activeDatePicker('#date-rapport .input-group.date');

    this.missionsReportsService.getMissions().subscribe(data => {
      this.missions = data.map(x => {
        var readedValues = this.fillReadedValues(x.payload.doc.get('usersMissionMessagesReaded'), x.payload.doc.get('usersMissionReaded'));

        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data(),
          missionLabel: readedValues[0],
          missionClass: readedValues[1],
        } as MissionsReports
      });

      orderByArrayDesc(this.missions, "creationDate");
    });

    this.userService.updateReportReaded(this.globals.currentUser.id);
  }

  fillFeed(reportId: string) {
    this.missionsReportsService.updateViewMission(reportId, this.globals.currentUser.id).finally(() => {
      this.missionsReportsService.getFeedByReportId(reportId).subscribe(data => {
        if (this.loadFeeds) {
          console.log("getFeedByReportId");
          this.reportFeed = data.map(x => {
            var minutesAgo = Math.floor(((new Date().getTime() - new Date(x.payload.doc.get('creationDate').seconds * 1000).getTime()) / 1000 / 60) << 0);
            var hoursAgo = Math.floor(minutesAgo / 60);
            var dbDate = new Date(x.payload.doc.get('creationDate').seconds * 1000).toLocaleDateString();
            var dateEquals = new Date().toLocaleDateString() == dbDate;

            return {
              id: x.payload.doc.id,
              ...x.payload.doc.data(),
              date: dateEquals ? 'Aujourd\'hui' : dbDate,
              minutesAgo: !dateEquals ? "" : minutesAgo > 60 ? hoursAgo.toString() + " heures" : minutesAgo.toString() + " min",
            } as ReportsFeed
          }).sort((a, b) => a.creationDate > b.creationDate ? -1 : a.creationDate < b.creationDate ? 1 : 0);
          $('#view-report-' + reportId).modal('show');
        }
      });
    });
  }

  createMission() {
    this.currentMission.user = concatUserName(this.globals.currentUser.prenom, this.globals.currentUser.nom);
    this.currentMission.date = $('#date').val();
    this.missionsReportsService.createMission(this.currentMission, this.globals.currentUser.id);
    this.userService.updateAllUserNewReport();
    this.currentMission = {};
  }

  createNewFeed(reportId: string) {
    this.loadFeeds = false;
    this.currentFeed.username = concatUserName(this.globals.currentUser.prenom, this.globals.currentUser.nom);
    this.currentFeed.reportId = reportId;
    this.missionsReportsService.createFeed(this.currentFeed).finally(() => {
      this.userService.updateAllUserNewReport();
      this.missionsReportsService.updateReportsNewMessage(reportId, this.globals.currentUser.id).finally(() => {
        this.loadFeeds = true;
        this.currentFeed = {};
        $(".modal-backdrop").remove();
      });
    });
  }

  deleteRapport(id: string) {
    Swal.fire({
      title: "Es-tu sûr de toi ?",
      text: "Cette action est irréversible !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Oui, suppprimer !",
      cancelButtonText: "Annuler",
      reverseButtons: true,
      focusConfirm: false
    }).then((result) => {
      if (result.value) {
        this.missionsReportsService.deleteMission(id);
        Swal.fire({
          title: "Supprimé !",
          text: "Le rapport a été supprimé correctement",
          type: 'success',
        });
      }
    });
  }

  fillReadedValues(chaineUsersMissionMessagesReaded: string, chaineUsersMissionReaded: string) {
    var array = ["Public", "bg-green"]

    if (chaineUsersMissionMessagesReaded == undefined || chaineUsersMissionReaded == undefined)
      return array;

    if (!chaineUsersMissionMessagesReaded.includes(this.globals.currentUser.id)) 
      array = ["Nouveaux messages", "bg-orange"];
    if (!chaineUsersMissionReaded.includes(this.globals.currentUser.id)) 
      array = ["Nouveau", "bg-blue"];

    return array;
  }
}
