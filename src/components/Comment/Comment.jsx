import "./CommentStyles.scss";
import avatar from "../../assets/images/default_profile_pic1.jpg";
import { BsFillReplyAllFill } from "react-icons/bs";
import { useState } from "react";
import axios from "../../assets/axios/axios";
import { useParams } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";

const Comment = ({ data, replies, updateArticle, updateComments }) => {
  const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    if (hour < 10) hour = ("0" + hour).slice(-2);
    let min = a.getMinutes();
    if (min < 10) min = ("0" + hour).slice(-2);
    let sec = a.getSeconds();
    if (sec < 10) sec = ("0" + hour).slice(-2);
    let time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const {id} = useParams();
  const [reply, setReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const addComment = ()=> {
    axios
    .post(
      `/articles/${id}/comments`,
      {
          commentId:data.id,
          text:replyText
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
    .then((response) => {
      // handle success
      console.log(response);
      updateComments();
      updateArticle(id);
      setReply(false);
      setReplyText("");
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
  }

  return (
    <div className="comment">
      <div className="comment__info">
        <img src={avatar} alt="avatar" />
        <span className="comment__name">
          {data.author.firstName} {data.author.lastName}
        </span>
        <span className="comment__bullet">&#8226;</span>
        <span className="comment__role"> {data.roleUser}</span>
        {/* <span className="comment__bullet">&#8226;</span>
                <span className="comment__time">{timeConverter(data.createTime)}</span> */}
      </div>
      <div className="comment__data">
        <span className="comment__text">
          {
            data.parrentComment ? <span className="comment__text-parrent">@{data.parrentComment.author.firstName} {data.parrentComment.author.lastName}&nbsp;</span> :""
          }
          {data.text}
        </span>
        <div className="comment__reply">
          <span onClick={()=>setReply(!reply)}>
            Raspunde <BsFillReplyAllFill />
          </span>
          {reply ? (
            <>
              {" "}
              <textarea
                className="comment__reply-textarea input-default"
                placeholder="Ce parere ai?"
                value={replyText}
                onChange={(e)=>setReplyText(e.target.value)}
              ></textarea>
              <div className="comment__actions">
                <button className="comment__add-btn button-default-form" onClick={addComment}>
                  Adauga
                </button>
              </div>
            </>
          ) : (
            ""
          )}

     
        </div>
        {
              replies&&replies.length ? replies :""
          }
      </div>
    </div>
  );
};

export default Comment;