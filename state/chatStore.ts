import { saveChat } from '@/server/actions/chat';
import { Conversation } from '@/types/chat';
import { create } from 'zustand';


interface ChatStore {
    currentChatId: string,
    currentChat: Map<string, Conversation>;
    setCurrentChat: (currentChat: Map<string, Conversation>) => void;
    addConvo: (chat: Conversation) => void;
    updateConvo: (id: string, parts: string, isGenerating?: boolean) => void;
    getAllCurrentConvo: () => Conversation[];
    textInputSubmit: (prompt: string) => void;
    chatMetaList: ChatMeta[] | null;
    setChatMetaList: (chatMetaList: ChatMeta[] | null) => void;
}

interface ChatMeta {
    name: string;
    _id: string;
}

const useChatStore = create<ChatStore>((set, get) => ({
    currentChat: new Map(),
    addConvo: (chat) => {
        set((state) => ({
            currentChat: new Map(state.currentChat).set(chat.tempId, chat),
        }));
    },
    setCurrentChat: (currentChat) => {
        set({ currentChat });
    },
    updateConvo: (id, parts, isGenerating) => {
        set((state) => {
            const chats = new Map(state.currentChat);
            if (chats.has(id)) {
                const currChat = chats.get(id);
                if (currChat) {
                    currChat.parts += parts;
                    currChat.isGenerating = isGenerating;
                    chats.set(id, currChat);
                }
            }
            return { currentChat: chats };
        });
    },
    getAllCurrentConvo: () => {
        const { currentChat } = get();
        return Array.from(currentChat.values()).flatMap(chatArray => chatArray);
    },
    textInputSubmit: async (input) => {
        try {
            if (!input) return;
            const tempId = new Date().getTime().toString();
            const modelChatTempId = tempId + '1';
            const prompt = input?.trim();
            get().addConvo({ tempId, role: 'user', parts: prompt });
            setTimeout(() => {
                get().addConvo({ tempId: modelChatTempId, role: 'model', parts: '', isGenerating: true });
            }, 500);
            try {
                const response = await fetch('/api/gemini/textInput', {
                    method: 'POST',
                    body: JSON.stringify({ prompt }),
                });
                const reader = response.body?.getReader();
                const textDecoder = new TextDecoder('utf-8');
                while (true) {
                    const { done, value } = await reader?.read() || {};
                    if (done) {
                        get().updateConvo(modelChatTempId, '', false);
                        const { currentChatId, getAllCurrentConvo } = get();
                       const res = await saveChat(getAllCurrentConvo(), currentChatId);
                       if (res?._id && res?.name && !currentChatId) {
                           set((state) => ({currentChatId: res?._id, chatMetaList:  [...state?.chatMetaList || [], {name: res?.name, _id: res?._id}] }));
                       }
                        break;
                    }
                    get().updateConvo(modelChatTempId, textDecoder.decode(value), true);
                }
            } catch (error) {
                get().updateConvo(modelChatTempId, '', false);
            }
        } catch (error) { }
    },
    chatMetaList: null,
    currentChatId: '',
    setChatMetaList: (chatMetaList: ChatMeta[] | null) => set(() => ({ chatMetaList })),
}));

export default useChatStore;