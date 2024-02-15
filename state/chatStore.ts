import { Conversation } from '@/types/chat';
import { create } from 'zustand';


interface ChatStore {
    currentChatId: string,
    setCurrentChatId: (currentChatId: string) => void;
    currentChat: Map<string, Conversation>;
    setCurrentChat: (currentChat: Map<string, Conversation>) => void;
    addConvo: (chat: Conversation) => void;
    updateConvo: (id: string, parts: string, isGenerating?: boolean) => void;
    getAllCurrentConvo: () => Conversation[];
    textInputSubmit: (input: string) => Promise<InputResult>;
    chatMetaList: ChatMeta[] | null;
    setChatMetaList: (chatMetaList: ChatMeta[] | null) => void;
    resetChat: () => void;
}

interface ChatMeta {
    name: string;
    _id: string;
}

interface InputResult {
    type: 'new' | 'update';
    id?: string;
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
    textInputSubmit: (input) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!input) {
                    reject();
                    return;
                };
                const { currentChatId, getAllCurrentConvo } = get();
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
                            if (!currentChatId) {
                                fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt, conversations: getAllCurrentConvo() }) })
                                    .then((res) => res.json())
                                    .then((res) => {
                                        const data: { _id: string; name: string } = res;
                                        const existed = get().chatMetaList || [];
                                        const newOne = { name: data?.name, _id: data?._id }
                                        if (existed && existed.length) {
                                            existed.push(newOne);
                                        }
                                        resolve({ type: 'new', id: data?._id });
                                        set(() => ({ currentChatId: data?._id, chatMetaList: existed }));
                                    })// saving the chat
                            } else {
                                fetch(`/api/chat/${currentChatId}`, { method: 'PUT', body: JSON.stringify({ conversations: getAllCurrentConvo() }) }).then(() => {
                                    resolve({ type: 'update'});
                                });
                            }
                            break;
                        }
                        get().updateConvo(modelChatTempId, textDecoder.decode(value), true);
                    }
                } catch (error) {
                    get().updateConvo(modelChatTempId, '', false);
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    chatMetaList: null,
    currentChatId: '',
    setCurrentChatId: (currentChatId: string) => set(() => ({ currentChatId })),
    setChatMetaList: (chatMetaList: ChatMeta[] | null) => set(() => ({ chatMetaList })),
    resetChat: () => set(() => ({ currentChat: new Map(), currentChatId: '' })),
}));

export default useChatStore;