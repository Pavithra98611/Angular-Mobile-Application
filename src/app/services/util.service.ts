import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UtilService 
{
  loader: any;
  isLoading = false;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public router: Router,
    private navCtrl: NavController,
  ) {}
  async show() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async stop() 
  {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
  async warnin(msg) 
  {
    const alert = await this.alertCtrl.create({
      header: 'warning',
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }
  async alert(msg) 
  {
    const alert = await this.alertCtrl.create({
      header: 'warning',
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }
  async error(msg) 
  {
    const alert = await this.alertCtrl.create({
      header: 'error',
      message: msg,
      buttons: ['ok']
    });

    await alert.present();
  }
  async toast(msg, color, positon) 
  {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? color : 'primary',
      position: positon
    });
    toast.present();
  }
  async errorToast(msg) 
  {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  apiErrorHandler(err) 
  {
    if (err.status === -1) 
    {
      this.error('Failed To Connect With Server');
    } 
    else if (err.status === 401) 
    {
      this.error('Unauthorized Request!');
      this.navCtrl.navigateRoot('/login');
    } 
    else if (err.status === 500) 
    {
      this.error('Somethimg Went Wrong..');
    }
  }
}
