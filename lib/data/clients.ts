export interface ClientItem {
  name: string;
  logo?: string; // path relative to /public, e.g. '/clients/acme.svg'
}

export const clients: ClientItem[] = [
  { name: 'Acme Corp' },
  { name: 'Buildco' },
  { name: 'Nexgen' },
  { name: 'DataCo' },
  { name: 'Scalr' },
  { name: 'CloudBase' },
];
