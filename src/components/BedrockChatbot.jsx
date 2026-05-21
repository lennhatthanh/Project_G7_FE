import { useMemo, useRef, useState } from 'react';
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react';
import './BedrockChatbot.css';

const initialMessages = [
    {
        role: 'assistant',
        content: 'Xin chao, minh la tro ly SanGo. Ban can goi y san, cach dat lich, hay thong tin ve he thong?'
    }
];

function BedrockChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(initialMessages);
    const [draft, setDraft] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const apiUrl = import.meta.env.VITE_BEDROCK_API_URL;
    const apiKey = import.meta.env.VITE_BEDROCK_API_KEY;

    const canSend = useMemo(() => draft.trim().length > 0 && !loading, [draft, loading]);

    const toggleOpen = () => {
        setOpen((value) => !value);
        window.setTimeout(() => inputRef.current?.focus(), 80);
    };

    const sendMessage = async () => {
        const query = draft.trim();
        if (!query || loading) return;

        const userMessage = { role: 'user', content: query };
        setMessages((current) => [...current, userMessage]);
        setDraft('');
        setLoading(true);

        if (!apiUrl || !apiKey) {
            setMessages((current) => [
                ...current,
                {
                    role: 'assistant',
                    content: 'Chatbot chua duoc cau hinh endpoint hoac API key trong frontend environment.'
                }
            ]);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: JSON.stringify({ query })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || `Request failed with HTTP ${response.status}`);
            }

            setMessages((current) => [
                ...current,
                {
                    role: 'assistant',
                    content: data.answer || 'Bedrock da tra ve phan hoi rong.'
                }
            ]);
        } catch (error) {
            setMessages((current) => [
                ...current,
                {
                    role: 'assistant',
                    content: `Khong goi duoc Bedrock KB: ${error.message}`
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="bedrock-chatbot">
            {open && (
                <section className="bedrock-chatbot__panel" aria-label="SanGo Bedrock chatbot">
                    <header className="bedrock-chatbot__header">
                        <span className="bedrock-chatbot__avatar">
                            <Bot size={20} />
                        </span>
                        <div>
                            <h2>SanGo AI</h2>
                            <p>Claude Sonnet 4.6 + Bedrock KB</p>
                        </div>
                        <button className="bedrock-chatbot__icon" type="button" onClick={toggleOpen} aria-label="Dong chatbot">
                            <X size={18} />
                        </button>
                    </header>

                    <div className="bedrock-chatbot__messages">
                        {messages.map((message, index) => (
                            <div className={`bedrock-chatbot__message bedrock-chatbot__message--${message.role}`} key={`${message.role}-${index}`}>
                                {message.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="bedrock-chatbot__message bedrock-chatbot__message--assistant bedrock-chatbot__loading">
                                <Loader2 size={16} />
                                Dang hoi Bedrock...
                            </div>
                        )}
                    </div>

                    <form
                        className="bedrock-chatbot__composer"
                        onSubmit={(event) => {
                            event.preventDefault();
                            sendMessage();
                        }}
                    >
                        <textarea
                            ref={inputRef}
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Hoi ve san, dat lich, khuyen mai..."
                            rows={2}
                        />
                        <button type="submit" disabled={!canSend} aria-label="Gui tin nhan">
                            <Send size={18} />
                        </button>
                    </form>
                </section>
            )}

            <button className="bedrock-chatbot__launcher" type="button" onClick={toggleOpen} aria-label="Mo chatbot SanGo AI">
                {open ? <X size={24} /> : <MessageCircle size={26} />}
            </button>
        </div>
    );
}

export default BedrockChatbot;
