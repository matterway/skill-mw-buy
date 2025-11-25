import {Context, createBackgroundPage, wait} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {URLS} from 'shared/constants';
import {ItemAndBudget, Results} from 'shared/types';
import {alibabaStep} from './alibaba';
import {amazonStep} from './amazon';
import {ebayStep} from './ebay';
import {temuStep} from './temu';

export async function openWebsitesStep(
  ctx: Context,
  data: ItemAndBudget,
): Promise<Results> {
  console.log('step: openWebsitesStep', {data});

  const jobs = await showUI.runJobsWithProgressList(
    ctx,
    [
      {
        title: 'Opening Amazon',
        handler: async (_ctx) => {
          const backgroundCtx = await createBackgroundPage(_ctx, URLS.AMAZON);
          const result = await amazonStep(backgroundCtx, data);
          return result;
        },
      },
      {
        title: 'Opening Ebay',
        handler: async (_ctx) => {
          await wait(250);
          const backgroundCtx = await createBackgroundPage(_ctx, URLS.EBAY);
          const result = await ebayStep(backgroundCtx, data);
          return result;
        },
      },
      {
        title: 'Opening Alibaba',
        handler: async (_ctx) => {
          await wait(500);
          const backgroundCtx = await createBackgroundPage(_ctx, URLS.ALIBABA);
          const result = await alibabaStep(backgroundCtx, data);
          return result;
        },
      },
      {
        title: 'Opening Temu',
        handler: async (_ctx) => {
          await wait(750);
          const backgroundCtx = await createBackgroundPage(_ctx, URLS.TEMU);
          const result = await temuStep(backgroundCtx, data);
          return result;
        },
      },
    ],
    {
      concurrency: 4,
    },
  );

  const jobResults = {
    // @ts-ignore
    amazon: jobs[0].result === true,
    // @ts-ignore
    ebay: jobs[1].result === true,
    // @ts-ignore
    alibaba: jobs[2].result === true,
    // @ts-ignore
    temu: jobs[3].result === true,
  };

  console.log({jobResults});
  return jobResults;
}
