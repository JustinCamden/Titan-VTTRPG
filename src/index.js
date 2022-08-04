import './styles/Fonts.scss';
import './styles/Variables.scss';
import './styles/Global.scss';
import './styles/Mixins.scss';
import { TITANCONSTANTS } from "./helpers/Constants.js";
import { TITANLOCAL } from "./helpers/Local.js";
import { registerSystemSettings } from "./helpers/RegisterSystemSettings.js";
import { TitanActor } from "./actor/Actor";
import TitanPlayerSheet from "./actor/player/sheet/PlayerSheet";
import TitanWeaponSheet from "./item/weapon/sheet/WeaponSheet";
import ChatMessageShell from "./chat-message/ChatMessageShell.svelte";


Hooks.once("init", async () => {
   console.log("TITAN | Starting Titan VTTRPG System");

   // Add custom constants for easy access
   CONFIG.TITAN = {
      constants: TITANCONSTANTS,
      local: TITANLOCAL,
   };

   // Register Document Classes
   CONFIG.Actor.documentClass = TitanActor;

   // Register Sheet Classes
   Actors.registerSheet("titan", TitanPlayerSheet, {
      types: ["player"],
      makeDefault: true,
   });
   Items.registerSheet("titan", TitanWeaponSheet, {
      types: ["weapon"],
      makeDefault: true,
   });

   // Register system settings
   registerSystemSettings();

   return;
});

Hooks.on('renderChatMessage', (message, html) => {
   // Check if this is a valid titan chat message
   const messageData = message.getFlag('titan', 'data');
   const validTypes = new Set(['attributeCheck', 'skillCheck', 'resistanceCheck', 'attackCheck']);
   if (validTypes.has(messageData?.chatContext?.type)) {
      // If so, display the message
      new ChatMessageShell({ target: html[0], props: messageData });
   }
});

