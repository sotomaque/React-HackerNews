import React from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from './LinkItem';
import { LINKS_PER_PAGE } from '../../utils';
import { useParams, useHistory } from "react-router-dom";

import axios from 'axios';

function LinkList(props) {

  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  let { page } = useParams();
  page = Number(page);
  const history = useHistory();
  const [cursor, setCursor] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log('page: ', page, 'type ', typeof(page))

  React.useEffect(() => {
    const unsubscribe = getLinks();

    return () => unsubscribe();
  }, [isTopPage, page]);

  function getLinks() {
    setLoading(true)
    const hasCursor = Boolean(cursor)
    // top page query
    if (isTopPage) {
      return firebase.db
        .collection('links')
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      // homepage / new query (first page / no pagination 'start after')
      return firebase.db
      .collection('links')
      .orderBy('created', 'desc')
      .limit(LINKS_PER_PAGE)
      .onSnapshot(handleSnapshot);
      } else if (hasCursor) {
        // same query as above with pagination 'start after' constraint
        return firebase.db
        .collection('links')
        .orderBy('created', 'desc')
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
      } else {
        // we dont have a cursor meaning we typed in a 
        // url without actually going from 1 -> 2; so we dont have the 
        // last link from 1 persisted;
        // make call to node server (firebase serverless function)
        const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
        axios.get(`https://us-central1-hooks-news-app-b9deb.cloudfunctions.net/linksPagination?offset=${offset}`)
          .then(response => {
            const links = response.data;
            const lastLink = links[links.length - 1];
            setLinks(links);
            setCursor(lastLink);
          })
        setLoading(false)
        // return something so use effect doesnt complain on cleanup
        return () => {}
      }
  }
    

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map( doc => {
      return { id: doc.id, ...doc.data() }
    });
    setLinks(links);
    const lastLink = links[links.length - 1];
    setCursor(lastLink);
    setLoading(false)
  }

  function visitPreviousPage() {
    if (page > 1) {
      history.push(`/new/${page - 1}`)
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      history.push(`/new/${page + 1}`)
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div style={{opacity: loading ? 0.25 : 1}}>
      {
        links.map((link, index) => (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + pageIndex}
          />
        ))
      }
      {
        isNewPage && (
          <div className='pagination'>
            <div className='pointer mr2' onClick={visitPreviousPage}>Previous</div>
            <div className='pointer' onClick={visitNextPage}>Next</div>
          </div>
        )
      }
    </div>
  );
}

export default LinkList;
