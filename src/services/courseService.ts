import coursesData from '../data/courses.json';
import areasData from '../data/areas.json';
import modalitiesData from '../data/modalities.json';
import ingressData from '../data/ingress.json';
import advantagesData from '../data/advantages.json';
import contactData from '../data/contact.json';
import priceRangesData from '../data/price-ranges.json';
import type { Advantage, Area, ContactConfig, Course, IngressConfig, Modality, PriceRange } from '../types';

const courses = coursesData as Course[];
const areas = areasData as Area[];
const modalities = modalitiesData as Modality[];
const ingress = ingressData as IngressConfig;
const advantages = advantagesData as Advantage[];
const contact = contactData as ContactConfig;
const priceRanges = priceRangesData as PriceRange[];

export function getAllCourses(): Course[] {
  return courses;
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCoursesByArea(areaId: string): Course[] {
  return courses.filter((course) => course.areaId === areaId);
}

export function getAllAreas(): Area[] {
  return areas;
}

export function getAreaById(id: string): Area | undefined {
  return areas.find((area) => area.id === id);
}

export function getAllModalities(): Modality[] {
  return modalities;
}

export function getModalityById(id: string): Modality | undefined {
  return modalities.find((modality) => modality.id === id);
}

export function getIngressConfig(): IngressConfig {
  return ingress;
}

export function getAllAdvantages(): Advantage[] {
  return advantages;
}

export function getContactConfig(): ContactConfig {
  return contact;
}

export function getAllPriceRanges(): PriceRange[] {
  return priceRanges;
}

export function getPriceRangeById(id: string): PriceRange | undefined {
  return priceRanges.find((range) => range.id === id);
}
