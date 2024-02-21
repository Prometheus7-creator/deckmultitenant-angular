import { Tenant } from './../models/tenant';
import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditDescriptionComponent } from '../dialog-edit-description/dialog-edit-description.component';
import { DialogEditDiskSpaceComponent } from '../dialog-edit-disk-space/dialog-edit-disk-space.component';
import { DialogEditValidityComponent } from '../dialog-edit-validity/dialog-edit-validity.component';
import { DialogEditAllowedUserComponent } from '../dialog-edit-allowed-user/dialog-edit-allowed-user.component';
import { DialogEditExpensesComponent } from '../dialog-edit-expenses/dialog-edit-expenses.component';
import { DialogEditWebsiteComponent } from '../dialog-edit-website/dialog-edit-website.component';
import { AdminSignupComponent } from '../admin-signup/admin-signup.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TenantsService } from '../tenants.service';
import { DialogEditDataComponent } from '../dialog-edit-data/dialog-edit-data.component';
import { TenantDetailComponent } from '../tenant-detail/tenant-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users$: any | null[];
  searchText: string;
  numberOfClients: number = 0;
  companyInput: boolean = false;
  cityInput: boolean = false;
  genderInput: boolean = false;
  queryParam: string = '';
  isTenantActive: boolean = true;

  /**
   *
   * @param usersService The UsersService is injected to access client data and perform CRUD operations.
   * @param dialog The MatDialog service is injected to open pre-styled material design dialogs.
   * @param router Router gets injected to enable direct URL navigation.
   */
  constructor(
    public usersService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private tenantsService: TenantsService
  ) {
    this.tenantsService.getAllTenants().subscribe(
      (res) => {
        this.users$ = res.Tenants;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   *
   * @param id string; Client ID so user can click on client to see detailed information.
   */
  showUserDetail(id: string) {
    this.router.navigateByUrl(`/users/${id}`);
  }

  // openDetailsComponent(user: any): void {
  //   // console.log("details", user);
    
  //   const dialogRef = this.dialog.open(TenantDetailComponent, {
  //     width: '1000px',
  //     data: user
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The details dialog was closed');
  //   });
  // }

  openDetailsComponent(user: any) {
    this.router.navigateByUrl(`/details/${user}`);
  }

  openAdminDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        console.log(existingData.Tenant.companyIdentifier);
        const dialogRef = this.dialog.open(AdminSignupComponent, {
          data: {
            // ...existingData.Tenant,
            companyIdentifier: existingData.Tenant.companyIdentifier,
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditDialog(tenantId: string) {
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData.Tenant.companyIdentifier);
        const dialogRef = this.dialog.open(DialogEditDataComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditDesDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData);
        const dialogRef = this.dialog.open(DialogEditDescriptionComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditDiskSpDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData);
        const dialogRef = this.dialog.open(DialogEditDiskSpaceComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditValDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData);
        const dialogRef = this.dialog.open(DialogEditValidityComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditUserDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData);
        const dialogRef = this.dialog.open(DialogEditAllowedUserComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditExpDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData);
        const dialogRef = this.dialog.open(DialogEditExpensesComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openEditWebDialog(tenantId: string) {
    // Fetch the existing data for the selected tenant using tenantId
    // console.log(tenantId);
    this.tenantsService.getTenantById(tenantId).subscribe(
      (existingData) => {
        // console.log(existingData);
        const dialogRef = this.dialog.open(DialogEditWebsiteComponent, {
          data: {
            ...existingData.Tenant, // spread existing data properties
            id: tenantId, // make sure 'id' is set in the data
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.tenantsService.getAllTenants().subscribe(
            (res) => {
              this.users$ = res.Tenants;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.tenantsService.getAllTenants().subscribe(
        (res) => {
          this.users$ = res.Tenants;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  /**
   * Function to search individual user
   */
  searchUser() {
    this.users$ = this.users$.pipe(
      map((users: any[]) =>
        users.filter(
          (user) =>
            user.firstname
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            user.lastname.toLowerCase().includes(this.searchText.toLowerCase())
        )
      )
    );
  }

  sendMail(mail: string) {
    window.location.href = `mailto:${mail}`;
  }

  /**
   * Logic to filter clients according to certain criteria.
   */

  /**
   * @param clickedCheckbox string; Checks which filter has been chosen by the user. Toggles the display of the corresponding input fields.
   */

  onCheckboxClicked(clickedCheckbox: string) {
    this.queryParam = '';
    if (clickedCheckbox === 'company') {
      this.cityInput = false;
      this.genderInput = false;
    } else if (clickedCheckbox === 'city') {
      this.companyInput = false;
      this.genderInput = false;
    } else if (clickedCheckbox === 'gender') {
      this.companyInput = false;
      this.cityInput = false;
    }
  }

  applyFilter() {
    if (this.queryParam != '') {
      let paramType: string;
      if (this.companyInput) {
        paramType = 'company';
      } else if (this.cityInput) {
        paramType = 'city';
      } else if (this.genderInput) {
        paramType = 'gender';
      }

      // this.users$ = this.users$.pipe(
      //   map((users: any[]) =>
      //     users.filter((user) =>
      //       user[`${paramType}`]
      //         .toLowerCase()
      //         .includes(this.queryParam.toLowerCase())
      //     )
      //   )
      // );
    }
  }

  DeleteTenant(tenantId: string): void {
    this.tenantsService.deleteTenantPermanently(tenantId).subscribe(
      (response) => {
        console.log('Tenant deleted successfully:', response);
        window.location.reload();
        // Handle success, if needed
      },
      (error) => {
        console.error('Error deleting tenant:', error);
        // Handle error, if needed
      }
    );
  }

  toggleStatus(tenantId: string) {
    this.tenantsService
      .toggleAccessForTenant(tenantId, !this.isTenantActive)
      .subscribe(
        (response) => {
          console.log('Tenant status toggled successfully:', response);
          // Update the current status after successful toggle
          this.isTenantActive = !this.isTenantActive;
        },
        (error) => {
          console.error('Error toggling tenant status:', error);
          // Handle error, e.g., show an error message
        }
      );
  }

  resetFilter() {
    // this.users$ = this.tenantsService.getAllTenants();
    this.queryParam = '';
  }
}
