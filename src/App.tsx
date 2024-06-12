import { useEffect, useState } from "react";
import "./styles.css";
const decoder = new TextDecoder();
export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      // https://mock.knnect.com/api/stream
      const response = await fetch("https://apis.knnect.com/stream");
      const reader = response.body.getReader();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        decodedValue = decoder.decode(value);
        try {
          const data = JSON.parse(decodedValue);
          setMessages((currentMsg) => [...currentMsg, data]);
        } catch (error) {
          console.error(error);
          done = doneReading;
        }
        // Do something with data
      }
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="App">
      <h1>Streaming API Response demo</h1>
      <div className="container">
        {messages.map((m) => (
          <p>{m.message}</p>
        ))}
      </div>
      {isLoading && <h2>Streaming . . .</h2>}
    </div>
  );
}
