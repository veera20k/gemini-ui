import React from 'react'
import SuggestionsSubmit from './suggestion-submit'

const sampleSuggestions = [{
    id: 1,
    title: 'Help me pick',
    description: 'a gift for my dad who love fishing',
},
{
    id: 2,
    title: 'Recommend a dish',
    description: 'to impress a date who\' a picky eater',
},
{
    id: 3,
    title: 'Show me a code snippet',
    description: 'of a website header',
}, {
    id: 4,
    title: 'Make a content strategy',
    description: 'for a newsletter featuring my favorite recipes',
}]

export default function Suggestions() {
    return (
        <div className='grid grid-cols-2 max-md:grid-cols-1 gap-2 m-2 max-lg:[&>*:nth-child(3)]:hidden max-lg:[&>*:nth-child(4)]:hidden' >
            {sampleSuggestions.map(({ id, title, description }) => (
                <div className='border rounded-xl p-2.5 hover:bg-slate-50 relative' key={id}>
                    <h3>{title}</h3>
                    <small className='text-slate-400 truncate max-w-[90%] block'>{description}</small>
                    <SuggestionsSubmit />
                </div>))}
        </div>
    )
}
