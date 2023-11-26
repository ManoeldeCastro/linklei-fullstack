import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const PostCreator = ({ onPostSubmit }) => {
    const [showModal, setShowModal] = useState(false);
    const [author, setAuthor] = useState(
        JSON.parse(localStorage.getItem("user")).name
    );
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("author", author);
        formData.append("category", category);
        formData.append("content", content);
        if (selectedImage) {
            formData.append("image", selectedImage);
        }
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(
                    `Erro ao submeter post: ${response.statusText}`
                );
            }
            const result = await response.json();
            onPostSubmit(result);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center my-2">
                <Button variant="primary" className="w-25" onClick={handleShow}>
                    Criar post
                </Button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Criar post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="postAuthor">
                            <Form.Label>Autor do Post</Form.Label>
                            <Form.Control
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Digite o autor do post"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postCategory">
                            <Form.Label>Selecione a categoria</Form.Label>
                            <Form.Select
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value={category}>
                                    Selecione uma opção
                                </option>
                                <option value="Post">Post</option>
                                <option value="Artigo">Artigo</option>
                                <option value="Grupo">Grupo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postContent">
                            <Form.Label>Escrever publicação</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                rows={3}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postImage">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) =>
                                    setSelectedImage(e.target.files[0])
                                }
                            />
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="primary" onClick={handleSubmit}>
                                Publicar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostCreator;
