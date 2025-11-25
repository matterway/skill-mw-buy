import {click, fill, waitForSelector, type Context} from '@matterway/sdk';
import {SELECTORS} from 'shared/selectors';
import {ItemAndBudget} from 'shared/types';

export async function alibabaStep(ctx: Context, data: ItemAndBudget) {
  console.log('step: alibabaStep', data);

  await waitForSelector(ctx, SELECTORS.alibaba.searchInput);

  await click(ctx, SELECTORS.alibaba.cookieAccept, {timeout: 2000}).catch(
    () => {
      // There might not be a cookie button (clicked or outside of EU)
    },
  );

  await fill(ctx, SELECTORS.alibaba.searchInput, data.item);
  await click(ctx, SELECTORS.alibaba.searchButton);

  await waitForSelector(ctx, SELECTORS.alibaba.priceInput);
  await ctx.page.evaluate((budget) => {
    // Update relevant URL parameter with the budget
    const url = new URL(window.location.href);
    url.searchParams.set('pricet', budget?.toString() || '');

    // Reload the page with the updated URL
    window.location.href = url.toString();
  }, data.maxBudget);

  const results = await Promise.race([
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.alibaba.results)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    }),
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.alibaba.xNoResults)
        .then(() => resolve(false))
        .catch(() => resolve(false));
    }),
  ]);

  console.log('step: alibabaStep end', {results});
  return results;
}
