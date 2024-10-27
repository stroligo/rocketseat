import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';

interface PostProps {
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  };
  content: {
    type: 'paragraph' | 'link';
    content: string;
  }[];
  publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
  /* Comentarios */
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayk Brito',
        role: 'Front End Developer',
      },
      content: [
        { type: 'paragraph', content: 'Linha 2' },
        {
          type: 'paragraph',
          content: 'comentario 1',
        },
        { type: 'link', content: 'jane.design/doctorcare' },
      ],
      publishedAt: new Date('2024-10-23 20:00:00'),
    },
  ]);

  /* Input Textarea */
  const [newCommentText, setNewCommentText] = useState('');

  const isNewCommentEmpty = newCommentText.length === 0;

  /* Formato data */
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'as' HH:mm'h'",
    {
      locale: ptBR,
    },
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  /*  Monitora o textarea */
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  /* Criar novo comentario */
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    const newComment = {
      id: comments.length + 1,
      author: {
        avatarUrl: 'https://github.com/stroligo.png',
        name: 'Gabriel Stroligo',
        role: 'Front End Developer',
      },
      content: [
        {
          type: 'paragraph',
          content: newCommentText,
        },
      ],
      publishedAt: new Date(),
    };

    setComments([...comments, newComment]);
    setNewCommentText('');
  }

  /*   Deleta um comentario */
  function deleteComment(id: number) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment.id !== id;
    });
    console.log('Deletar o comentario:' + id);
    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          dateTime={publishedDateFormatted}
          title={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
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

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
          name="comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={(event: InvalidEvent<HTMLTextAreaElement>) => {
            event.target.setCustomValidity('Este campo é obrigatório! Zé!');
          }}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      {comments.length > 0 && (
        <div className={styles.commentList}>
          <div>Comentario</div>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              content={comment.content.map((item) => ({
                type:
                  item.type === 'paragraph' || item.type === 'link'
                    ? item.type
                    : 'paragraph',
                content: item.content,
              }))}
              author={comment.author}
              publishedAt={comment.publishedAt}
              onDeleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </article>
  );
}
