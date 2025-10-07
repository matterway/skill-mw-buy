import {
  click,
  fill,
  retry,
  wait,
  waitForSelector,
  type Context,
} from '@matterway/sdk';
import {SELECTORS} from 'shared/selectors';
import {ItemAndBudget} from 'shared/types';

export async function ebayStep(ctx: Context, data: ItemAndBudget) {
  console.log('step: ebayStep', data);

  await waitForSelector(ctx, SELECTORS.ebay.searchInput);

  await fill(ctx, SELECTORS.ebay.searchInput, data.item);
  await click(ctx, SELECTORS.ebay.searchButton);

  await retry(
    ctx,
    async () => {
      await fill(ctx, SELECTORS.ebay.priceInput, data.maxBudget.toString());
      await click(ctx, SELECTORS.ebay.priceButton);
      return waitForSelector(ctx, SELECTORS.ebay.results, {timeout: 9000});
    },
    {maxTries: 3},
  );

  const results = await Promise.race([
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.ebay.results)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    }),
    new Promise((resolve) => {
      wait(1000)
        .then(() => waitForSelector(ctx, SELECTORS.ebay.xNoResults))
        .then(() => resolve(false))
        .catch(() => resolve(false));
    }),
  ]);

  console.log('step: ebayStep end', {results});
  return results;
}
