export interface EmployerItem {
  name: string;
  role: string;
  logo?: string;
  current?: boolean;
  invert?: boolean;
}

export interface ClientItem {
  name: string;
  logo?: string;
}

export const employers: EmployerItem[] = [
  { name: 'Tokopedia', role: 'Software Engineer', logo: '/logos/tokopedia.svg' },
  { name: 'BCA', role: 'Software Engineer', logo: '/logos/bca.svg' },
  { name: 'University of Sydney', role: 'Research Assistant', logo: '/logos/usyd.svg', invert: true },
  { name: 'Lyra', role: 'Forward Deployed Engineer', logo: '/logos/lyra.svg', current: true },
];

export const clients: ClientItem[] = [
  { name: 'Acme Corp' },
  { name: 'Buildco' },
  { name: 'Nexgen' },
  { name: 'DataCo' },
  { name: 'Scalr' },
  { name: 'CloudBase' },
];
