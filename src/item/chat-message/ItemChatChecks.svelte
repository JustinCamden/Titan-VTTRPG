<script>
   import { getContext } from "svelte";
   import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
   import OpposedCheckLabel from "~/helpers/svelte-components/OpposedCheckLabel.svelte";
   import ResistedByTag from "~/helpers/svelte-components/ResistedByTag.svelte";
   import StatTag from "~/helpers/svelte-components/StatTag.svelte";
   import AttributeTag from "~/helpers/svelte-components/AttributeTag.svelte";

   const document = getContext("DocumentSheetObject");
   const chatContext = $document.flags.titan.chatContext;

   function getTagFromCheck(check) {
      let retVal = localize(`LOCAL.${check.attribute}.label`);
      if (check.skill && check.skill !== "none") {
         retVal += ` (${localize(`LOCAL.${check.skill}.label`)})`;
      }
      retVal += ` ${check.difficulty}`;
      if (check.complexity) {
         retVal += `:${check.complexity}`;
      }

      return retVal;
   }
</script>

<!--Check-->
<div class="checks">
   {#each chatContext.system.check as check}
      <div class="check">
         <!--Check header-->
         <div class="header {check.attribute}">
            {check.label}
         </div>

         <div class="tags">
            <!--Main Check Stats -->
            <div class="tag">
               <AttributeTag label={getTagFromCheck(check)} attribute={check.attribute} />
            </div>

            <!--DC-->
            <div class="stat label" />

            <!--Resolve Cost-->
            {#if check.resolveCost > 0}
               <div class="tag">
                  <StatTag label={localize("LOCAL.resolveCost.label")} value={check.resolveCost} />
               </div>
            {/if}

            <!--Resistance Check-->
            {#if check.resistanceCheck !== "none"}
               <div class="tag">
                  <ResistedByTag resistance={check.resistanceCheck} />
               </div>
            {/if}

            <!--Opposed Check-->
            {#if check.opposedCheck.enabled}
               <div class="tag">
                  <OpposedCheckLabel opposedCheck={check.opposedCheck} />
               </div>
            {/if}
         </div>
      </div>
   {/each}
</div>

<style lang="scss">
   @import "../../Styles/Mixins.scss";

   .checks {
      @include flex-column;
      @include flex-group-top;
      width: 100%;

      .check {
         @include flex-column;
         @include flex-group-top;
         width: 100%;

         &:not(:first-child) {
            @include border-top;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
         }

         .header {
            @include flex-row;
            @include flex-group-center;
            @include border;
            @include attribute-colors;
            padding: 0.5rem;
            width: 100%;
            font-weight: bold;
            font-size: 1rem;
         }

         .tags {
            @include flex-row;
            @include flex-group-center;
            flex-wrap: wrap;
            .tag {
               margin: 0.5rem 0.25rem 0 0.25rem;
            }
         }
      }
   }
</style>