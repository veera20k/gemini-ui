import { create } from 'zustand';

interface ChatStore {
    currentChats: { id: number | string, role: string, parts: string }[];
    addChat: (chat: { id: number | string, role: string, parts: string }) => void;
}
const useChatStore = create<ChatStore>((set, get) => ({
    currentChats: [],
    addChat: (chat: { id: number | string, role: string, parts: string }) => {
        set((state) => ({
            currentChats: [...state.currentChats, chat]
        }));
    }
}));

export default useChatStore;