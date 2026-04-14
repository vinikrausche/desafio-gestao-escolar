import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { SchoolForm } from '../../src/features/schools/components/school-form';
import { useSchoolForm } from '../../src/features/schools/hooks/use-school-form';
import { useSchoolsStore } from '../../src/features/schools/store/schools.store';

export default function NewSchoolScreen() {
  const router = useRouter();
  const createSchool = useSchoolsStore((state) => state.createSchool);
  const { errors, formValues, getCreatePayload, setFormError, updateField } =
    useSchoolForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const payload = getCreatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createSchool(payload);
      router.replace('/schools');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel salvar a escola.';

      Alert.alert('Erro ao salvar', message);
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenShell eyebrow="Escolas" title="Nova Escola">
      <SchoolForm
        errors={errors}
        formValues={formValues}
        isSubmitting={isSubmitting}
        onCancel={() => router.back()}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
      />
    </ScreenShell>
  );
}
