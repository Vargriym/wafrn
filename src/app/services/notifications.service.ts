import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Follower } from '../interfaces/follower';
import { Reblog } from '../interfaces/reblog';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  lastTimeChecked: Date = new Date();

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { }

  async getNotifications(): Promise<{follows: Follower[], reblogs: Reblog[], mentions: Reblog[]}> {
    this.lastTimeChecked = new Date();
    let res: {follows: Follower[], reblogs: Reblog[], mentions: Reblog[]} = { follows: [], reblogs: [], mentions: []};
    const notificaitons: {follows: Follower[], reblogs: Reblog[], mentions: Reblog[]} | undefined = await this.http.get<{follows: Follower[], reblogs: Reblog[], mentions: Reblog[]}>(environment.baseUrl + '/notifications', {}).toPromise();
    if(notificaitons) {
      res = notificaitons;
      res.reblogs = res.reblogs.filter((elem) => elem.user.id != this.jwt.getTokenData().userId );
      const postIds = res.reblogs.map((elem) => elem.id);
      res.reblogs = res.reblogs.filter((elem, index) => postIds.indexOf(elem.id) === index);
      res.reblogs = res.reblogs.sort((a, b) => new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate());
    }
    return res;
  }

  async markNotificationsRead(): Promise<boolean> {
    let res = false;
    const payload: FormData = new FormData();
    payload.append('time', this.lastTimeChecked.getTime().toString());
    const response = await this.http.post(environment.baseUrl + '/readNotifications', payload).toPromise();
    if(response) {
      res = true;
    }
    return res;
  }
}
