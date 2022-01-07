import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFragmentComponent } from './post-fragment/post-fragment.component';
import { PostComponent } from './post/post.component';
import { WafrnMediaComponent } from './wafrn-media/wafrn-media.component';
import {EditorModule} from 'primeng/editor';
import {DividerModule} from 'primeng/divider';
import {AvatarModule} from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import { InjectHTMLDirective } from '../directives/inject-html.directive';

@NgModule({
  declarations: [
    PostFragmentComponent,
    PostComponent,
    WafrnMediaComponent,
    InjectHTMLDirective
  ],
  imports: [
    CommonModule,
    EditorModule,
    DividerModule,
    AvatarModule,
    CheckboxModule,
    AccordionModule,
    CardModule
    
    
  ],
  exports: [
    PostFragmentComponent,
    PostComponent,
    WafrnMediaComponent,
    InjectHTMLDirective

  ]
})
export class SharedWafrnModule { }