import {
  click,
  fill,
  setProperty,
  waitForSelector,
  type Context,
} from '@matterway/sdk';
import {SELECTORS} from 'shared/selectors';
import {ItemAndBudget} from 'shared/types';

export async function amazonStep(ctx: Context, data: ItemAndBudget) {
  console.log('step: amazonStep', data);

  await waitForSelector(ctx, SELECTORS.amazon.searchInput);

  await fill(ctx, SELECTORS.amazon.searchInput, data.item);
  await click(ctx, SELECTORS.amazon.searchButton);

  await setProperty(
    ctx,
    SELECTORS.amazon.priceInput,
    'max',
    data.maxBudget.toString(),
  );
  await setProperty(
    ctx,
    SELECTORS.amazon.priceInputHidden,
    'value',
    data.maxBudget.toString(),
  );
  await click(ctx, SELECTORS.amazon.priceButton);

  const results = await Promise.race([
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.amazon.xResults)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    }),
    new Promise((resolve) => {
      waitForSelector(ctx, SELECTORS.amazon.xNoResults)
        .then(() => resolve(false))
        .catch(() => resolve(false));
    }),
  ]);

  console.log('step: amazonStep end', {results});
  return results;
}
