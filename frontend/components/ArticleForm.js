import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const { articles, postArticle, updateArticle, setCurrentArticleId, currentArticleId } = props

  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    currentArticleId ? 
      setValues({
        title: articles[currentArticleId - 1].title,
        text: articles[currentArticleId - 1].text,
        topic: articles[currentArticleId - 1].topic
      })
      : 
      setValues(initialFormValues)
  }, [currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    
    evt.preventDefault()
    const trimTitle = values.title.trim()
    const trimText = values.text.trim()
    if(!currentArticleId) {
      console.log(values)
      postArticle(values)
      setValues(initialFormValues)
    } else if (trimTitle.length >= 1 && trimText.length >= 1 && values.topic) {
      updateArticle(currentArticleId, values)
      setCurrentArticleId()
      setValues(initialFormValues)
    } else {
      console.log(`bad length`)
    }
  }

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    const trimTitle = values.title.trim()
    const trimText = values.text.trim()

    if (trimTitle.length >= 1 && trimText.length >= 1 && values.topic) {
      return false
    } else {
      return true
    }
  }

  const cancelEdit = (evt) => {
    evt.preventDefault()
    setValues(initialFormValues)
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>Create Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={cancelEdit}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
