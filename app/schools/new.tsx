import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { SchoolForm } from '../../src/features/schools/components/school-form';
import { useSchoolForm } from '../../src/features/schools/hooks/use-school-form';
import { pickSchoolPhotoUris } from '../../src/features/schools/services/school-photo-picker.service';
import { useSchoolsStore } from '../../src/features/schools/store/schools.store';

export default function NewSchoolScreen() {
  const router = useRouter();
  const createSchool = useSchoolsStore((state) => state.createSchool);
  const {
    addPhotoUris,
    errors,
    formValues,
    getCreatePayload,
    isPostalCodeLookupLoading,
    lookupAddressByPostalCode,
    removePhotoUri,
    setFormError,
    updateField,
  } = useSchoolForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddPhotos() {
    try {
      const photoUris = await pickSchoolPhotoUris();
      addPhotoUris(photoUris);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel adicionar as fotos 02.';

      Alert.alert('Erro ao adicionar fotos', message);
      setFormError(message);
    }
  }

  async function handleSubmit() {
    const addressValues = await lookupAddressByPostalCode();

    if (!addressValues) {
      return;
    }

    const payload = getCreatePayload(addressValues);

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
        isPostalCodeLookupLoading={isPostalCodeLookupLoading}
        isSubmitting={isSubmitting}
        onAddPhotos={() => void handleAddPhotos()}
        onCancel={() => router.back()}
        onFieldChange={updateField}
        onPostalCodeLookup={() => void lookupAddressByPostalCode()}
        onRemovePhoto={removePhotoUri}
        onSubmit={handleSubmit}
      />
    </ScreenShell>
  );
}
