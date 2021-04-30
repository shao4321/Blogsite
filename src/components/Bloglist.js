import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Article from "./Article";

const Bloglist = ({
  blogs,
  blogDelete,
  toggleBookmark,
  searchInput,
  selectedBlogs,
  handleSelectedBlog,
  setAvailableIds,
}) => {
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
    <section>
      <TransitionGroup>
        {displayBlogs.map((props) => {
          return (
            <CSSTransition
              key={props.id}
              in={displayBlogs.length > 0}
              timeout={250}
              classNames="article"
              unmountOnExit
              appear
            >
              <React.Fragment key={props.id}>
                <Article
                  props={props}
                  blogDelete={blogDelete}
                  toggleBookmark={toggleBookmark}
                  selectedBlogs={selectedBlogs}
                  handleSelectedBlog={handleSelectedBlog}
                />
              </React.Fragment>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};

export default Bloglist;
