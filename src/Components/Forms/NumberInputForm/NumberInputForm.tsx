import React, { useEffect } from 'react';
import formStyles from '../Forms.module.css';
import numberInputStyles from './NumberInputForm.module.css';
import cln from 'classnames';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';
import generalComponentStyles from '../../Components.module.css';

const NumberInputForm = ({ setRunes }) => {
  const resolverSchema = z.object({
    convertToRunes: z.coerce
      .number()
      .min(1, 'The number has to be greater than 0!')
      .max(9999, 'The number has to be lower than 9999!')
      .int('The number has to be a natural number!'),
  });

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      convertToRunes: 0,
    },
    resolver: zodResolver(resolverSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
  } = methods;

  const errorCount = Object.keys(errors).length;

  const watchedNumberField = watch('convertToRunes');

  const splitIntoRuneNumbers = (value: number) => {
    const stringValue = String(value);
    const splitDecimalPlaces = stringValue.split('');
    const runeNumbers = splitDecimalPlaces.reverse().map((dp, index) => {
      return Number(dp) * Math.pow(10, index);
    });
    return runeNumbers;
  };

  const onSubmit = ({ convertToRunes }) => {
    const runeNumbers = splitIntoRuneNumbers(convertToRunes);
    setRunes(runeNumbers);
  };

  useEffect(() => {
    const errorDescriptionsArray = Object.values(errors).map((error) => error.message);

    if (errorCount > 0)
      toast(errorDescriptionsArray.join('\n\n'), {
        type: 'error',
        closeOnClick: true,
        autoClose: 2500,
        className: generalComponentStyles.Toast,
        icon: false,
      });
  }, [errors]);

  const { convertToRunes: convertToRunesIsDirty } = dirtyFields;

  useEffect(() => {
    if (!convertToRunesIsDirty) return;
    handleSubmit(onSubmit)();
  }, [watchedNumberField, handleSubmit, convertToRunesIsDirty]);

  const mainFormControlClasses = cln(
    formStyles.FormControl,
    numberInputStyles.NumberInputFormControl,
    { [formStyles.FormControlError]: errorCount > 0 },
  );

  return (
    <div>
      <h2>Converter</h2>
      <FormProvider {...methods}>
        <form className={formStyles.Form} onSubmit={handleSubmit(onSubmit)}>
          <div className={mainFormControlClasses}>
            <label htmlFor="convert-to-runes">Convert to runes:</label>
            <input
              id="convert-to-runes"
              type="number"
              max={9999}
              min={0}
              {...register('convertToRunes')}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default NumberInputForm;
