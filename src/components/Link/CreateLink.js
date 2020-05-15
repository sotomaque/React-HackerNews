import React from "react";
import validateCreateLink from '../Auth/validateCreateLink';
import useFormValidation from '../Auth/useFormValidation';
import { FirebaseContext } from '../../firebase';

const INITIAL_STATE = {
  description: '',
  url: ''
}

function CreateLink(props) {
  const { firebase, user }  = React.useContext(FirebaseContext)
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  function handleCreateLink() {
    if (!user) {
      props.history.push('/login');
    } else {
      const { url, description } = values;
      const newLink = {
        url, 
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        voteCount: 0,
        votes: [], 
        comments: [],
        created: Date.now()
      }
      firebase.db.collection('links').add(newLink);
      props.history.push('/');
    }

  }

  return (
    <form className='flex flex-column mt3' onSubmit={handleSubmit}>

      <input
        name='description'
        placeholder='The description for your link'
        autoComplete='off'
        type='text'
        onChange={handleChange}
        value={values.description}
        className={errors.description && 'errors-input'}
      />
      { errors.description && <p className='error-text'>{errors.description}</p> }
      <input
        name='url'
        placeholder='The URL for your link'
        autoComplete='off'
        type='url'
        onChange={handleChange}
        value={values.url}
        className={errors.url && 'errors-input'}

      />
      { errors.url && <p className='error-text'>{errors.url}</p> }
      <button className='button' type='submit'>Submit</button>
    
    </form>
  )
}

export default CreateLink;
