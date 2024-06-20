import { useState, useEffect } from "react";

export const PostNote = () => {
  const [newPost, setNewPost] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //------- useEffect hook to handle when user types more than 140 characters -----//

  useEffect(() => {
    if (newPost.length >= 141) {
      setErrorMessage("Your message is too long!");
    } else {
      setErrorMessage("");
    }
  }, [newPost]);

  //---------- Function to process submit form ------------//

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("newPost onformsubmit:", newPost);

    if (newPost.length <= 2) {
      setErrorMessage(
        "Your message is too short, it needs to be at least 2 characters"
      );
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: `${newPost}`,
        }),
        headers: { "Content-Type": "application/json" },
      };

      await fetch(
        //OLD TECHNIGO API
        // "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts",

        //NEW API I CREATED IN WEEK 14 WITH MONGO
        "https://project-happy-thoughts-api-n0pa.onrender.com/thoughts",

        options
      )
        .then((response) => response.json())
        .then((newGratitudes) => {
          setRecentGratitudes((previousGratitudes) => [
            newGratitudes,
            ...previousGratitudes,
          ]);
          newMessage(data);
          setNewPost("");
          fetchPosts();
        })
        .catch((error) => console.log(error));
    }

    //function to refresh page after submit form so that the users new lessage is added to the list
    function refreshPage() {
      window.location.reload(false);
    }

    refreshPage();
  };

  return (
    <div>
      <div>
        <p className="happy-right-now-text">What are you grateful for?</p>
        <form onSubmit={handleFormSubmit}>
          <textarea
            className="message-input-box"
            rows="5"
            cols="50"
            placeholder="'Rest, nature, books, music...such is my idea of happiness.' - Leo Tolstoy"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div>
            <p className="error">{errorMessage}</p>
            <p
              className={`length ${
                newPost.length >= 140 ? "turn-text-red" : "text-stays-normal"
              }`}
            >
              {newPost.length}/140
            </p>
          </div>
          <div className="post-button-container">
            <button type="submit" id="post-message-btn">
              Post Message
            </button>
          </div>
        </form>
      </div>
      PostNote
    </div>
  );
};
