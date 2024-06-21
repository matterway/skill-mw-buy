import {Context} from '@matterway/sdk';
import {successStep} from 'steps/@success';
import {askForItemAndBudgetStep} from './askForItemAndBudget';
import {openWebsitesStep} from './openWebsites';

// DO NOT add your automation in this step. Rather, create another step from
// `_template.tsx`, and call them here

export async function startStep(ctx: Context) {
  console.log('step: startStep');

  const data = await askForItemAndBudgetStep(ctx);
  const results = await openWebsitesStep(ctx, data);

  await successStep(ctx, results);
}
