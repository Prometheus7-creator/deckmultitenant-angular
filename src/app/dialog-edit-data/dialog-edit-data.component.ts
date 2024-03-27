import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TenantsService } from '../tenants.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-dialog-edit-data',
  templateUrl: './dialog-edit-data.component.html',
  styleUrls: ['./dialog-edit-data.component.scss'],
})
export class DialogEditDataComponent {
  data = {
    id: '',
    iconHeader: '',
    iconFooter: '',
    companyIdentifier: '',
  };

  logoFile: File | null = null;
  headerFile: File | null = null;
  footerFile: File | null = null;
  storedUsername: string | null = null;
  logoPreviewUrl: string | null = null;
  footerPreviewUrl: string | null = null;
  headerPreviewUrl: string | null = null;
  private _event: any;

  isSaving: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditDataComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private tenantsService: TenantsService,
    private toast: HotToastService,
    public loginService: LoginService
  ) {
    this.data = { ...dialogData };

    const icons = dialogData?.icons;
    if (icons) {
      this.logoPreviewUrl = icons.logoUrl || null;
      this.headerPreviewUrl = icons.header || null;
      this.footerPreviewUrl = icons.footer || null;
    }
  }

  ngOnInIt() {
    const storedUsername = localStorage.getItem('loggedInUsername');
    if (storedUsername) {
      // If available, set it to the component property
      this.storedUsername = storedUsername;
    } else {
      // Otherwise, get it from the service and store it
      this.storedUsername = this.loginService.currentlyLoggedInUsername;
      localStorage.setItem('loggedInUsername', this.storedUsername);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onFileSelected(type: string, event: any) {
    // const file = event.target.files && event.target.files[0];
    const file: File = event.target.files && event.target.files[0];
    if (type === 'companyLogo') {
      this.logoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this._event = event;
    } else if (type === 'reportHeader') {
      this.headerFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.headerPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this._event = event;
    } else if (type === 'reportFooter') {
      this.footerFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.footerPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this._event = event;
    }
  }

  async submitData() {
    if (this.formValidator()) {
      this.isSaving = true;
      let dataHeader = {
        entityName: 'header',
        uploader: 'anshgr',
        containerName: this.data.companyIdentifier
          .replace(/\s+/g, '')
          .toLowerCase(),
        picture: this.headerFile,
        id: this.data.id,
      };

      let dataFooter = {
        entityName: 'footer',
        uploader: 'anshgr',
        containerName: this.data.companyIdentifier
          .replace(/\s+/g, '')
          .toLowerCase(),
        picture: this.footerFile,
        id: this.data.id,
      };

      let dataLogo = {
        entityName: 'logo',
        uploader: 'anshgr',
        containerName: this.data.companyIdentifier
          .replace(/\s+/g, '')
          .toLowerCase(),
        picture: this.logoFile,
        id: this.data.id,
      };

      const iconsData: any = {};
      iconsData['logoUrl'] = this.logoPreviewUrl
      iconsData['footer'] = this.footerPreviewUrl
      iconsData['header'] = this.headerPreviewUrl

      // console.log(iconsData, "Icond-data-before");

      try {
        if (this.footerFile) {
          const response = await this.tenantsService
            .uploadFile(dataFooter)
            .toPromise();
          iconsData['footer'] = response.url;
        }

        if (this.headerFile) {
          const response = await this.tenantsService
            .uploadFile(dataHeader)
            .toPromise();
          iconsData['header'] = response.url;
        }

        if (this.logoFile) {
          const response = await this.tenantsService
            .uploadFile(dataLogo)
            .toPromise();
          iconsData['logoUrl'] = response.url;
        }

      // console.log(iconsData, "Icond-data-after");
        
        // console.log('URL', iconsData);

        // Call the API for updating or adding icons for a tenant
        const apiResponse = await this.tenantsService
          .upsertIcons(this.data.id, iconsData)
          .toPromise();
        console.log(apiResponse);

        this.isSaving = false;
        this.dialogRef.close(); // Close the dialog after a successful update
      } catch (error) {
        console.error('Error during file uploads or upsertIcons:', error);
        this.isSaving = false;
        alert('Failed to update or add icons for the tenant!');
      }
    } else {
      this.toast.error('Please complete the form with valid data!');
    }
  }

  formValidator() {
    return true; // Implement your validation logic
  }
}
