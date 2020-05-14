import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { getDomain } from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { FirebaseContext } from "../../firebase";

function LinkItem({ link, index, showCount }) {

  const { firebase, user } = React.useContext(FirebaseContext);
  const history = useHistory();

  const [voted, setVoted] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      checkIfUserHasVoted();
    }
  }, [])

  function handleUpVote() {
    if (!user) {
      history.push('/login')
    } else if (!voted) {
      // get a reference to document
      const voteRef = firebase.db.collection('links').doc(link.id);
      // get document
      voteRef.get()
        .then(doc => {
          // check if it exists
          if (doc.exists) {
            // update property
            const prevVotes = doc.data().votes;
            const vote = { votedBy: { id: user.uid, name: user.displayName } }
            const updatedVotes = [...prevVotes, vote]
            // update value
            voteRef.update({ votes: updatedVotes })
          }
        });
      setVoted(true);
    }
  }

  function handleDownVote() {
    if (!user) {
      history.push('/login')
    } else {
      // get a reference to document
      console.log('here')
      const voteRef = firebase.db.collection('links').doc(link.id);
      // get document
      voteRef.get()
        .then(doc => {
          // check if it exists
          if (doc.exists) {
            // get previouse votes obj
            const prevVotes = doc.data().votes;
            // delete our previous vote
            const prevVotesMinusOurUpVote = prevVotes.filter( vote => {
              return vote.votedBy.id !== user.uid
            });
            const updatedVotes = [...prevVotesMinusOurUpVote]
            // update value
            voteRef.update({ votes: updatedVotes })
          }
        });
      setVoted(false);
    }
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  function handleDeleteLink() {
    // get ref to link
    const linkRef = firebase.db.collection('links').doc(link.id);
    linkRef.delete().then(() => {
      console.log(`document with id: ${link.id} has been deleted`)
    }).catch(err => {
      console.error('error deleting document ', err)
    })
  }

  function checkIfUserHasVoted() {
    
    link.votes.forEach(vote => {
      if (vote.votedBy.id === user.uid) {
        setVoted(true)
      }
    })
    
  }

  return <div className='flex items-start mt2'>
    <div className='flex items-center'>
      {
        showCount && <span className='grey'>{index}.</span>
      }     
      {
        !voted && <div className='vote-button' onClick={handleUpVote}>▲</div>
      }
      {
        voted && <div className='vote-button' onClick={handleDownVote}>▼</div>
      }

    </div>
    <div className='ml1'>
      <div>
        {link.description} <span className='link'>({getDomain(link.url)})</span>
      </div>
      <div className='f6 lh-copy gray'>
        {link.votes.length} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)} ago
        {" | "}
        <Link to={`/link/${link.id}`}>
          {link.comments.length > 0 ? `${link.comments.length} comments` : "discuss"}
        </Link>
        {
          postedByAuthUser && (
            <>  
              {" | "}
              <span className='delete-button' onClick={handleDeleteLink}>Delete</span>
            </>
          )
        }
      </div>
    </div>
  </div>;
}

export default LinkItem;
