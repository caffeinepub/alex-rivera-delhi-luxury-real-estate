import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Property, Lead } from '../backend';

// ─── Properties ────────────────────────────────────────────────────────────

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

export function useCreateProperty() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      location: string;
      price: string;
      imageUrl: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProperty(
        data.title,
        data.location,
        data.price,
        data.imageUrl,
        data.description
      );
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
    mutationFn: async (data: {
      id: string;
      title: string;
      location: string;
      price: string;
      imageUrl: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProperty(
        data.id,
        data.title,
        data.location,
        data.price,
        data.imageUrl,
        data.description
      );
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

// ─── Leads ─────────────────────────────────────────────────────────────────

export function useGetAllLeads() {
  const { actor, isFetching } = useActor();

  return useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      budget: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLead(
        data.name,
        data.phone,
        data.email,
        data.budget,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });
}
