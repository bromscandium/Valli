import React, {useState, useRef, useEffect} from "react"
import {Helmet} from "react-helmet-async"
import "./Chat.sass"

const Chat = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [isSessionActive, setIsSessionActive] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const wsRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSend = () => {
        if (input.trim() === '') return
        const newMessage = {
            text: input,
            sender: 'You',
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        }
        setMessages([...messages, newMessage])
        setInput('')
    }

    const toggleSession = () => {
        if (isSessionActive) {
            wsRef.current?.close()
            setIsSessionActive(false)
        } else {
            wsRef.current = new WebSocket("wss://example.com")
            wsRef.current.onopen = () => setIsSessionActive(true)
        }
    }

    const toggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop()
        } else {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true})
            const recorder = new MediaRecorder(stream)
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(e.data)
                }
            }
            recorder.onstop = () => setIsRecording(false)
            recorder.start(100)
            mediaRecorderRef.current = recorder
            setIsRecording(true)
        }
    }

    return (
        <div className="chat-page">
            <Helmet>
                <title>Valli | Chat</title>
            </Helmet>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div className={`message ${msg.sender === 'You' ? 'user' : 'bot'}`} key={i}>
                            <div className="bubble">
                                {msg.text}
                                <div className="meta">
                                    <span>{msg.time} </span>
                                    <span>{msg.sender}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>

                <div className="chat-input">
                    <button className="session-button" onClick={toggleSession}>
                        {isSessionActive ? "Stop GPT Session (Dev)" : "Launch GPT Session (Dev)"}
                    </button>

                    <div className="input-row">
            <textarea
                className="text-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSend()
                    }
                }}
            />
                        <div className="input-actions">
                            <button onClick={toggleRecording}>
                                <img
                                    src={isRecording ? '/block-microphone.png' : '/begin-microphone.png'}
                                    alt="Microphone"
                                />
                            </button>
                            <button onClick={handleSend}>
                                <img src="/send.png" alt="Send Message"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
