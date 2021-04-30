const sortMapKeys = (blogs, sortBy) => {
  // Key : id , Value : blog details
  const hashBlogs = {};
  // Key : sortBy Type , Value : id
  const hashTypeToId = {};
  for (let blog of blogs) {
    hashBlogs[blog.id] = blog;
    if (blog[sortBy] in hashTypeToId) {
      hashTypeToId[blog[sortBy]].push([blog.id]);
      continue;
    }
    hashTypeToId[blog.title] = [blog.id];
  }
  return { hashBlogs, hashTypeToId };
};

const sortAZ = (blogs, setBlogs) => {
  const sortBy = "title";
  const { hashBlogs, hashTypeToId } = sortMapKeys(blogs, sortBy);
  const sortedBlogs = [];
  for (let title of Object.keys(hashTypeToId).sort()) {
    const idArr = hashTypeToId[title];
    idArr.forEach((id) => sortedBlogs.push(hashBlogs[id]));
  }
  setBlogs(sortedBlogs);
};

const sortZA = (blogs, setBlogs) => {
  const sortBy = "title";
  const { hashBlogs, hashTypeToId } = sortMapKeys(blogs, sortBy);
  const sortedBlogs = [];
  for (let title of Object.keys(hashTypeToId).sort().reverse()) {
    const idArr = hashTypeToId[title];
    idArr.forEach((id) => sortedBlogs.push(hashBlogs[id]));
  }
  setBlogs(sortedBlogs);
};

const sortWrittenDateON = (blogs, setBlogs) => {
  const sortedBlogs = [];
  const hashBlogs = {};
  blogs.forEach((blog) => (hashBlogs[blog.id] = blog));
  Object.keys(hashBlogs)
    .sort((a, b) => a - b)
    .forEach((id) => sortedBlogs.push(hashBlogs[id]));
  setBlogs(sortedBlogs);
};

const sortWrittenDateNO = (blogs, setBlogs) => {
  const sortedBlogs = [];
  const hashBlogs = {};
  blogs.forEach((blog) => (hashBlogs[blog.id] = blog));
  Object.keys(hashBlogs)
    .sort((a, b) => b - a)
    .forEach((id) => sortedBlogs.push(hashBlogs[id]));
  setBlogs(sortedBlogs);
};

const sortEditedDate = (blogs) => {
  const hashBlogs = {};
  const hashTimeToBlog = {};
  blogs.forEach((blog) => (hashBlogs[blog.dateEdited] = blog));
  for (const [dateTimeString, blog] of Object.entries(hashBlogs)) {
    const [date, time, dayNight] = dateTimeString.trim().split(" ");
    let [day, month, year] = date.replace(",", "").split("/");
    let [hour, min, sec] = time.split(":");
    if (dayNight === "PM") {
      hour = Number(hour) + 12;
    }
    const timesec = new Date(year, month - 1, day, hour, min, sec).getTime();
    hashTimeToBlog[timesec] = blog;
  }
  return hashTimeToBlog;
};

const sortEditedDateON = (blogs, setBlogs) => {
  const sortedBlogs = [];
  const hashTimeToBlog = sortEditedDate(blogs);
  Object.keys(hashTimeToBlog)
    .sort((a, b) => a - b)
    .forEach((time) => sortedBlogs.push(hashTimeToBlog[time]));
  setBlogs(sortedBlogs);
};

const sortEditedDateNO = (blogs, setBlogs) => {
  const sortedBlogs = [];
  const hashTimeToBlog = sortEditedDate(blogs);
  Object.keys(hashTimeToBlog)
    .sort((a, b) => b - a)
    .forEach((time) => sortedBlogs.push(hashTimeToBlog[time]));
  setBlogs(sortedBlogs);
};

export {
  sortAZ,
  sortZA,
  sortWrittenDateON,
  sortWrittenDateNO,
  sortEditedDateON,
  sortEditedDateNO,
};
