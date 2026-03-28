"use client"

import { useState, useCallback, useRef } from "react"
import { Orb, type AgentState } from "./orb"

const MARIA_API = "http://localhost:3001/api/chat"

export default function Maria() {
  const [agentState, setAgentState] = useState<AgentState>(null)
  const [youText, setYouText] = useState("...")
  const [mariaText, setMariaText] = useState(
    "Hola! Lista para hacer quedar mal a algunos políticos peruanos con datos. 🇵🇪"
  )
  const [statusText, setStatusText] = useState("Presiona Space o click para hablar")
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isListeningRef = useRef(false)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  const stopAudio = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current = null
    }
  }, [])

  const askMaria = useCallback(async (message: string) => {
    setAgentState("thinking")
    setStatusText("María está pensando...")
    try {
      const res = await fetch(MARIA_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setMariaText(data.text)

      if (data.audio) {
        setAgentState("talking")
        setStatusText("María está hablando...")
        const audioBytes = Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0))
        const blob = new Blob([audioBytes], { type: "audio/mpeg" })
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        currentAudioRef.current = audio
        audio.onended = () => {
          setAgentState(null)
          setStatusText("Presiona Space o click para hablar")
          URL.revokeObjectURL(url)
          currentAudioRef.current = null
        }
        audio.play()
      } else {
        setAgentState(null)
        setStatusText("Presiona Space o click para hablar")
      }
    } catch {
      setAgentState(null)
      setStatusText("Error al conectar con María")
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop()
    }
    isListeningRef.current = false
    setAgentState(null)
    setStatusText("Procesando...")
  }, [])

  const startListening = useCallback(() => {
    stopAudio()
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setStatusText("Navegador no soporta voz. Usa Chrome.")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = "es-PE"
    recognition.continuous = false
    recognition.interimResults = true
    recognitionRef.current = recognition

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("")
      setYouText(transcript)
      if (e.results[e.results.length - 1].isFinal) {
        stopListening()
        askMaria(transcript)
      }
    }
    recognition.onerror = () => {
      setAgentState(null)
      isListeningRef.current = false
      setStatusText("Error de micrófono")
    }
    recognition.onend = () => {
      isListeningRef.current = false
    }

    recognition.start()
    isListeningRef.current = true
    setAgentState("listening")
    setStatusText("Escuchando...")
    setYouText("...")
  }, [stopAudio, stopListening, askMaria])

  const handleOrbClick = useCallback(() => {
    if (isListeningRef.current) stopListening()
    else startListening()
  }, [startListening, stopListening])

  // Spacebar shortcut
  if (typeof window !== "undefined") {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isListeningRef.current) {
        e.preventDefault()
        startListening()
      }
      if (e.code === "Escape") {
        stopListening()
        setStatusText("Cancelado")
      }
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080c",
        color: "#f0eef5",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        gap: "24px",
      }}
    >
      <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#ff6b9d" }}>
        She.ships × PUCP
      </div>

      <h1 style={{ fontFamily: "monospace", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: -1, textAlign: "center" }}>
        Hola, soy <span style={{ color: "#ff6b9d" }}>María</span>
      </h1>

      <p style={{ fontSize: 14, color: "#9994a8", marginBottom: 8, textAlign: "center" }}>
        Tu co-presentadora con opiniones fuertes sobre corrupción peruana
      </p>

      {/* Orb */}
      <div
        onClick={handleOrbClick}
        style={{ width: 180, height: 180, cursor: "pointer", borderRadius: "50%", overflow: "hidden" }}
      >
        <Orb
          colors={["#ff6b9d", "#8b00ff"]}
          agentState={agentState}
          className="h-full w-full"
        />
      </div>

      <div style={{ fontFamily: "monospace", fontSize: 12, color: agentState ? "#ff6b9d" : "#9994a8", letterSpacing: 1, minHeight: 20 }}>
        {statusText}
      </div>

      {/* Transcripts */}
      <div style={{ width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,210,63,0.3)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#ffd23f", marginBottom: 8 }}>Tú</div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>{youText}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,107,157,0.3)", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#ff6b9d", marginBottom: 8 }}>María</div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>{mariaText}</div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: "#5c5770", marginTop: 8, textAlign: "center" }}>
        <kbd style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 8px", fontFamily: "monospace", fontSize: 11 }}>Space</kbd>
        {" "}para hablar · {" "}
        <kbd style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 8px", fontFamily: "monospace", fontSize: 11 }}>Esc</kbd>
        {" "}para cancelar
      </p>
    </div>
  )
}
