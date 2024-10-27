import styles from './Comment.module.css';

import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
/* import { ThumbsUp, Trash } from '@phosphor-icons/react'; */

interface CommentProps {
  author: {
    name: string;
    avatarUrl: string;
  };
  content: {
    type: 'paragraph' | 'link';
    content: string;
  }[];
  publishedAt: Date;
  onDeleteComment: (id: number) => void;
  id: number;
}

export function Comment({
  author,
  content,
  publishedAt,
  onDeleteComment,
  id,
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  /* Deletar comentario */
  function handleDeleteComment() {
    console.log('deletar');
    onDeleteComment(id);
  }

  /*  Formatando a data */
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'as' HH:mm'h'",
    {
      locale: ptBR,
    },
  );
  /*  Formatando a data */
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                dateTime={publishedDateFormatted}
                title={publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              {/*  <Trash size={24} /> */}
              LIXO
            </button>
          </header>

          {content.map((line) => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return (
                <p key={line.content}>
                  <a href="#">{line.content}</a>
                </p>
              );
            }
          })}
        </div>

        <footer>
          <button onClick={() => setLikeCount((state) => state + 1)}>
            {/*   <ThumbsUp /> */}
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
