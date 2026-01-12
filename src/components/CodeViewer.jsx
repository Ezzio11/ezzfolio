import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('python', python);

const CodeViewer = ({ code, isDark, isInput, count }) => {
    // Custom Jupyter Themes (Matches official Jupyter colors)
    // Light Mode (Classic Notebook)
    const jupyterLight = {
        'hljs': {
            display: 'block',
            overflowX: 'auto',
            padding: '0.5em',
            color: '#212121',
            background: 'transparent'
        },
        'hljs-keyword': { color: '#008000', fontWeight: 'bold' },
        'hljs-string': { color: '#BA2121' },
        'hljs-number': { color: '#008000' },
        'hljs-comment': { color: '#408080', fontStyle: 'italic' },
        'hljs-meta': { color: '#AA22FF' },
        'hljs-doc-comment': { color: '#D42', fontStyle: 'italic' }
    };

    // JupyterLab Dark
    const jupyterDark = {
        ...atomOneDark,
        'hljs': {
            ...atomOneDark['hljs'],
            background: 'transparent',
            color: '#ffffff'
        },
        'hljs-keyword': { color: '#C678DD', fontWeight: 'bold' },
        'hljs-string': { color: '#98c379' },
    };

    const activeTheme = isDark ? jupyterDark : jupyterLight;

    return (
        <SyntaxHighlighter
            language={isInput ? "python" : "text"}
            style={activeTheme}
            customStyle={{
                margin: 0,
                padding: '0.5rem',
                fontSize: '0.85rem',
                lineHeight: '1.5',
                fontFamily: 'monospace',
                background: 'transparent',
            }}
            wrapLongLines={false}
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeViewer;
