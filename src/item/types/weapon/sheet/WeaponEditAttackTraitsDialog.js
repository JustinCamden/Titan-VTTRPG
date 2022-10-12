import { TJSDialog } from '@typhonjs-fvtt/runtime/svelte/application';
import WeaponEditAttackTraitsDialogShell from './WeaponEditAttackTraitsDialogShell.svelte';
export default class WeaponEditAttackTraitsDialog extends TJSDialog {
   constructor(document, attackIdx) {
      super(
         {
            title: `${document.name}: ${document.system.attack[attackIdx].label}`,
            content: {
               class: WeaponEditAttackTraitsDialogShell,
               props: {
                  attackIdx: attackIdx,
                  document: document,

               },
            },
            zIndex: null,
            id: `dialog-${document.name}`,
            classes: ['titan'],
         },
         {
            width: 320,
            height: 470,
         },
      );
   }
}
