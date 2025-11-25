import {click, fill, waitForSelector, type Context} from '@matterway/sdk';
import {SELECTORS} from 'shared/selectors';
import {ItemAndBudget} from 'shared/types';

export async function temuStep(ctx: Context, data: ItemAndBudget) {
  console.log('step: temuStep', data);

  await waitForSelector(ctx, SELECTORS.temu.searchInput);

  await fill(ctx, SELECTORS.temu.searchInput, data.item);
  await click(ctx, SELECTORS.temu.searchButton);

  await waitForSelector(ctx, SELECTORS.temu.filterPanelTrigger);
  await click(ctx, SELECTORS.temu.filterPanelTrigger);

  await fill(
    ctx,
    SELECTORS.temu.priceMinInput,
    data.minBudget?.toString() || '',
  );

  await fill(
    ctx,
    SELECTORS.temu.priceMaxInput,
    data.maxBudget?.toString() || '',
  );

  await click(ctx, SELECTORS.temu.priceApplyButton);

  const results = await Promise.race([
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.temu.results)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    }),
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.temu.xNoResults)
        .then(() => resolve(false))
        .catch(() => resolve(false));
    }),
  ]);

  console.log('step: temuStep end', {results});
  return results;
}
