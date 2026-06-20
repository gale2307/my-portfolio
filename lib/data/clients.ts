export interface EmployerItem {
  name: string;
  role: string;
  logo?: string;
}

export interface ClientItem {
  name: string;
  logo?: string;
}

export const employers: EmployerItem[] = [
  { name: 'Tokopedia', role: 'Software Engineer' },
  { name: 'BCA', role: 'Software Engineer' },
  { name: 'University of Sydney', role: 'Research Assistant' },
];

export const clients: ClientItem[] = [
  { name: 'Acme Corp' },
  { name: 'Buildco' },
  { name: 'Nexgen' },
  { name: 'DataCo' },
  { name: 'Scalr' },
  { name: 'CloudBase' },
];
