import { GeneralLayout } from '@/components/Layout/GeneralLayout';

import { SelectPreferenceForm } from '../component/SelectPreferenceForm';

export const SelectPreference = () => {
  return (
    <GeneralLayout title="Click your preference">
      <SelectPreferenceForm />
    </GeneralLayout>
  );
};
