import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { AppButton } from '../../../src/components/actions/app-button';
import { StateCard } from '../../../src/components/feedback/state-card';
import { ScreenShell } from '../../../src/components/layout/screen-shell';
import { SchoolForm } from '../../../src/features/schools/components/school-form';
import { useSchoolForm } from '../../../src/features/schools/hooks/use-school-form';
import { newSchoolScreenStyles as styles } from '../../../src/features/schools/new-school-screen.styles';
import { useSchoolResource } from '../../../src/features/schools/hooks/use-school-resource';
import { pickSchoolPhotoUris } from '../../../src/features/schools/services/school-photo-picker.service';
import { useSchoolsStore } from '../../../src/features/schools/store/schools.store';
import { resolveRouteParam } from '../../../src/lib/router/resolve-route-param';

export default function EditSchoolScreen() {
  const router = useRouter();
  const { schoolId } = useLocalSearchParams<{ schoolId?: string | string[] }>();
  const resolvedSchoolId = resolveRouteParam(schoolId, 'unknown-school');
  const {
    errorMessage,
    hasSchoolLoadError,
    isLoadingSchool,
    isSchoolMissing,
    refreshSchool,
    school,
  } = useSchoolResource(resolvedSchoolId);
  const updateSchool = useSchoolsStore((state) => state.updateSchool);
  const {
    addPhotoUris,
    errors,
    formValues,
    getUpdatePayload,
    isPostalCodeLookupLoading,
    lookupAddressByPostalCode,
    replaceFormValues,
    removePhotoUri,
    setFormError,
    updateField,
  } = useSchoolForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!school) {
      return;
    }

    replaceFormValues({
      address: school.address,
      addressNumber: school.addressNumber ?? '',
      city: school.city ?? '',
      district: school.district ?? '',
      name: school.name,
      photoUris: (school.photos ?? []).map((photo) => photo.uri),
      postalCode: school.postalCode ?? '',
      state: school.state ?? '',
    });
  }, [replaceFormValues, school]);

  async function handleAddPhotos() {
    try {
      const photoUris = await pickSchoolPhotoUris();
      addPhotoUris(photoUris);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel adicionar as fotos.';

      Alert.alert('Erro ao adicionar fotos', message);
      setFormError(message);
    }
  }

  async function handleSubmit() {
    const addressValues = await lookupAddressByPostalCode();

    if (!addressValues) {
      return;
    }

    const payload = getUpdatePayload(addressValues);

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);
      await updateSchool(resolvedSchoolId, payload);
      router.replace('/schools');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a escola.';

      Alert.alert('Erro ao atualizar', message);
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenShell eyebrow="Escolas" title="Editar Escola">
      <VStack style={styles.content}>
        {isLoadingSchool ? (
          <StateCard
            align="center"
            layout="column"
            message="Carregando escola..."
            minHeight={96}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasSchoolLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={errorMessage ?? 'Nao foi possivel carregar a escola.'}
            onAction={() => void refreshSchool()}
            tone="soft"
          />
        ) : null}

        {isSchoolMissing ? (
          <StateCard
            actionLabel="Voltar para escolas"
            actionVariant="secondary"
            message="Escola nao encontrada."
            onAction={() => router.replace('/schools')}
            tone="soft"
          />
        ) : null}

        {!isLoadingSchool && !hasSchoolLoadError && !isSchoolMissing ? (
          <>
            <AppButton
              label="Gerenciar turmas"
              onPress={() =>
                router.push({
                  params: {
                    schoolId: resolvedSchoolId,
                  },
                  pathname: '/schools/[schoolId]/classrooms',
                })
              }
              size="sm"
              variant="secondary"
            />

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
              submitLabel="Salvar alteracoes"
            />
          </>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
