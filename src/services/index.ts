import resourcesJson from "./resource.json";

export interface Site {
  name: string;
  description?: string;
  url: string;
  image?: string;
}

export interface Category {
  name: string;
  sites: Site[];
  icon: string;
}

export const categoriesData: Category[] = resourcesJson as unknown as Category[];
