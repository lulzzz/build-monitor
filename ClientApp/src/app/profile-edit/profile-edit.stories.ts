﻿import { storiesOf, moduleMetadata } from '@storybook/angular';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {ProfileEditComponent} from "./profile-edit.component";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {DataService} from "../data.service";
import {BuildServer, BuildServerType} from "../data-contracts";

const router = RouterTestingModule.withRoutes(
  [{path: '**', component: ProfileEditComponent}]
)
storiesOf('Profile edit component', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MonacoEditorModule.forRoot(), router]
    })
  )
  .add('Add new', () => ({
    component: ProfileEditComponent,
    props: {
      isNewMode: true
    },
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({mode: 'new'})}}
        },
      ]
    }
  }))
  .add('Edit', () => ({
    component: ProfileEditComponent,
    props: {
      isNewMode: true
    },
    moduleMetadata: {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({mode: 'edit'})}}
        },
        {
          provide: DataService,
          useValue: {
            getProfile: ()=> new DataService().createSampleProfile(),
            getBuildServers():BuildServer []{
              return [
                {id: "1", name: "teamcity", description: "test desc", config: "...", type: BuildServerType.TeamCity},
                {id: "2", name: "jenkins", description: "empty desc", config: "...", type: BuildServerType.TeamCity}
              ]
            }
          }
        }
      ]
    }
  }));
