import axios from "axios";
import React, { useState, useEffect } from 'react';
import DOMPurify from "dompurify";
import dateFormat from 'dateformat';

export default function Comments({postId}) {
    const [commentData, setCommentData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/comment/"+postId)
            .then((res) => setCommentData(res.data.comments))
            .catch(console.error);
    }, []);

    if (commentData) {
        return (
            <div className="comments">
            <React.Fragment>
                {commentData.map((comment) => (
                        <div className="group-post-comment">
                            <a href={"/profile/" + comment.name} className="Post-text-title">{comment.name} - {dateFormat(comment.date, "mmmm dS, yyyy")}</a >
                            <article className="Post-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body) }} />
                        </div>
                ))}
            </React.Fragment>
            </div>
        );
    }
    return (
        <React.Fragment>

        </React.Fragment>
    );;
}