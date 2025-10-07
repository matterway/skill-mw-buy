import {type Context} from '@matterway/sdk';
import {
  bubble,
  headerBar,
  group,
  text,
  inputField,
  navigationBar,
  showUI,
} from '@matterway/sdk/lib/UIv2';
import {t} from 'i18next';
import {ItemAndBudget} from 'shared/types';

export async function askForItemAndBudgetStep(ctx: Context) {
  console.log('step: askForItemAndBudgetStep');

  const form: any = await showUI(
    ctx,
    bubble([
      headerBar({
        title: 'Title of the step',
        description: 'Description of the step',
      }),
      group([
        text({text: 'Message for the user'}),
        inputField({
          name: 'item',
          label: 'Any item',
          type: 'text',
          required: true,
          validationMessage: t('askForItemAndBudget.required'),
        }),
        inputField({
          name: 'maxBudget',
          label: 'Maximum budget (any currency)',
          type: 'number',
          required: true,
          invalid: async (state: any) => {
            return state?.maxBudget <= 0;
          },
          validationMessage: async (state: any) =>
            state?.maxBudget <= 0
              ? t('askForItemAndBudget.validBudget')
              : t('askForItemAndBudget.required'),
        }),
      ]),
      navigationBar({buttons: [{text: 'Submit', value: 'ok'}]}),
    ]),
  );

  const data = form.state as ItemAndBudget;

  console.log('step: askForItemAndBudgetStep end', {data});
  return data;
}
