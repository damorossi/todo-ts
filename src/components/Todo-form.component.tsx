import React, { useState } from 'react'

interface PropsFormInput {
    handleSucessAction: () => void;
    handleCancelAction: () => void;
}

function TodoFormComponent({handleSucessAction, handleCancelAction }: PropsFormInput)  {
    const [title, setTitle] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    return (
        <section>a
            {title}
            <form onSubmit={console.log}>
                <fieldset>
                    <p>
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            className="loginComponent-inputText"
                            autoComplete="off"
                            value={title}
                            onChange={(e) => handleChange(e)}
                            />
                        <label htmlFor="title">Title</label>
                    </p>

                    <button type="submit">Create Task</button>
                    <button type="button" onClick={handleCancelAction}>Cancel</button>
                </fieldset>
            </form>ss
        </section>
    )
}

export default TodoFormComponent


