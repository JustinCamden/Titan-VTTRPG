<script>
   import { getContext } from "svelte";
   import { slide } from "svelte/transition";
   import DocumentSelect from "~/documents/components/select/DocumentSelect.svelte";
   import IconButton from "~/helpers/svelte-components/button/IconButton.svelte";
   import onRulesElementOperationChanged from "./RulesElementUpdateOperation";
   import DocumentIntegerInput from "~/documents/components/input/DocumentIntegerInput.svelte";

   // Setup context variables
   const document = getContext("DocumentStore");

   // Application reference
   const application = getContext("external").application;

   export let operationOptions = void 0;
   export let idx = void 0;

   // Dynamic element
   $: element = $document.system.rulesElement[idx];

   // Setup tabs
</script>

{#if element && element.operation === "turnStartStamina"}
   <div class="element" transition:slide|local>
      <!--Element Operation-->
      <div class="settings">
         <div class="field select">
            <DocumentSelect
               options={operationOptions}
               bind:value={element.operation}
               on:change={() => {
                  onRulesElementOperationChanged($document, idx);
               }}
            />
         </div>

         <!--Value-->
         <div class="field number">
            <DocumentIntegerInput bind:value={element.mod} />
         </div>
      </div>

      <!--Delete Element-->
      <div class="delete-button">
         <IconButton
            icon={"fas fa-trash"}
            on:click={() => {
               application.removeRulesElement(idx);
            }}
         />
      </div>
   </div>
{/if}

<style lang="scss">
   @import "../../../Styles/Mixins.scss";

   .element {
      @include flex-row;
      @include flex-space-between;
      @include border;
      @include panel-1;
      width: 100%;
      height: 100%;

      .settings {
         @include flex-row;
         @include flex-group-left;
         flex-wrap: wrap;
         width: 100%;
         margin-bottom: 0.5rem;

         .field {
            @include flex-row;
            margin: 0.5rem 0.25rem 0 0.25rem;

            &.select {
               @include flex-group-left;
            }

            &.number {
               @include flex-group-center;
               width: 2rem;
            }
         }
      }

      .delete-button {
         @include flex-column;
         @include flex-group-top;
         height: 100%;
         margin: 0.5rem 0.25rem 0 0;
      }
   }
</style>
