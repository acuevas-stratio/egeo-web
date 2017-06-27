import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {ApiDoc, TYPES} from 'shared';
import {StRadioMenuOption} from '@stratio/egeo';

@Component({
   selector: 'radio-menu-example',
   templateUrl: 'radio-menu.component.html',
   styleUrls: ['radio-menu.component.scss']
})

export class RadioMenuComponent {
   options: Array<StRadioMenuOption>;
   selectedOptionTheme1: StRadioMenuOption;
   selectedOptionTheme2: StRadioMenuOption;
   apiDoc: ApiDoc;

   constructor() {

      this.options = [{label: 'Service', value: 'service'}, {label: 'Nodes', value: 'nodes'}, {label: 'Casandra', value: 'cassandra'}];

      this.apiDoc = {
         title: 'Radio Menu',
         description: 'The Radio Menu is composed of options with radios. Generally, It is used in forms in order to change' +
         ' a certain part of them. You must keep in mind the radio menu adapts its design according to his parent\'s theme.' +
         ' By default, if parent does not have any theme, it will be designed according to the gray 2 theme.',
         haveModel: false,
         apiSection: {
            description: 'This table gives you a quick overview of the inputs and outputs of a radio menu.',
            inputs: [
               {
                  paramName: 'activeOption',
                  type: TYPES.OBJ,
                  required: false,
                  details: 'Current active option'
               },
               {
                  paramName: 'options',
                  type: TYPES.ARRAY_OBJ,
                  required: true,
                  details: 'Array of string with options, option names must be translated'
               },
               {
                  paramName: 'qaTag',
                  type: TYPES.STR,
                  required: false,
                  details: 'Identifier to generate a qa tag for each option'
               },
               {
                  paramName: 'theme',
                  type: TYPES.STR,
                  required: false,
                  details: 'String representing the theme (css class) to be applied to the radio menu component. Possible values are theme-gray-1 / theme-gray-2'
               }
            ],
            outputs: [
               {
                  paramName: 'changedOption',
                  type: TYPES.OBJ,
                  required: false,
                  details: 'Event emitted when the active option is changed. This event has the selected option as param.'
               }
            ]
         },
         exampleDesc: `Next, you can see an example of radio menu in gray-1 and gray-2 themes.`
      };
   }
}
