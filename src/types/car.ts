export interface Car {
  id: number;
  title: string;
  catch: string;
  description: string;
  cover_image: string;
  additional_images?: string[];
  make: string;
  year: number;
  fuel: string;
  mileage: number;
  transmission: string;
  price: number;
}
