function List(props) {
  return (
    <div>
      {props.ContentList.map((content, idx) => {
        return (
          <div key={idx} style={{ width: "100%", marginLeft: "1rem" }}>
            내용 : {content}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default List;
