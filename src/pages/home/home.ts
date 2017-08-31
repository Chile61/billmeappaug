import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { HTTP } from '@ionic-native/http';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public http: Http
    ) {
     //this.mybills();
     /*this.http.get("http://dr-ambedkar.in/stuffs/billserver.php", {})
      .subscribe(data => {
        console.info(JSON.stringify(data));
        console.log(data['_body']);
       }, error => {
        console.error(JSON.stringify(error));// Error getting the data
      });*/
  }

  mybills(){
    let postParams = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    
  this.http.get("http://dr-ambedkar.in/stuffs/billserver.php", {})
      .subscribe(data => {
        console.info(JSON.stringify(data));
        console.log(data['_body']);
       }, error => {
        console.error(JSON.stringify(error));// Error getting the data
      });

      /**
       * var response = this.http.get(url).map(res => res.json());
        return response;
       */
  }

}
//unused