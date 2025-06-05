import { useGroupsStore } from '@/zstore/groups';
import { useEffect } from 'react';

export const useAdditions = () => {
  const isLoading = useGroupsStore((state) => state.isLoading);
  const error = useGroupsStore((state) => state.error);
  const groups = useGroupsStore((state) => state.groups);
  const modifiers = useGroupsStore((state) => state.modifiers);
  const dishes = useGroupsStore((state) => state.dishes);
  const getModifiers = useGroupsStore((state) => state.getModifiers);
  const getDishes = useGroupsStore((state) => state.getDishes);
  const getGroups = useGroupsStore((state) => state.getGroups);
  const updateGroup = useGroupsStore((state) => state.updateGroup);
  const createGroup = useGroupsStore((state) => state.createGroup);

  useEffect(() => {
    getGroups();
    getModifiers();
    getDishes();
  }, []);

  return {
    isLoading,
    error,
    groups,
    modifiers,
    dishes,
    getModifiers,
    getDishes,
    getGroups,
    updateGroup,
    createGroup,
  };
};
