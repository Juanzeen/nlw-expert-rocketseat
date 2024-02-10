import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition : SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");

  const handleStartEditor = () => {
    setShouldShowOnBoarding(false);
  };

  const handleStartRecording = () => {

    const isSpeechRecognitionAPIAvaible =
      "SpeechRecognition" in window || "webkitSpeechRecognition";

      if(!isSpeechRecognitionAPIAvaible) {
        alert("Seu navegador não suporta a API de Gravação!");
        return;
      }

      setIsRecording(true);
      setShouldShowOnBoarding(false); 

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

       speechRecognition = new SpeechRecognitionAPI();

      speechRecognition.lang= "pt-BR";
      speechRecognition.continuous = true;
      speechRecognition.maxAlternatives = 1;
      speechRecognition.interimResults = true;

      speechRecognition.onresult = (e) => {
        const transcription = Array.from(e.results).reduce((txt, result)=> {
          return txt.concat(result[0].transcript);
        }, '')
        setContent(transcription);
      }


      speechRecognition.onerror = (e) => {
        console.error(e);
      }

      speechRecognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    if(speechRecognition !== null) speechRecognition.stop();
  };

  const handleContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (e.target.value === "") setShouldShowOnBoarding(true);
  };

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();
    if (content === "") return;
    onNoteCreated(content);
    setContent("");
    setShouldShowOnBoarding(true);
    toast.success("Nota criada com sucesso!");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-600">
        <span className="text-small font-medium text-slate-200">
          Adicionar Nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"></Dialog.Overlay>
        <Dialog.Content className="overflow-hidden outline-none fixed z-10 bg-slate-700 inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] md:rounded-md flex flex-col">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-small font-medium text-slate-300">
                Adicionar Nota
              </span>

              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                  >
                    gravando uma nota
                  </button>{" "}
                  ou{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate 400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type="button"
                className="w-full flex flex-row-reverse items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                Gravando! (Clique para interromper)
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
