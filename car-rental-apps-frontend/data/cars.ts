import bmwImage from '@/public/bmw-x5.jpg';
import audiImage from '@/public/audi-a6.jpg';

export const cars = [
  {
    id: '1',
    name: 'Tesla Model 3',
    manufacturer: 'Tesla',  // Add manufacturer
    pricePerDay: 180,
    imageUrl: '/tesla-model-3.jpg',
    seats: 5,
    fuel: 'Electric',
  },
  {
    id: '2',
    name: 'BMW X5',
    manufacturer: 'BMW',  // Add manufacturer
    pricePerDay: 300,
    imageUrl: bmwImage,
    seats: 5,
    fuel: 'Petrol',
  },
  {
    id: '3',
    name: 'Audi A6',
    manufacturer: 'Audi',  // Add manufacturer
    pricePerDay: 315,
    imageUrl: audiImage,
    seats: 5,
    fuel: 'Diesel',
  },
  {
    id: '4',
    name: 'Mercedes c300',
    manufacturer: 'Mercedes-Benz',  // Add manufacturer
    pricePerDay: 275,
    imageUrl: '/mercedes-c300.jpg',
    seats: 5,
    fuel: 'Petrol',
  },
  {
    id: '5',
    name: 'Genesis gv80',
    manufacturer: 'Genesis',  // Add manufacturer
    pricePerDay: 300,
    imageUrl: '/genesis-gv80.jpg',
    seats: 5,
    fuel: 'Petrol',
  },
  {
    id: '6',
    name: 'Kia Stinger',
    manufacturer: 'Kia',  // Add manufacturer
    pricePerDay: 220,
    imageUrl: '/kia-stinger.jpg',
    seats: 5,
    fuel: 'Petrol',
  },
  {
    id: '7',
    name: 'Hyundai Sonata N-line',
    manufacturer: 'Hyundai',  // Add manufacturer
    pricePerDay: 195,
    imageUrl: '/sonata-nline.jpg',
    seats: 5,
    fuel: 'Petrol',
  },
  {
    id: '8',
    name: 'Nissan Altima Turbo',
    manufacturer: 'Nissan',  // Add manufacturer
    pricePerDay: 190,
    imageUrl: '/altima-turbo.jpg',
    seats: 5,
    fuel: 'Petrol',
  },
  {
    id: '9',
    name: 'Lexus IS-350',
    manufacturer: 'Lexus',  // Add manufacturer
    pricePerDay: 290,
    imageUrl: '/lexus-350.jpg',
    seats: 5,
    fuel: 'Petrol',
  },
];
