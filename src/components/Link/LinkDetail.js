import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'


function LinkDetail(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const { linkId } = useParams();
  const history = useHistory();
  const [link, setLink] = React.useState(null)
  const [commentText, setCommentText] = React.useState('');
  const linkRef = firebase.db.collection('links').doc(linkId);

  React.useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddComment() {
    if (!user) {
      history.push('/login')
    } else {
      linkRef.get().then(doc => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          console.log(previousComments)
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          }
          const updatedComments = [...previousComments, comment];
          linkRef.update({ comments: updatedComments })
          setLink(prev => ({
            ...prev,
            comments: updatedComments
          }));
          setCommentText('');
        }
      })
    }
  }


  return !link ? (
    <div>Loading...</div>
  ) : (
    <div>
      <LinkItem
        showCount={false}
        link={link}
      />
      <textarea
        rows='6'
        cols='60'
        onChange={event => setCommentText(event.target.value)}
        value={commentText}
      />
      <div>
        <button className='button' onClick={handleAddComment}>Add Comment</button>
      </div>
      {
        link.comments.map((comment, index) =>  (
            <div key={index}>
            <p className='comment-author'>
              {comment.postedBy.name} | {distanceInWordsToNow(comment.created)} ago
            </p>
            <p>{comment.text}</p>
          </div>
          )
        )
      }
    </div>
  )
}

export default LinkDetail;
