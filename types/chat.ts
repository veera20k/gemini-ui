export interface Conversation {
    tempId: string,
    role: string,
    parts: string,
    isGenerating?: boolean
}

export interface Chat  {
    _id: string,
    name: string,
    user: string,
    conversations: Conversation[]
}