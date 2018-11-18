import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})


export class HelloIonicPage {
  constructor(public navCtrl: NavController) {
  

  }
    goToChat() {
        console.log("chat page")
        this.navCtrl.push(ChatPage)
    }

}
