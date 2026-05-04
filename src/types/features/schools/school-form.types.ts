export type SchoolFormValues = {
  address: string;
  addressNumber: string;
  city: string;
  district: string;
  name: string;
  photoUris: string[];
  postalCode: string;
  state: string;
};

export type SchoolFormField = Exclude<keyof SchoolFormValues, 'photoUris'>;

export type SchoolFormErrors = {
  address?: string;
  city?: string;
  district?: string;
  form?: string;
  name?: string;
  photos?: string;
  postalCode?: string;
  state?: string;
};
