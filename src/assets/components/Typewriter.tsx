import { useState, useEffect } from 'react'

//Interface
interface TypewriterProps {
    words: string[]; 
    speed?: number;
    deleteSpeed?: number; 
    wait?: number;
}

//Komponenten
const Typewriter: React.FC<TypewriterProps> = ({
    words,
    speed = 135,
    deleteSpeed = 90,
    wait = 1800,
  }) => {

    //States
    const [text, setText] = useState(""); //Texten som skrivs
    const [wordIndex, setWordIndex] = useState(0); //Ordet den är på
    const [isDeleting, setIsDeleting] = useState(false); //Om den skriver eller raderar
  
    //Vid mount
    useEffect(() => {
    //Hämta aktuellt ord baserat på wordIndex (modulus ser till att den loopar om på 0)
      const currentWord = words[wordIndex % words.length];

      //Sätt hastighet beroende på om ordet skrivs ut eller raderas
      let typeSpeed = isDeleting ? deleteSpeed : speed;
  
      //Om deleting är false, men texten har skrivit klart:
      if (!isDeleting && text === currentWord) {

        //Pausa lite innan
        typeSpeed = wait; 
        setTimeout(() => setIsDeleting(true), wait);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
  
      //Timeout för varje tecken som skrivs ut
      const timeout = setTimeout(() => {
        setText((prev) =>
            //Slice bakåt om vi raderar, slice framåt om vi skriver
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }, typeSpeed);
  
      return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, wait]);
  
    //Texten
    return <span className="typewriter">{text}</span>;
  };

export default Typewriter