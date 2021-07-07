import { useState, useEffect, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Article from "./Article";

const Bloglist = ({ blogs, searchInput, setAvailableIds }) => {
  const [displayBlogs, setDisplayBlogs] = useState(blogs);

  useEffect(() => {
    // Make a copy of the 'blogs' prop received from the parent and update it
    const filterDisplayBlogs = blogs.filter(({ title }) =>
      title.toLowerCase().startsWith(searchInput)
    );
    setDisplayBlogs(filterDisplayBlogs);
    setAvailableIds(filterDisplayBlogs.map(({ id }) => id));
  }, [blogs, searchInput, setAvailableIds]);

  return (
    <TransitionGroup component="section">
      {displayBlogs.map((props) => (
        <CSSTransition
          key={props.id}
          timeout={250}
          classNames="article"
          unmountOnExit
          appear
        >
          <Fragment key={props.id}>
            <Article props={props} />
          </Fragment>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Bloglist;
