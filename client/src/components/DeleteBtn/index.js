import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  // deleteBook();
  return (
    <span 
    className="delete-btn" 
    // {...props} 
    role="button" 
    tabIndex="0" 
    onClick = {props.deleteBook}
    >
      ✗
    </span>
  );
}

export default DeleteBtn;
