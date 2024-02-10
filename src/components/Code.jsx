/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Code = () => {
    // const editorRef = useRef(null);
    useEffect(() => {
        async function init() {
            Codemirror.fromTextArea(document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );
        }
        init();
    }, []);


    return <textarea className='resize' id="realtimeEditor"></textarea>;
};

export default Code;
