import type {Context} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {t} from 'i18next';
import {Results} from 'shared/types';

// You can duplicate this step to represent different endings for this task
// which are not "technical errors", such as "could not find the material".

export async function successStep(ctx: Context, results: Results) {
  console.log('step: successStep', {results});

  // Only add logic here if it is performing closure specific to this ending

  await showUI.success(ctx, {
    title: t('success.subtitle'),
    statusList: [
      {
        label: results.amazon
          ? t('success.results', {website: 'Amazon'})
          : t('success.noResults', {website: 'Amazon'}),
        value: results.amazon ? 'success' : 'warning',
      },
      {
        label: results.ebay
          ? t('success.results', {website: 'Ebay'})
          : t('success.noResults', {website: 'Ebay'}),
        value: results.ebay ? 'success' : 'warning',
      },
      {
        label: results.alibaba
          ? t('success.results', {website: 'Alibaba'})
          : t('success.noResults', {website: 'Alibaba'}),
        value: results.alibaba ? 'success' : 'warning',
      },
      {
        label: results.temu
          ? t('success.results', {website: 'Temu'})
          : t('success.noResults', {website: 'Temu'}),
        value: results.temu ? 'success' : 'warning',
      },
    ],
  });
}
