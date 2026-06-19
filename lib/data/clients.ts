export interface EmployerItem {
  name: string;
  logo?: string;
}

export interface ClientItem {
  name: string;
  logo?: string;
}

export const employers: EmployerItem[] = [
  { name: 'Tokopedia' },
  { name: 'BCA' },
];

export const clients: ClientItem[] = [
  { name: 'Acme Corp' },
  { name: 'Buildco' },
  { name: 'Nexgen' },
  { name: 'DataCo' },
  { name: 'Scalr' },
  { name: 'CloudBase' },
];
