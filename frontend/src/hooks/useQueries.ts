import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Property, PropertyCategory, PropertyType, Lead } from '../backend';

export function useGetAllProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ['properties', 'featured'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPropertiesByCategory(category: PropertyCategory) {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ['properties', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPropertiesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProperty(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Property | null>({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProperty(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (property: Property) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProperty(property);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, property }: { id: string; property: Property }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProperty(id, property);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useDeleteProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProperty(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useCreateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lead: {
      name: string;
      phone: string;
      email: string;
      budget: bigint;
      propertyType: PropertyType;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLead(
        lead.name,
        lead.phone,
        lead.email,
        lead.budget,
        lead.propertyType,
        lead.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}

export function useGetAllLeads() {
  const { actor, isFetching } = useActor();
  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeads();
    },
    enabled: !!actor && !isFetching,
  });
}
