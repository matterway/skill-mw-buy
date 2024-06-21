import {showForm, type Context} from '@matterway/sdk';
import {t} from 'i18next';
import {ItemAndBudget} from 'shared/types';

export async function askForItemAndBudgetStep(ctx: Context) {
  console.log('step: askForItemAndBudgetStep');

  const {data} = await showForm<ItemAndBudget>(ctx, {
    title: 'Title of the step',
    description: 'Description of the step',
    text: 'Message for the user',
    overlay: true,
    fields: [
      {
        type: 'group',
        fields: [
          {
            name: 'item',
            type: 'text',
            label: 'Any item',
            validation: [
              {type: 'required', message: t('askForItemAndBudget.required')},
            ],
            format: ['trim'],
          },
          {
            name: 'maxBudget',
            type: 'number',
            label: 'Maximum budget (any currency)',
            validation: [
              {type: 'required', message: t('askForItemAndBudget.required')},
              {
                type: 'moreThan',
                moreThan: 0,
                message: t('askForItemAndBudget.validBudget'),
              },
            ],
          },
        ],
      },
    ],
    buttons: [{value: 'ok', text: 'Submit'}],
  });

  console.log('step: askForItemAndBudgetStep end', {data});
  return data;
}
