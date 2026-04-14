export type SchoolFormField = keyof SchoolFormValues;

export type SchoolFormValues = {
  address: string;
  name: string;
};

export type SchoolFormErrors = {
  address?: string;
  form?: string;
  name?: string;
};
