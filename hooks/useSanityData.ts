
import { useQuery } from '@tanstack/react-query';
import { fetchSanityData } from '@/lib/sanity';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await fetchSanityData(`
        *[_type == "project"] {
          _id,
          title,
          category,
          tags,
          image,
          description,
          slug
        }
      `);
      return data;
    },
  });
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const data = await fetchSanityData(`
        *[_type == "service"] {
          _id,
          title,
          icon,
          description
        }
      `);
      return data;
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const data = await fetchSanityData(`
        *[_type == "testimonial"] {
          _id,
          quote,
          author,
          role,
          avatar
        }
      `);
      return data;
    },
  });
}
