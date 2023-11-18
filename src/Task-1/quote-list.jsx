import { useState } from 'react';
import './quotes.css';
const quotes = [{ quoute: "Hello!", author: "Nazariy", hidden: false }];
function Quote() {
    var hiddenQuote = -1;
    const [quotes_arr, setQuote] = useState(quotes);
    const d = new Date();
    let quo = "";
    console.log(quotes_arr);

    const addQuote = () => {
        quo = prompt("Enter your quote");
        if (quo != null)
            setQuote([...quotes_arr, { quoute: quo, author: "Nazariy", hidden: false }]);

        hiddenQuote = -1
    };
    const generateQuote = async () => {
        let w = await fetch("https://api.quotable.io/random");
        let W = await w.json();

        let quo = { quoute: W.content, author: W.author, hidden: false };
        if (quo != null) {

            setQuote([...quotes_arr, quo]);
        }
    };
    const doHidden = () => {
        if (hiddenQuote == -1) return;
        quotes_arr[hiddenQuote].hidden = true
        setQuote([...quotes_arr]);

    };
    const doNotHidden = () => {
        if (hiddenQuote == -1) return;
        if (quotes_arr[hiddenQuote].hidden == true) {
            quotes_arr[hiddenQuote].hidden = false;
            setQuote([...quotes_arr]);
        }
    }
    return (
        <div>
            {quotes_arr.map((q, index) =>
                <button className={q.hidden == false ? "quote" : "quoteHidden"} key={index} onClick={() => { hiddenQuote == index ? hiddenQuote = -1 : hiddenQuote = index }}>" {q.quoute} " - {q.author} <span>{d.getUTCFullYear()}</span></button>


            )}
            <div className='buttons'>
                <button onClick={addQuote}>Add new quote</button>
                <button onClick={generateQuote}>Generate quote</button>
                <button onClick={doHidden}>Do hidden</button>
                <button onClick={doNotHidden}>Do not hidden</button>
            </div>
        </div>
    );
}

export default Quote;