import { TJSDialog } from '@typhonjs-fvtt/runtime/svelte/application';
import { localize } from '~/helpers/Utility.js';
import AttributeCheckDialogShell from './AttributeCheckDialogShell.svelte';
export default class AttributeCheckDialog extends TJSDialog {
   constructor(actor, options) {
      super(
         {
            title: `${localize('attributeCheck')} (${actor.name})`,
            content: {
               class: AttributeCheckDialogShell,
               props: {
                  options: options,
                  actor: actor,
               },
            },
            zIndex: null,
            id: `dialog-${actor.name}`,
         },
         {
            width: 350,
            height: 490,
            classes: game.settings.get('titan', 'darkModeSheets') === true ? ['titan', 'titan-dark-mode'] : ['titan']
         },
      );
   }
}
