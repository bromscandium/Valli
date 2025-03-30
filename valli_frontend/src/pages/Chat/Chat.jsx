import React, {useState, useRef, useEffect} from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./Chat.sass"

function Chat() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const wsRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const [isSessionActive, setIsSessionActive] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    useEffect(() => {
        const inputBlock = document.querySelector('.chat-input')

        const handleResize = () => {
            const viewportHeight = window.visualViewport?.height
            const windowHeight = window.innerHeight

            if (viewportHeight && viewportHeight < windowHeight) {
                const keyboardHeight = windowHeight - viewportHeight
                inputBlock.style.bottom = `${keyboardHeight}px`
            } else {
                inputBlock.style.bottom = '80px'
            }
        }

        window.visualViewport?.addEventListener('resize', handleResize)

        return () => {
            window.visualViewport?.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleSend = () => {
        if (input.trim() === "") return
        const time = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
        setMessages([...messages, {text: input, sender: "You", time}])
        setInput("")
    }

    const startSession = () => {
        wsRef.current = new WebSocket("wss://example.com")
        wsRef.current.onopen = () => {
            setIsSessionActive(true)
        }
    }

    const stopSession = () => {
        console.log("Session stopped")
        if (wsRef.current) {
            wsRef.current.close()
            setIsSessionActive(false)
        }
    }

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        const recorder = new MediaRecorder(stream)
        mediaRecorderRef.current = recorder
        recorder.ondataavailable = (event) => {
            if (event.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(event.data)
            }
        }
        recorder.onstop = () => {
            setIsRecording(false)
        }
        recorder.start(100)
        setIsRecording(true)
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
    }

    return (
        <div className="chat-page">
            <Header/>
            <div className="chat-body">
                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message ${msg.sender === "You" ? "user" : "bot"}`}
                        >
                            <div className="bubble">
                                <p className="text">{msg.text}</p>
                                <div className="meta">
                                    <span>{msg.time}</span>
                                    <span>{msg.sender}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chat-input">
                    <div className="session-control">
                        {isSessionActive ? (
                            <button onClick={stopSession}>
                                <img src="/pause-session.png" alt="Stop Session"/>
                            </button>
                        ) : (
                            <button onClick={startSession}>
                                <img src="/start-session.png" alt="Start Session"/>
                            </button>
                        )}
                    </div>
                    <div className="input-row">
                        <textarea
                            className="text-input"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={1}
                            onFocus={() => {
                                setTimeout(() => {
                                    window.scrollTo(0, document.body.scrollHeight)
                                }, 300)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}
                        />
                        <div className="input-actions">
                            {isRecording ? (
                                <button onClick={stopRecording}>
                                    <img src="/block-microphone.png" alt="Stop Recording"/>
                                </button>
                            ) : (
                                <button onClick={startRecording}>
                                    <img src="/begin-microphone.png" alt="Start Recording"/>
                                </button>
                            )}
                            <button onClick={handleSend}>
                                <img src="/send.png" alt="Send Message"/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Chat
