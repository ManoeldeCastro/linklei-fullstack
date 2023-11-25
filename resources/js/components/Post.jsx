import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import avatarPath from '../../../public/assets/avatar_default.png';
import optionsIconPath from '../../../public/assets/dotdotdot.svg';
import categoryPath from '../../../public/assets/feed.svg';

const Post = ({ post }) => {
  return (
    <Card className="mb-3">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        <div className="user-info">
          <img src={avatarPath} alt="Avatar" className="rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
          {post.author}
          <small className="text-muted d-block">{new Date(post.created_at).toLocaleString()}</small>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="link" bsPrefix="p-0">
              <img src={optionsIconPath} alt="Opções" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Excluir</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Header>
      <Card.Subtitle className='mt-2'>
        <img src={categoryPath} className='w-5 mx-3'alt="" />
        <small className="text-muted">{post.category}</small>
      </Card.Subtitle>
      <Card.Body>
        {post.image && (
          <Card.Img variant="top" src={`/images/${post.image}`} alt="Imagem do Post" />
        )}
        <Card.Text className="mt-2">
          {post.content}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
