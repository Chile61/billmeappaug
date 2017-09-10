import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class Msgresponse {
    lang:any;

    errorNetwork:any;
    errorNetworkUnavailable:any;
    MsgCamera:any;
    MsgGallery:any;
    MsgPickerTitle:any;
    MsgPickerDismiss:any;
    MsgDownloading:any;
    MsgDownloadingBill:any;
    MsgReceiptBill:any;
    MsgDownloadComplete:any;
    MsgDownloadingLocalNotifyError3:any;
    MsgDownloadingLocalNotifyError2:any;
    MsgDownloadingLocalNotifyError1:any;
    MsgDownloadingLocalNotifySavedAt:any;
    MsgDownloadingLocalNotify:any;
    MsgDownloadingBillToast:any;
    constructor(
        public translateService: TranslateService
    ){

    }

    callErrorNetwork(){
        this.translateService.get('ComponentErrorNetwork').subscribe(
            value => {
                this.errorNetwork = value;
            }
        );
        return this.errorNetwork;
    }

    callErrorNetworkUnavailable(){
        this.translateService.get('ComponentErrorNetworkUnavailable').subscribe(
            value => {
                this.errorNetworkUnavailable = value;
            }
        );
        return this.errorNetworkUnavailable;
    }

    callMsgCamera(){
        this.translateService.get('ComponentMsgCamera').subscribe(
            value => {
                this.MsgCamera = value;
            }
        );
        return this.MsgCamera;
    }

    callMsgGallery(){
        this.translateService.get('ComponentMsgGallery').subscribe(
            value => {
                this.MsgGallery = value;
            }
        );
        return this.MsgGallery;
    }    

    callMsgPickerTitle(){
        this.translateService.get('ComponentMsgPickerTitle').subscribe(
            value => {
                this.MsgPickerTitle = value;
            }
        );
        return this.MsgPickerTitle;
    }

    callMsgPickerDismiss(){
        this.translateService.get('ComponentMsgPickerDismiss').subscribe(
            value => {
                this.MsgPickerDismiss = value;
            }
        );
        return this.MsgPickerDismiss;
    }

    callMsgDownloading(){
        this.translateService.get('ComponentMsgDownloading').subscribe(
            value => {
                this.MsgDownloading = value;
            }
        );
        return this.MsgDownloading;//Downloading...
    }

    callMsgDownloadingBill(){
        this.translateService.get('ComponentMsgDownloadingBill').subscribe(
            value => {
                this.MsgDownloadingBill = value;
            }
        );
        return this.MsgDownloadingBill;//'Downloading Bill...'
    }

    callMsgDownloadingBillToast(){
        this.translateService.get('ComponentMsgDownloadingBillToast').subscribe(
            value => {
                this.MsgDownloadingBillToast = value;
            }
        );
        return this.MsgDownloadingBillToast;//"Downloaded successfully! Saved in storage."
    }

    callMsgDownloadingLocalNotify(){
        this.translateService.get('ComponentMsgDownloadingLocalNotify').subscribe(
            value => {
                this.MsgDownloadingLocalNotify = value;
            }
        );
        return this.MsgDownloadingLocalNotify;//'Bill Download completed!'
    }

    callMsgDownloadingLocalNotifySavedAt(){
        this.translateService.get('ComponentMsgDownloadingLocalNotifySavedAt').subscribe(
            value => {
                this.MsgDownloadingLocalNotifySavedAt = value;
            }
        );
        return this.MsgDownloadingLocalNotifySavedAt;//Saved at Billme folder
    }

    callMsgDownloadingLocalNotifyError1(){
        this.translateService.get('ComponentMsgDownloadingLocalError1').subscribe(
            value => {
                this.MsgDownloadingLocalNotifyError1 = value;
            }
        );
        return this.MsgDownloadingLocalNotifyError1;//"Bill can not be downloaded, try again later."
    }

    callMsgDownloadingLocalNotifyError2(){
        this.translateService.get('ComponentMsgDownloadingLocalError2').subscribe(
            value => {
                this.MsgDownloadingLocalNotifyError2 = value;
            }
        );
        return this.MsgDownloadingLocalNotifyError2;//'Bill not able to download completely, try again'
    }

    callMsgDownloadingLocalNotifyError3(){
        this.translateService.get('ComponentMsgDownloadingLocalError3').subscribe(
            value => {
                this.MsgDownloadingLocalNotifyError3 = value;
            }
        );
        return this.MsgDownloadingLocalNotifyError3;//"Bill can not be downloaded, try again."
    }

    callMsgDownloadComplete(){
        this.translateService.get('ComponentMsgDownloadComplete').subscribe(
            value => {
                this.MsgDownloadComplete = value;
            }
        );
        return this.MsgDownloadComplete;//"Download completed!"
    }

    callMsgReceiptBill(){
        this.translateService.get('ComponentMsgReceiptBill').subscribe(
            value => {
                this.MsgReceiptBill = value;
            }
        );
        return this.MsgReceiptBill;//"Bill"
    }

    callMsgSettingSignout(){
        let MsgSettingSignout = 'Sign out';
        this.translateService.get('ComponentMsgSettingSignout').subscribe(
            value => {
                MsgSettingSignout = value;
            }
        );
        return MsgSettingSignout;
    }

    callMsgSettingSignoutMsg(){
        let MsgSettingSignoutMsg = 'Are you sure want to logout?';
        this.translateService.get('ComponentMsgSettingSignoutMsg').subscribe(
            value => {
                MsgSettingSignoutMsg = value;
            }
        );
        return MsgSettingSignoutMsg;
    }

    callMsgSettingCancel(){
        let MsgSettingCancel = 'Cancel';
        this.translateService.get('ComponentMsgSettingCancel').subscribe(
            value => {
                MsgSettingCancel = value;
            }
        );
        return MsgSettingCancel;
    }
    
    callMsgSettingProceed(){
        let MsgSettingProceed = 'Proceed';
        this.translateService.get('ComponentMsgSettingProceed').subscribe(
            value => {
                MsgSettingProceed = value;
            }
        );
        return MsgSettingProceed;
    }

    callMsgSettingConfirmDelete(){
        let MsgSettingConfirmDelete = 'Confirm to delete account';
        this.translateService.get('ComponentMsgSettingConfirmDelete').subscribe(
            value => {
                MsgSettingConfirmDelete = value;
            }
        );
        return MsgSettingConfirmDelete;
    }

    callMsgSettingConfirmDeleteMsg(){
        let MsgSettingConfirmDeleteMsg = 'Do you really want to delete account from BillMe, All data will be deleted?';
        this.translateService.get('ComponentMsgSettingConfirmDeleteMsg').subscribe(
            value => {
                MsgSettingConfirmDeleteMsg = value;
            }
        );
        return MsgSettingConfirmDeleteMsg;
    }

    callMsgSettingBtnNo(){
        let MsgSettingBtnNo = 'No';
        this.translateService.get('ComponentMsgSettingBtnNo').subscribe(
            value => {
                MsgSettingBtnNo = value;
            }
        );
        return MsgSettingBtnNo;
    }

    callMsgSettingBtnYes(){
        let MsgSettingBtnY = 'Yes';
        this.translateService.get('ComponentMsgSettingBtnYes').subscribe(
            value => {
                MsgSettingBtnY = value;
            }
        );
        return MsgSettingBtnY;
    }

    callMsgSettingBtnYesMsg(){
        let MsgSettingBtnYMsg = "This feature will be available soon";
        this.translateService.get('ComponentMsgSettingBtnYesMsg').subscribe(
            value => {
                MsgSettingBtnYMsg = value;
            }
        );
        return MsgSettingBtnYMsg;
    }
}