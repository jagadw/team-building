import { create } from 'zustand';

const useStore = create((set) => ({
  isLoggedIn: false,
  setLogin: (status) => set({ isLoggedIn: status }),
  missionData: null,
  setMissionData: (data) => set({ missionData: data }),
}));

export default useStore;