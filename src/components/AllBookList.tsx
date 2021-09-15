import React from 'react';

export default function AllBookList(props): React.ReactElement {
    return(
        <div>
            {props?.books?.map((book) => {
                return <form>
                    <input value={book.title} disabled={true}/>
                    <input value={book.published} disabled={true}/>
                    <input value={`${ book.author.firstName } ${ book.author.lastName }`} disabled={true}/>
                    <input value={book.author.email} disabled={true}/>
                </form>
            })}
        </div>
    )
}