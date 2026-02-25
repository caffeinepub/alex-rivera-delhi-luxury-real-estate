import { LocalProperty } from '../types/property';

const STORAGE_KEY = 'dlx_properties';

const SEED_PROPERTIES: LocalProperty[] = [
  // Delhi (3)
  {
    id: 1,
    city: 'Delhi',
    title: 'Aerocity Skyview Penthouse',
    price: 2800000000,
    photos: [
      '/assets/generated/property-penthouse-1.dim_800x500.png',
      '/assets/generated/property-penthouse-2.dim_800x500.png',
      '/assets/generated/property-penthouse-3.dim_800x500.png',
    ],
    enquiryCount: 12,
    location: 'Aerocity, New Delhi',
    lat: 28.566,
    lng: 77.103,
  },
  {
    id: 2,
    city: 'Delhi',
    title: 'GK2 Royal Villa',
    price: 1500000000,
    photos: [
      '/assets/generated/property-villa-1.dim_800x500.png',
      '/assets/generated/property-villa-2.dim_800x500.png',
      '/assets/generated/property-villa-3.dim_800x500.png',
    ],
    enquiryCount: 8,
    location: 'Greater Kailash II, New Delhi',
    lat: 28.526,
    lng: 77.199,
  },
  {
    id: 3,
    city: 'Delhi',
    title: 'Vasant Vihar Penthouse',
    price: 3500000000,
    photos: [
      '/assets/generated/property-penthouse-2.dim_800x500.png',
      '/assets/generated/property-penthouse-1.dim_800x500.png',
      '/assets/generated/property-penthouse-3.dim_800x500.png',
    ],
    enquiryCount: 15,
    location: 'Vasant Vihar, New Delhi',
    lat: 28.557,
    lng: 77.165,
  },
  // Gurgaon (3)
  {
    id: 4,
    city: 'Gurgaon',
    title: 'Golf Course Road Luxury Villa',
    price: 2200000000,
    photos: [
      '/assets/generated/property-villa-2.dim_800x500.png',
      '/assets/generated/property-villa-1.dim_800x500.png',
      '/assets/generated/property-villa-3.dim_800x500.png',
    ],
    enquiryCount: 10,
    location: 'Golf Course Road, Gurgaon',
    lat: 28.459,
    lng: 77.102,
  },
  {
    id: 5,
    city: 'Gurgaon',
    title: 'DLF Cyber City Penthouse',
    price: 1800000000,
    photos: [
      '/assets/generated/property-penthouse-3.dim_800x500.png',
      '/assets/generated/property-penthouse-1.dim_800x500.png',
      '/assets/generated/property-penthouse-2.dim_800x500.png',
    ],
    enquiryCount: 7,
    location: 'DLF Cyber City, Gurgaon',
    lat: 28.494,
    lng: 77.089,
  },
  {
    id: 6,
    city: 'Gurgaon',
    title: 'Sohna Road Premium Villa',
    price: 1300000000,
    photos: [
      '/assets/generated/property-villa-3.dim_800x500.png',
      '/assets/generated/property-villa-1.dim_800x500.png',
      '/assets/generated/property-villa-2.dim_800x500.png',
    ],
    enquiryCount: 5,
    location: 'Sohna Road, Gurgaon',
    lat: 28.415,
    lng: 77.041,
  },
  // Noida (3)
  {
    id: 7,
    city: 'Noida',
    title: 'Sector 150 Sports City Villa',
    price: 1600000000,
    photos: [
      '/assets/generated/property-villa-1.dim_800x500.png',
      '/assets/generated/property-villa-3.dim_800x500.png',
      '/assets/generated/property-villa-2.dim_800x500.png',
    ],
    enquiryCount: 9,
    location: 'Sector 150, Noida',
    lat: 28.399,
    lng: 77.503,
  },
  {
    id: 8,
    city: 'Noida',
    title: 'Sector 44 Luxury Penthouse',
    price: 2100000000,
    photos: [
      '/assets/generated/property-penthouse-1.dim_800x500.png',
      '/assets/generated/property-penthouse-3.dim_800x500.png',
      '/assets/generated/property-penthouse-2.dim_800x500.png',
    ],
    enquiryCount: 11,
    location: 'Sector 44, Noida',
    lat: 28.561,
    lng: 77.352,
  },
  {
    id: 9,
    city: 'Noida',
    title: 'Expressway Premium Residence',
    price: 1400000000,
    photos: [
      '/assets/generated/property-villa-2.dim_800x500.png',
      '/assets/generated/property-penthouse-1.dim_800x500.png',
      '/assets/generated/property-villa-1.dim_800x500.png',
    ],
    enquiryCount: 6,
    location: 'Noida Expressway, Noida',
    lat: 28.521,
    lng: 77.391,
  },
  // Aerocity (3)
  {
    id: 10,
    city: 'Aerocity',
    title: 'Aerocity Business Hub Penthouse',
    price: 3200000000,
    photos: [
      '/assets/generated/property-penthouse-2.dim_800x500.png',
      '/assets/generated/property-penthouse-3.dim_800x500.png',
      '/assets/generated/property-penthouse-1.dim_800x500.png',
    ],
    enquiryCount: 18,
    location: 'IGI Aerocity, New Delhi',
    lat: 28.556,
    lng: 77.098,
  },
  {
    id: 11,
    city: 'Aerocity',
    title: 'Worldmark Luxury Suite',
    price: 2500000000,
    photos: [
      '/assets/generated/property-villa-3.dim_800x500.png',
      '/assets/generated/property-penthouse-2.dim_800x500.png',
      '/assets/generated/property-villa-1.dim_800x500.png',
    ],
    enquiryCount: 14,
    location: 'Worldmark, Aerocity, New Delhi',
    lat: 28.558,
    lng: 77.101,
  },
  {
    id: 12,
    city: 'Aerocity',
    title: 'Hospitality District Villa',
    price: 1900000000,
    photos: [
      '/assets/generated/property-villa-1.dim_800x500.png',
      '/assets/generated/property-villa-2.dim_800x500.png',
      '/assets/generated/property-penthouse-1.dim_800x500.png',
    ],
    enquiryCount: 9,
    location: 'Hospitality District, Aerocity',
    lat: 28.553,
    lng: 77.095,
  },
  // Ghaziabad (3)
  {
    id: 13,
    city: 'Ghaziabad',
    title: 'Indirapuram Grand Villa',
    price: 1200000000,
    photos: [
      '/assets/generated/property-villa-2.dim_800x500.png',
      '/assets/generated/property-villa-3.dim_800x500.png',
      '/assets/generated/property-penthouse-1.dim_800x500.png',
    ],
    enquiryCount: 4,
    location: 'Indirapuram, Ghaziabad',
    lat: 28.641,
    lng: 77.369,
  },
  {
    id: 14,
    city: 'Ghaziabad',
    title: 'Raj Nagar Extension Penthouse',
    price: 1500000000,
    photos: [
      '/assets/generated/property-penthouse-3.dim_800x500.png',
      '/assets/generated/property-penthouse-2.dim_800x500.png',
      '/assets/generated/property-villa-1.dim_800x500.png',
    ],
    enquiryCount: 6,
    location: 'Raj Nagar Extension, Ghaziabad',
    lat: 28.698,
    lng: 77.412,
  },
  {
    id: 15,
    city: 'Ghaziabad',
    title: 'Crossings Republik Luxury Home',
    price: 1350000000,
    photos: [
      '/assets/generated/property-villa-3.dim_800x500.png',
      '/assets/generated/property-villa-2.dim_800x500.png',
      '/assets/generated/property-penthouse-2.dim_800x500.png',
    ],
    enquiryCount: 3,
    location: 'Crossings Republik, Ghaziabad',
    lat: 28.659,
    lng: 77.451,
  },
];

export function getProperties(): LocalProperty[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed on first load
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROPERTIES));
      return SEED_PROPERTIES;
    }
    return JSON.parse(raw) as LocalProperty[];
  } catch {
    return SEED_PROPERTIES;
  }
}

export function saveProperties(properties: LocalProperty[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

export function generateId(): number {
  const props = getProperties();
  const maxId = props.reduce((max, p) => Math.max(max, p.id), 0);
  return maxId + 1;
}

export function saveProperty(property: LocalProperty): void {
  const props = getProperties();
  saveProperties([...props, property]);
}

export function updateProperty(updated: LocalProperty): void {
  const props = getProperties();
  saveProperties(props.map(p => (p.id === updated.id ? updated : p)));
}

export function deleteProperty(id: number): void {
  const props = getProperties();
  saveProperties(props.filter(p => p.id !== id));
}
