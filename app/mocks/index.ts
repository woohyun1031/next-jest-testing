import { IFilter } from '#types/filter';

export const filters: IFilter[] = [
  {
    label: '유형',
    id: 'price',
    chips: [
      {
        id: '29',
        label: '무료',
      },
      {
        id: '30',
        label: '유료',
      },
    ],
  },
];
