import type {Context} from '@matterway/sdk';
import {showSuccessNotice} from '@matterway/sdk';
import {t} from 'i18next';
import manifest from 'manifest.json';
import {Results} from 'shared/types';

// You can duplicate this step to represent different endings for this task
// which are not "technical errors", such as "could not find the material".

export async function successStep(ctx: Context, results: Results) {
  console.log('step: successStep', {results});

  // Only add logic here if it is performing closure specific to this ending

  await showSuccessNotice(ctx, {
    title: manifest.name,
    description: manifest.description,
    subtitle: t('success.subtitle'),
    statuses: [
      {
        text: results.amazon
          ? t('success.results', {website: 'Amazon'})
          : t('success.noResults', {website: 'Amazon'}),
        success: results.amazon,
      },
      {
        text: results.ebay
          ? t('success.results', {website: 'Ebay'})
          : t('success.noResults', {website: 'Ebay'}),
        success: results.ebay,
      },
      {
        text: results.alibaba
          ? t('success.results', {website: 'Alibaba'})
          : t('success.noResults', {website: 'Alibaba'}),
        success: results.alibaba,
      },
    ],
  });
}
