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

  const isMinBudgetInvalid = (min?: number, max?: number) =>
    min !== undefined && (min <= 0 || (max !== undefined && min >= max));

  const isMaxBudgetInvalid = (max?: number, min?: number) =>
    max !== undefined && (max <= 0 || (min !== undefined && max <= min));

  const getMinBudgetValidationMessage = (min?: number, max?: number) => {
    if (min === undefined) return '';

    if (min <= 0) return t('askForItemAndBudget.validBudget');

    if (max !== undefined && min >= max) {
      return 'Minimum budget must be less than maximum budget';
    }

    return '';
  };

  const getMaxBudgetValidationMessage = (max?: number, min?: number) => {
    if (max === undefined) return '';

    if (max <= 0) return t('askForItemAndBudget.validBudget');

    if (min !== undefined && max <= min) {
      return 'Maximum budget must be greater than minimum budget';
    }

    return '';
  };

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
          name: 'minBudget',
          label: 'Minimum budget (optional, any currency)',
          type: 'number',
          required: false,
          invalid: async (state: any) =>
            isMinBudgetInvalid(state?.minBudget, state?.maxBudget),
          validationMessage: async (state: any) =>
            getMinBudgetValidationMessage(state?.minBudget, state?.maxBudget),
        }),
        inputField({
          name: 'maxBudget',
          label: 'Maximum budget (optional, any currency)',
          type: 'number',
          required: false,
          invalid: async (state: any) =>
            isMaxBudgetInvalid(state?.maxBudget, state?.minBudget),
          validationMessage: async (state: any) =>
            getMaxBudgetValidationMessage(state?.maxBudget, state?.minBudget),
        }),
      ]),
      navigationBar({buttons: [{text: 'Submit', value: 'ok'}]}),
    ]),
  );

  const data = form.state as ItemAndBudget;

  console.log('step: askForItemAndBudgetStep end', {data});
  return data;
}
