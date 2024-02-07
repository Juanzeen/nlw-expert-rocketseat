import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import {toast} from 'sonner';

export function NewNoteCard() {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState('');

  const handleStartEditor = () => {
    setShouldShowOnBoarding(false);
  };

  const handleContentChanged  = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if(e.target.value === '') setShouldShowOnBoarding(true);
  }

  const handleSaveNote = (e: FormEvent)=> {
    e.preventDefault();
    console.log(content);
    toast.success('Nota criada com sucesso!');
  }

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
          <Dialog.Content className="overflow-hidden outline-none fixed z-10 bg-slate-700 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] rounded-md flex flex-col">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5"/>
            </Dialog.Close>

            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
          
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-small font-medium text-slate-300">
                Adicionar Nota
              </span>

              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className="font-medium text-lime-400 hover:underline">
                    gravando uma nota
                  </button>{" "}
                  ou{" "}
                  <button
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
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
            >
              Salvar nota
            </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  );
}